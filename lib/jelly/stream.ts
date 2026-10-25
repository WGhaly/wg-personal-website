/**
 * The stream (v3, founder direction 15 Oct 2026): the orange is one liquid falling down the page, and it makes
 * the objects of the story out of itself.
 *
 * - One path runs through the page: out of the logo's 9, down through every station, in S-curves with a full
 *   loop in the longer gaps, to the 9 in the closing wordmark. The liquid is a tapered ribbon with a round head
 *   and trailing drops (a goo filter merges them), it lags the scroll slightly and stretches when it moves fast.
 * - At each station ("basin") it runs four phases:
 *     arrive   the head reaches the top of the element
 *     form     the liquid spreads into the object's exact shape (the object itself is not there yet)
 *     hold     the page stops (the section is sticky, see Stop.tsx); the real object takes over, orange, and its
 *              animation runs to the end so everything is in place to read
 *     release  the object stays in its normal colours; the liquid gathers into a drop and pours out of the bottom
 * - Everything is a function of the scroll position, so scrolling up replays it in reverse.
 *
 * Coordinates: "layout space" is the page as if the stops' spacers did not exist. A sticky section freezes the
 * layout scroll while real scroll continues, so viewport y = layout y − layoutScroll(scroll).
 * Boxes are read once per refresh (resize, fonts loaded); a frame builds two small paths.
 */
import Lenis from 'lenis';
import type { StationPosition, StoryNav } from './story-nav';
import { type Box, Leg, type Shape, parsePath, toPath } from './geometry';
import { frameRing, glyph, isGlyphId, pad, resolveCorners, roundRect } from './shapes';
import { type Hold, type StationType, holds } from './stations';

type Pt = { x: number; y: number };

/** Basin phases in virtual arc length: form A, hold B, release C. */
const A = 140;
const B = 520;
const C = 140;
/** Text targets cross-fade over the end of the form phase (a box around a word can't become letters). */
const TEXT_FADE = 0.25;
/**
 * Snap: how long after the last input the page settles on a station (ms), the glide's pace, and when a scroll
 * counts as over before it has fully stopped: trackpad momentum (wheel deltas decaying below SNAP_TAIL_PX) or
 * touch momentum slower than SNAP_SLOW px/s. Waiting for those tails to end looked like the page was stuck.
 */
const SNAP_IDLE = 100;
const SNAP_PX_PER_S = 2400;
const SNAP_TAIL_PX = 24;
const SNAP_SLOW = 120;
/** Where a snap lands inside a station's stop: far enough in that its hold animation has finished (it ends at 33%). */
const SNAP_IN = 0.4;
const SNAP_BACK = 0.85;

type Basin = {
  id: string;
  type: StationType;
  el: HTMLElement;
  hold?: Hold;
  start: number;
  shape: Shape;
  shapePath: string;
  box: Box;
  formLeg: Leg;
  releaseLeg: Leg | null;
  last: boolean;
  state: 'empty' | 'filled' | 'done' | '';
  lastP: number;
};

type Run = { s0: number; s1: number; xs: Float32Array; ys: Float32Array; len: Float32Array };
type Stop = { start: number; length: number };

/**
 * A chapter jump (story rail): the liquid runs straight along the path to the chosen station, skipping the
 * stations in between (no stops, no forming, no loops: one straight falling stream); the page follows the drop.
 * Pieces are walked in travel order; `weight` is their share of the journey (the stream: its length in px;
 * hidden basin spans: short). s0/s1 are drawing positions on the piece's run; g0/g1 the global positions that
 * drive station states.
 */
type Piece = { run: Run | null; s0: number; s1: number; weight: number; basin?: Basin; g0: number; g1: number };
type Transit = {
  pieces: Piece[];
  total: number;
  t0: number;
  duration: number;
  dir: 1 | -1;
  fromL: number;
  camL: number;
  destL: number;
  destReal: number;
  skipped: Set<Basin>;
  u: number;
  lastS: number;
  lastNow: number;
};

export type StreamState = { s: number; target: number; basin: string | null; phase: string; visible: boolean };
export type StreamOptions = { smooth: boolean };

const isPhone = () => window.innerWidth < 768;
const STEP = 3;
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

/* ------------------------------------------------------------------ path building */

function spline(points: Pt[], perSegment = 24): Pt[] {
  if (points.length < 2) return points;
  const p = [points[0], ...points, points[points.length - 1]];
  const out: Pt[] = [];
  const tj = (ti: number, a: Pt, b: Pt) => ti + Math.max(1e-3, Math.hypot(b.x - a.x, b.y - a.y) ** 0.5);
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const t0 = 0;
    const t1 = tj(t0, p0, p1);
    const t2 = tj(t1, p1, p2);
    const t3 = tj(t2, p2, p3);
    for (let k = 0; k < perSegment; k++) {
      const t = t1 + ((t2 - t1) * k) / perSegment;
      const lerp = (a: Pt, b: Pt, ta: number, tb: number): Pt => {
        const f = (t - ta) / (tb - ta || 1);
        return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
      };
      const a1 = lerp(p0, p1, t0, t1);
      const a2 = lerp(p1, p2, t1, t2);
      const a3 = lerp(p2, p3, t2, t3);
      out.push(lerp(lerp(a1, a2, t0, t2), lerp(a2, a3, t1, t3), t1, t2));
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function toRun(points: Pt[], s0: number): Run {
  const xs: number[] = [points[0].x];
  const ys: number[] = [points[0].y];
  let carry = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    let t = STEP - carry;
    while (t <= d) {
      xs.push(a.x + ((b.x - a.x) * t) / d);
      ys.push(a.y + ((b.y - a.y) * t) / d);
      t += STEP;
    }
    carry = d - (t - STEP);
  }
  const last = points[points.length - 1];
  xs.push(last.x);
  ys.push(last.y);
  const len = new Float32Array(xs.length);
  for (let i = 1; i < xs.length; i++) len[i] = len[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]);
  return { s0, s1: s0 + len[len.length - 1], xs: Float32Array.from(xs), ys: Float32Array.from(ys), len };
}

function at(run: Run, s: number) {
  const d = clamp(s - run.s0, 0, run.len[run.len.length - 1]);
  let lo = 0;
  let hi = run.len.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (run.len[mid] <= d) lo = mid;
    else hi = mid;
  }
  const f = (d - run.len[lo]) / (run.len[hi] - run.len[lo] || 1);
  let tx = run.xs[hi] - run.xs[lo];
  let ty = run.ys[hi] - run.ys[lo];
  const n = Math.hypot(tx, ty) || 1;
  tx /= n;
  ty /= n;
  return { x: run.xs[lo] + (run.xs[hi] - run.xs[lo]) * f, y: run.ys[lo] + (run.ys[hi] - run.ys[lo]) * f, tx, ty };
}

/** A round drop as a polygon, so it can morph into any shape. */
const drop = (c: Pt, r: number, n = 28): Shape => [
  Array.from({ length: n }, (_, k) => [c.x + r * Math.cos((k / n) * Math.PI * 2), c.y + r * Math.sin((k / n) * Math.PI * 2)] as const),
];

/** Shifts every "x y" pair of a path by dy (layout → viewport). */
const shiftY = (d: string, dy: number) =>
  d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x: string, y: string) => `${x} ${(Number(y) + dy).toFixed(1)}`);

function boundsOf(s: Shape): Box {
  let x1 = Infinity;
  let y1 = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;
  for (const r of s)
    for (const [x, y] of r) {
      x1 = Math.min(x1, x);
      y1 = Math.min(y1, y);
      x2 = Math.max(x2, x);
      y2 = Math.max(y2, y);
    }
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

/* ------------------------------------------------------------------ engine */

export class StreamEngine implements StoryNav {
  private basins: Basin[] = [];
  private runs: Run[] = [];
  private stops: Stop[] = [];
  private keys: { scroll: number; s: number }[] = [];
  private s = 0;
  private sTarget = 0;
  private velocity = 0;
  private lastT = 0;
  private raf = 0;
  private lenis: Lenis | null = null;
  private ro: ResizeObserver | null = null;
  private refreshTimer = 0;
  private lastD = '';
  private lastShape = '';
  private lastAlpha = '';
  private transit: Transit | null = null;
  private snapTimer = 0;
  private touching = false;
  private lastKey = '';
  private lastY = 0;
  private dir: 1 | -1 = 1;
  /** A snap glide is running: momentum still arriving from the gesture that ended is swallowed. */
  private snapping = false;
  private snapEnd = 0;
  /** The wheel gesture that triggered a snap is over: its remaining momentum is ignored until the wheel goes quiet. */
  private tailDone = false;
  private wheelSign = 0;
  private lastTarget = 0;
  private wheelAbs: number[] = [];
  private lastWheelT = 0;
  private lastScrollT = 0;
  readonly state: StreamState = { s: 0, target: 0, basin: null, phase: 'stream', visible: false };

  constructor(
    private path: SVGPathElement,
    private shapePath: SVGPathElement,
    private opts: StreamOptions,
  ) {}

  start() {
    if (this.opts.smooth) {
      this.lenis = new Lenis({ autoRaf: true, virtualScroll: this.onVirtualScroll });
      this.lenis.on('scroll', this.onScroll);
    }
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('touchstart', this.onTouch, { passive: true });
    window.addEventListener('touchend', this.onTouch, { passive: true });
    window.addEventListener('touchcancel', this.onTouch, { passive: true });
    window.addEventListener('keydown', this.onKey);
    window.addEventListener('wheel', this.onWheel, { passive: true });
    this.lastY = window.scrollY;
    this.ro = new ResizeObserver(() => this.scheduleRefresh());
    this.ro.observe(document.body);
    document.fonts?.ready.then(() => this.scheduleRefresh());
    window.addEventListener('load', this.scheduleRefresh);
    this.refresh();
    this.s = this.sTarget;
    this.kick();
  }

  destroy() {
    this.cancelTransit();
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('touchstart', this.onTouch);
    window.removeEventListener('touchend', this.onTouch);
    window.removeEventListener('touchcancel', this.onTouch);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('wheel', this.onWheel);
    clearTimeout(this.snapTimer);
    window.removeEventListener('load', this.scheduleRefresh);
    this.ro?.disconnect();
    this.lenis?.destroy();
    this.lenis = null;
    for (const b of this.basins) {
      b.el.classList.remove('is-jelly', 'is-jelly-fading');
      b.el.removeAttribute('data-jelly-state');
      b.el.style.removeProperty('--jelly-mix');
      b.hold?.(b.el, -1);
    }
    this.path.style.opacity = '0';
    this.shapePath.style.opacity = '0';
  }

  refresh() {
    // No transitions while boxes are read (globals.css): the holds reset to p = 0 and the boxes must be final,
    // not mid-slide (the control switch's knob moves on --mode-pos with a 300ms transition).
    const root = document.documentElement;
    root.classList.add('jelly-measuring');
    try {
      this.measure();
    } finally {
      root.classList.remove('jelly-measuring');
    }
    this.sTarget = this.targetFor(window.scrollY);
    this.kick();
  }

  debug() {
    return {
      state: { ...this.state },
      stops: this.stops,
      basins: this.basins.map((b) => ({
        id: b.id,
        type: b.type,
        start: b.start,
        formed: b.start + A,
        held: b.start + A + B,
        end: b.start + A + B + C,
        // Scroll positions for each phase, for tests and the station walk.
        scroll: { arrive: this.scrollFor(b.start), formed: this.scrollFor(b.start + A), held: this.scrollFor(b.start + A + B) },
      })),
    };
  }

  /** Scroll positions of a station's phases (story rail). */
  positionOf(stationId: string): StationPosition | null {
    const b = this.basins.find((x) => x.id === stationId);
    if (!b) return null;
    return { arrive: this.scrollFor(b.start), formed: this.scrollFor(b.start + A), held: this.scrollFor(b.start + A + B) };
  }

  /**
   * Chapter jump: the liquid runs along its path to the station without stopping at the ones in between, and
   * the page follows it, landing a third of the way into the station's stop (object formed, content complete).
   * Any wheel, touch or key input hands control straight back to the visitor.
   */
  goTo(stationId: string) {
    const dest = this.basins.find((b) => b.id === stationId);
    const pos = this.positionOf(stationId);
    if (!dest || !pos) return;
    this.cancelTransit();
    const destReal = Math.max(0, dest === this.basins[0] ? 0 : pos.formed + (pos.held - pos.formed) * 0.4);
    const sDest = this.targetFor(destReal);
    const s0 = this.s;
    if (Math.abs(sDest - s0) < 1) return;
    const dir: 1 | -1 = sDest > s0 ? 1 : -1;
    const span = A + B + C;
    const inBasin = (sv: number) => this.basins.find((b) => sv >= b.start && sv <= b.start + span);
    const hidden = (basin: Basin, from: number, to: number) => ({ run: null, s0: from, s1: to, weight: Math.min(240, Math.abs(to - from)), basin });
    const topOf = (b: Basin) => ({ x: b.box.x + b.box.w / 2, y: b.box.y });
    const bottomOf = (b: Basin) => ({ x: b.box.x + b.box.w / 2, y: b.box.y + b.box.h });

    const pieces: Piece[] = [];
    const origin = inBasin(s0);
    let cursor = s0;
    if (origin && origin !== dest) {
      // Leave the current station: un-form from the bottom going down, from the top going up.
      const out = dir > 0 ? origin.start + A + B : origin.start + A;
      const to = dir > 0 ? origin.start + span : origin.start;
      const from = dir > 0 ? Math.max(s0, out) : Math.min(s0, out);
      pieces.push({ ...hidden(origin, from, to), g0: from, g1: to });
      cursor = to;
    }
    // One straight falling stream to the destination: no loops, a gentle sway, so the run is smooth.
    const startPt = origin && origin !== dest ? (dir > 0 ? bottomOf(origin) : topOf(origin)) : this.headPoint(s0);
    const endPt = dir > 0 ? topOf(dest) : bottomOf(dest);
    const dy = endPt.y - startPt.y;
    const lead = clamp(Math.abs(dy) * 0.12, 20, 120) * Math.sign(dy || 1);
    const sway = Math.min(60, window.innerWidth * 0.04);
    const direct = toRun(
      spline([
        startPt,
        { x: startPt.x, y: startPt.y + lead },
        { x: (startPt.x + endPt.x) / 2 + sway, y: startPt.y + dy * 0.5 },
        { x: endPt.x, y: endPt.y - lead },
        endPt,
      ]),
      0,
    );
    const gTo = dir > 0 ? dest.start : dest.start + span;
    pieces.push({ run: direct, s0: 0, s1: direct.s1, weight: direct.s1, g0: cursor, g1: gTo });
    // Arrive: going down, form from the top; going up, form from the bottom drop.
    pieces.push({ ...hidden(dest, gTo, sDest), g0: gTo, g1: sDest });
    const total = pieces.reduce((sum, p) => sum + p.weight, 0);

    // Stations passed on the way stay as finished content: no forming, no stop.
    const lo = Math.min(s0, sDest);
    const hi = Math.max(s0, sDest);
    const skipped = new Set(this.basins.filter((b) => b !== dest && b !== origin && b.start > lo - 1 && b.start + span < hi + 1));
    for (const b of skipped) {
      this.setState(b, 'done');
      b.hold?.(b.el, 1);
      b.lastP = 1;
    }

    const fromL = this.layoutScroll(window.scrollY);
    this.transit = {
      pieces,
      total,
      t0: performance.now(),
      // About 2,000 px of stream a second, 2.2 to 5 s: slow enough to watch it run down to the chapter.
      duration: clamp(total / 2000, 2.2, 5) * 1000,
      dir,
      fromL,
      camL: fromL,
      destL: this.layoutScroll(destReal),
      destReal,
      skipped,
      u: 0,
      lastS: s0,
      lastNow: performance.now(),
    };
    for (const ev of ['wheel', 'touchstart', 'keydown'] as const) window.addEventListener(ev, this.cancelTransit, { passive: true });
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.transitFrame);
  }

  private cancelTransit = () => {
    if (!this.transit) return;
    this.transit = null;
    for (const ev of ['wheel', 'touchstart', 'keydown'] as const) window.removeEventListener(ev, this.cancelTransit);
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    for (const b of this.basins) b.lastP = -2;
    this.onScroll();
  };

  /** Where the liquid's head is for a global position s (a jump that starts between stations). */
  private headPoint(sv: number) {
    const run = this.runs.find((r) => sv >= r.s0 && sv <= r.s1);
    if (run) {
      const q = at(run, sv);
      return { x: q.x, y: q.y };
    }
    const b = [...this.basins].reverse().find((x) => sv >= x.start) ?? this.basins[0];
    return { x: b.box.x + b.box.w / 2, y: b.box.y + b.box.h };
  }

  /** Real scroll for a layout scroll, jumping over every stop (no freezing on the way). */
  private realFor(l: number) {
    let real = l;
    let skipped = 0;
    for (const st of this.stops) {
      const layoutStart = st.start - skipped;
      if (layoutStart < l) real += st.length;
      skipped += st.length;
    }
    return real;
  }

  /** Where the drop is at journey distance u: arc position and its layout y. */
  private transitAt(tr: Transit, u: number) {
    let acc = 0;
    for (const p of tr.pieces) {
      if (u <= acc + p.weight || p === tr.pieces[tr.pieces.length - 1]) {
        const f = clamp((u - acc) / (p.weight || 1), 0, 1);
        const sv = p.s0 + (p.s1 - p.s0) * f;
        const y = p.run ? at(p.run, sv).y : p.basin!.box.y + p.basin!.box.h / 2;
        return { s: p.g0 + (p.g1 - p.g0) * f, y };
      }
      acc += p.weight;
    }
    return { s: tr.pieces[tr.pieces.length - 1].g1, y: 0 };
  }

  private transitFrame = (now: number) => {
    const tr = this.transit;
    if (!tr) return;
    const t = clamp((now - tr.t0) / tr.duration, 0, 1);
    const e = -(Math.cos(Math.PI * t) - 1) / 2; // sine in-out
    const prevU = tr.u;
    tr.u = e * tr.total;
    const head = this.transitAt(tr, tr.u);
    const dt = Math.max(0.001, (now - tr.lastNow) / 1000);
    // Speed along the stream (px of path a second) drives the stretch, not the jump in global position.
    this.velocity += ((tr.u - prevU) / dt - this.velocity) * 0.25;
    tr.lastS = head.s;
    tr.lastNow = now;
    this.s = head.s;

    // The page follows the drop (kept mid-screen), never moving backwards; it eases in from where it was and
    // settles exactly on the destination.
    // Follow the drop a little above mid-screen; and never stand still: the page also keeps a minimum pace
    // toward the destination, so leaving a station (where the drop starts high) doesn't feel like a pause.
    const follow = head.y - window.innerHeight * (tr.dir > 0 ? 0.4 : 0.6);
    const pace = tr.fromL + (tr.destL - tr.fromL) * e * 0.5;
    const target = tr.dir > 0 ? Math.min(tr.destL, Math.max(follow, pace)) : Math.max(tr.destL, Math.min(follow, pace));
    tr.camL = tr.dir > 0 ? Math.max(tr.camL, target) : Math.min(tr.camL, target);
    const w0 = smooth(clamp(t / 0.15, 0, 1));
    const w1 = smooth(clamp((t - 0.8) / 0.2, 0, 1));
    const l = tr.fromL + (tr.camL - tr.fromL) * w0;
    const real = t >= 1 ? tr.destReal : this.realFor(l + (tr.destL - l) * w1);
    if (this.lenis) this.lenis.scrollTo(real, { immediate: true, force: true });
    else window.scrollTo(0, real);

    this.render(now / 1000);
    if (t < 1) {
      this.raf = requestAnimationFrame(this.transitFrame);
      return;
    }
    // Arrived: hand back to the scroll-driven liquid.
    this.transit = null;
    for (const ev of ['wheel', 'touchstart', 'keydown'] as const) window.removeEventListener(ev, this.cancelTransit);
    this.raf = 0;
    for (const b of this.basins) b.lastP = -2;
    this.sTarget = this.targetFor(window.scrollY);
    this.s = this.sTarget;
    this.velocity = 0;
    this.kick();
  };

  /** The real scroll position at which the liquid reaches arc length s. */
  private scrollFor(s: number) {
    const k = this.keys;
    for (let i = 1; i < k.length; i++)
      if (s <= k[i].s) return k[i - 1].scroll + ((k[i].scroll - k[i - 1].scroll) * (s - k[i - 1].s)) / (k[i].s - k[i - 1].s || 1);
    return k[k.length - 1]?.scroll ?? 0;
  }

  private scheduleRefresh = () => {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => this.refresh(), 120);
  };

  private onScroll = () => {
    if (this.transit) return;
    const y = window.scrollY;
    const now = performance.now();
    const speed = (Math.abs(y - this.lastY) / Math.max(1, now - this.lastScrollT)) * 1000;
    if (Math.abs(y - this.lastY) > 0.5) this.dir = y > this.lastY ? 1 : -1;
    this.lastY = y;
    this.lastScrollT = now;
    this.sTarget = this.targetFor(y);
    this.kick();
    if (this.snapping) {
      if (now > this.snapEnd) this.snapping = false;
      else return;
    }
    if (this.lenis) {
      // Lenis eases toward its target for a while after the input stops; time the snap from the input, not the easing.
      if (this.lenis.targetScroll !== this.lastTarget) {
        this.lastTarget = this.lenis.targetScroll;
        this.scheduleSnap();
      }
    } else if (!this.touching && speed > 0 && speed < SNAP_SLOW && now - this.lastWheelT > SNAP_IDLE) {
      // Touch momentum crawling to a stop: settle now.
      this.snap();
    } else {
      this.scheduleSnap();
    }
  };

  /* ---------------------------------------------------------------- snap */

  private onTouch = (e: TouchEvent) => {
    this.touching = e.type === 'touchstart' && e.touches.length > 0;
    if (!this.touching) this.scheduleSnap();
  };
  private onKey = (e: KeyboardEvent) => {
    this.lastKey = e.key;
  };
  private onWheel = () => {
    this.lastKey = '';
    this.lastWheelT = performance.now();
  };

  /**
   * Every wheel and touch input Lenis receives. During a snap glide, the decaying momentum of the gesture that
   * ended is swallowed (a stronger or reversed flick is a new gesture and takes over). Otherwise, a clearly
   * decaying trackpad tail counts as the end of the gesture, so the snap starts without waiting it out.
   */
  private onVirtualScroll = ({ deltaY, event }: { deltaY: number; event: WheelEvent | TouchEvent }) => {
    if (event.type !== 'wheel') return true;
    const abs = Math.abs(deltaY);
    const prev = this.wheelAbs[this.wheelAbs.length - 1] ?? 0;
    const now = performance.now();
    const gap = now - this.lastWheelT > 160;
    if (gap) {
      this.wheelAbs = [];
      this.tailDone = false;
    }
    this.wheelAbs = [...this.wheelAbs.slice(-3), abs];
    if (this.tailDone || (this.snapping && now < this.snapEnd)) {
      // Momentum only ever shrinks; a mouse notch as big as the last one, a bigger push or a reversal is new input.
      const fresh = gap || abs > prev * 1.2 + 1 || (abs >= 40 && abs >= prev) || Math.sign(deltaY) !== this.wheelSign;
      if (!fresh) {
        if (event.cancelable) event.preventDefault();
        return false;
      }
      this.snapping = false;
      this.tailDone = false;
      this.wheelSign = Math.sign(deltaY);
      return true;
    }
    this.wheelSign = Math.sign(deltaY);
    const w = this.wheelAbs;
    const decaying = w.length >= 4 && w[1] <= w[0] && w[2] <= w[1] && w[3] <= w[2] && w[0] > w[3];
    if (decaying && abs < SNAP_TAIL_PX && this.snap(Math.sign(deltaY) * abs * 8, true)) {
      if (event.cancelable) event.preventDefault();
      return false;
    }
    return true;
  };

  private scheduleSnap() {
    clearTimeout(this.snapTimer);
    this.snapTimer = window.setTimeout(() => this.snap(), SNAP_IDLE);
  }

  /**
   * The page never rests between stations (founder, 19 Oct 2026): it thinks in sections. When the scroll comes to
   * rest outside every station's stop, it glides on to the nearest station, a little biased to the way the visitor
   * was going, so a slow scroll is never pulled back. The very top and the closing screen (and the footer below it)
   * are free. Not while a finger is down, during a chapter jump, or while Tab moves focus through the page.
   */
  /** `finish`: the gesture is over even if the page is already heading into a station; glide there now. */
  private snap = (momentum = 0, finish = false): boolean => {
    if (this.snapping || this.transit || this.touching || this.lastKey === 'Tab' || !this.basins.length) return false;
    if (document.documentElement.dataset.jellySnap === 'off') return false; // tests and the station walk
    // Decide from where the scroll is heading (Lenis's target plus any momentum still to come), not where it is.
    const y = window.scrollY;
    const heading = (this.lenis ? this.lenis.targetScroll : y) + momentum;
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const target = this.snapTarget(heading) ?? (finish ? clamp(heading, 0, max) : null);
    if (target === null) return false;
    if (Math.abs(target - y) < 2 && !finish) return false;
    const duration = clamp(Math.abs(target - y) / SNAP_PX_PER_S, 0.35, 0.8);
    this.snapping = true;
    this.tailDone = finish && performance.now() - this.lastWheelT < 160;
    this.snapEnd = performance.now() + duration * 1000 + 150;
    if (this.lenis)
      this.lenis.scrollTo(target, { duration, easing: (t) => 1 - (1 - t) ** 3, onComplete: () => (this.snapping = false) });
    else window.scrollTo({ top: target, behavior: 'smooth' });
    return true;
  };

  /** The scroll position to settle on from y, or null when y is already at a station (or in a free zone). */
  private snapTarget(y: number): number | null {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const last = this.basins[this.basins.length - 1];
    // Each station's stop: from the moment its object is formed to the moment the liquid leaves it.
    const windows = [
      { lo: 0, hi: 0, span: 0 },
      ...this.basins.map((b) => {
        const lo = Math.min(max, this.scrollFor(b.start + A));
        const held = Math.min(max, this.scrollFor(b.start + A + B));
        return { lo, hi: b === last ? max : held, span: held - lo };
      }),
    ];
    if (windows.some((w) => y >= w.lo - 1 && y <= w.hi + 1)) return null;
    const prev = [...windows].reverse().find((w) => w.hi < y);
    const next = windows.find((w) => w.lo > y);
    const into = (w: (typeof windows)[number]) => w.lo + w.span * SNAP_IN;
    const back = (w: (typeof windows)[number]) => Math.max(into(w), w.lo + w.span * SNAP_BACK);
    if (!next) return prev ? back(prev) : null;
    if (!prev) return into(next);
    const bias = 1.5;
    const toPrev = (y - prev.hi) * (this.dir > 0 ? bias : 1);
    const toNext = (next.lo - y) * (this.dir < 0 ? bias : 1);
    return toNext <= toPrev ? into(next) : back(prev);
  }

  private kick() {
    if (!this.raf && !this.transit) {
      this.lastT = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }
  }

  /** Layout scroll: real scroll minus the stop distance already scrolled through. */
  private layoutScroll(scroll: number) {
    let l = scroll;
    for (const st of this.stops) l -= clamp(scroll - st.start, 0, st.length);
    return l;
  }

  /* ---------------------------------------------------------------- measure */

  private measure() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const phone = isPhone();
    const sy = window.scrollY;
    const rtl = document.documentElement.dir === 'rtl';

    // Stops: each wrapper's spacer, in real document coordinates.
    const wraps = [...document.querySelectorAll<HTMLElement>('[data-jelly-wrap]')];
    const stopOf = new Map<HTMLElement, Stop>();
    this.stops = wraps.map((w) => {
      const spacer = w.querySelector<HTMLElement>(':scope > [data-jelly-spacer]');
      const st = { start: w.getBoundingClientRect().top + sy, length: spacer?.offsetHeight ?? 0 };
      stopOf.set(w, st);
      return st;
    });
    const stopsAbove = (docY: number) => this.stops.filter((st) => st.start < docY - 1).reduce((sum, st) => sum + st.length, 0);

    // Each station: its section's layout top plus its offset inside the section (correct even while stuck).
    const items = [...document.querySelectorAll<HTMLElement>('[data-jelly]')].map((el) => {
      holds[el.dataset.jelly!]?.(el, 0);
      const section = el.closest<HTMLElement>('[data-jelly-section]') ?? document.body;
      const wrap = section.parentElement?.matches('[data-jelly-wrap]') ? section.parentElement : null;
      const secRect = section.getBoundingClientRect();
      const docTop = wrap ? wrap.getBoundingClientRect().top + sy : secRect.top + sy;
      const layoutTop = docTop - stopsAbove(docTop);
      const toLayout = (r: DOMRect): Box => ({ x: r.left, y: r.top - secRect.top + layoutTop, w: r.width, h: r.height });
      return { el, wrap, layoutTop, secTop: secRect.top, toLayout };
    });

    const W = phone ? 16 : 24;
    const r = clamp(vw * 0.055, 38, 96);
    const sway = Math.min(170, vw * 0.13);

    this.basins = [];
    this.runs = [];
    let s = 0;
    let side = 1;
    let prevExit: Pt | null = null;
    items.forEach((it, i) => {
      const el = it.el;
      const id = el.dataset.jelly!;
      const type = (el.dataset.jellyType ?? 'fill') as StationType;
      const shape = this.shapeOf(el, type, it.toLayout, it.secTop, it.layoutTop, rtl);
      const box = boundsOf(shape);
      const entry = { x: box.x + box.w / 2, y: box.y };
      const exit = { x: box.x + box.w / 2, y: box.y + box.h };
      if (prevExit) {
        const run = toRun(spline(this.waypoints(prevExit, entry, side, r, sway, vw)), s);
        side = -side;
        this.runs.push(run);
        s = run.s1;
      }
      const R = W * 0.9;
      const last = i === items.length - 1;
      this.basins.push({
        id,
        type,
        el,
        hold: holds[id],
        start: s,
        shape,
        shapePath: toPath(shape),
        box,
        formLeg: new Leg(drop({ x: entry.x, y: entry.y + R * 0.4 }, R), shape),
        releaseLeg: last ? null : new Leg(drop({ x: exit.x, y: exit.y - R * 0.4 }, R), shape),
        last,
        state: '',
        lastP: -2,
      });
      s += A + B + C;
      prevExit = exit;
    });

    // Scroll keyframes. Basins that share a stop split it; the first basin of a stop forms just as it starts.
    const max = document.documentElement.scrollHeight - vh;
    const keys: { scroll: number; s: number }[] = [];
    const push = (scroll: number, sv: number) => {
      const prev = keys[keys.length - 1];
      keys.push({ scroll: prev ? Math.max(scroll, prev.scroll + 1) : scroll, s: sv });
    };
    items.forEach((it, i) => {
      const b = this.basins[i];
      const st = it.wrap ? stopOf.get(it.wrap) : undefined;
      const group = it.wrap ? items.filter((x) => x.wrap === it.wrap) : [it];
      const k = group.indexOf(it);
      const n = group.length;
      let slotA: number;
      let slotB: number;
      if (st && st.length > 0) {
        slotA = st.start + (st.length * k) / n;
        slotB = st.start + (st.length * (k + 1)) / n;
      } else {
        slotA = b.box.y + b.box.h / 2 - vh * 0.5;
        slotB = slotA + vh * 0.4;
      }
      const span = slotB - slotA;
      if (i === 0) {
        // The page opens on the logo's 9, already full.
        push(-3, b.start);
        push(-2, b.start + A);
      } else if (k === 0) {
        push(slotA - vh * 0.32, b.start);
        push(slotA, b.start + A);
      } else {
        push(slotA, b.start);
        push(slotA + span * 0.25, b.start + A);
      }
      if (b.last) {
        push(Math.min(max, Math.max(slotB, slotA + 1)), b.start + A + B);
        return;
      }
      const lastOfStop = k === n - 1;
      push(slotA + span * (lastOfStop ? 0.85 : 0.6), b.start + A + B);
      push(lastOfStop ? slotB + vh * 0.18 : slotA + span * 0.8, b.start + A + B + C);
    });
    this.keys = keys;
    this.lastD = '';
    this.lastShape = '';
    for (const b of this.basins) b.lastP = -2;
  }

  /** The finished object's outline, in layout space. Corners come from data-jelly-radius (the CSS reads the same --round). */
  private shapeOf(el: HTMLElement, type: StationType, toLayout: (r: DOMRect) => Box, secTop: number, layoutTop: number, rtl: boolean): Shape {
    const d = el.dataset;
    const radius = Number(d.jellyRadius ?? 0);
    const corners = resolveCorners(d.jellyCorners, rtl);
    const box = toLayout(el.getBoundingClientRect());
    switch (type) {
      case 'rest': {
        // A logo: the exact outline of its orange path (the Latin 9 or the Arabic head).
        const p = el.querySelector<SVGPathElement>('path[fill="#FF6A13" i]');
        const m = p?.getScreenCTM();
        if (!p || !m) return [roundRect(box, 8)];
        return parsePath(p.getAttribute('d') ?? '').map((ring) =>
          ring.map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f - secTop + layoutTop] as const),
        );
      }
      case 'text':
        return [roundRect(pad(box, 4), 8)];
      case 'glyph': {
        const cs = getComputedStyle(el);
        const id = d.jellyGlyph ?? '';
        if (!isGlyphId(id)) return [roundRect(box, 8)];
        const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing);
        return glyph(id, box, parseFloat(cs.fontSize), ls);
      }
      case 'outline': {
        const stroke = Number(d.jellyStroke ?? 3);
        // Parts hidden at this width (display: none) are skipped.
        const parts = [...el.querySelectorAll('[data-jelly-part]')].filter((p) => p.getClientRects().length > 0);
        return (parts.length ? parts : [el]).flatMap((p) => frameRing(toLayout(p.getBoundingClientRect()), stroke, radius, corners));
      }
      default:
        return [roundRect(box, radius, corners)];
    }
  }

  private waypoints(a: Pt, b: Pt, side: number, r: number, sway: number, vw: number): Pt[] {
    const dy = b.y - a.y;
    const lead = clamp(dy * 0.18, 18, 90);
    if (dy < 180) return [a, { x: a.x, y: a.y + Math.max(10, dy * 0.3) }, { x: b.x, y: b.y - Math.max(10, dy * 0.3) }, b];
    const mid = { x: clamp((a.x + b.x) / 2 + side * sway, 24 + 2 * r, vw - 24 - 2 * r), y: (a.y + b.y) / 2 };
    const pts: Pt[] = [a, { x: a.x, y: a.y + lead }];
    if (dy > 520) {
      // A full loop: down the near side of a circle, once round, and on down.
      const cx = mid.x + side * r;
      const n = 10;
      pts.push({ x: mid.x, y: mid.y - r * 1.4 }, { x: mid.x, y: mid.y });
      for (let k = 1; k < n; k++) {
        const ang = side > 0 ? Math.PI - (k / n) * Math.PI * 2 : (k / n) * Math.PI * 2;
        pts.push({ x: cx + r * Math.cos(ang), y: mid.y + r * Math.sin(ang) });
      }
      pts.push({ x: mid.x, y: mid.y }, { x: mid.x, y: mid.y + r * 1.4 });
    } else {
      pts.push(mid);
    }
    pts.push({ x: b.x, y: b.y - lead }, b);
    return pts;
  }

  private targetFor(scroll: number): number {
    const k = this.keys;
    if (!k.length) return 0;
    if (scroll <= k[0].scroll) return k[0].s;
    for (let i = 1; i < k.length; i++) {
      if (scroll <= k[i].scroll) {
        const f = (scroll - k[i - 1].scroll) / (k[i].scroll - k[i - 1].scroll || 1);
        return k[i - 1].s + (k[i].s - k[i - 1].s) * f;
      }
    }
    return k[k.length - 1].s;
  }

  /* ---------------------------------------------------------------- frame */

  private frame = (now: number) => {
    if (this.transit) {
      this.raf = 0;
      return;
    }
    const dt = Math.min(0.05, (now - this.lastT) / 1000 || 0.016);
    this.lastT = now;
    const prev = this.s;
    this.s += (this.sTarget - this.s) * (1 - Math.exp(-dt / 0.12));
    if (Math.abs(this.sTarget - this.s) < 0.05) this.s = this.sTarget;
    this.velocity += ((this.s - prev) / dt - this.velocity) * 0.25;
    const settled = this.s === this.sTarget && Math.abs(this.velocity) < 2;
    if (settled) this.velocity = 0;
    this.render(now / 1000);
    this.raf = settled ? 0 : requestAnimationFrame(this.frame);
  };

  private setState(b: Basin, state: Basin['state'], mix = 0) {
    if (b.state !== state) {
      b.state = state;
      b.el.dataset.jellyState = state;
      b.el.classList.toggle('is-jelly', state === 'filled');
    }
    if (b.type === 'text') {
      const fading = state !== 'filled' && mix > 0 && mix < 1;
      b.el.classList.toggle('is-jelly-fading', fading);
      if (fading) b.el.style.setProperty('--jelly-mix', mix.toFixed(3));
    }
  }

  private render(time: number) {
    const s = this.s;
    const phone = isPhone();
    const L0 = phone ? 240 : 360;
    const W = phone ? 16 : 24;
    const stretch = 1 + Math.min(1.3, Math.abs(this.velocity) / 1600);
    // While a station forms, the tail drains into it: by the time the object is formed, no liquid is left above.
    const inside = this.transit ? null : this.basins.find((b) => s >= b.start && s - b.start < A + B);
    const drain = inside ? clamp(1 - (s - inside.start) / A, 0, 1) : 1;
    const L = L0 * stretch * drain;
    const width = W / Math.sqrt(stretch);
    const dy = -this.layoutScroll(window.scrollY);

    // Basins: object state, hold animation, and the liquid's own shape while forming or releasing.
    let shapeD = '';
    let shapeAlpha = 1;
    this.state.basin = null;
    this.state.phase = 'stream';
    for (const b of this.basins) {
      if (this.transit?.skipped.has(b)) continue;
      const u = s - b.start;
      if (u < 0) {
        this.setState(b, 'empty');
      } else if (u < A) {
        const t = smooth(u / A);
        const fade = b.type === 'text' ? clamp((t - (1 - TEXT_FADE)) / TEXT_FADE, 0, 1) : 0;
        this.setState(b, 'empty', fade);
        shapeD = b.formLeg.path(t);
        shapeAlpha = 1 - fade;
        this.state.basin = b.id;
        this.state.phase = 'form';
      } else if (u <= A + B || b.last) {
        this.setState(b, 'filled');
        this.state.basin = b.id;
        this.state.phase = 'hold';
      } else if (u < A + B + C) {
        const t = smooth((u - A - B) / C);
        const fade = b.type === 'text' ? 1 - clamp(t / TEXT_FADE, 0, 1) : 0;
        this.setState(b, 'done', fade);
        shapeD = b.releaseLeg!.path(1 - t);
        shapeAlpha = b.type === 'text' ? 1 - fade : 1;
        this.state.basin = b.id;
        this.state.phase = 'release';
      } else {
        this.setState(b, 'done');
      }
      // The hold animation finishes in the first third of the stop; the rest of the stop is for reading.
      const p = clamp((u - A) / (B * 0.33), 0, 1);
      if (b.hold && Math.abs(p - b.lastP) > 0.001) {
        b.lastP = p;
        b.hold(b.el, p);
      }
    }

    // The stream: the last L px of liquid behind the head, along the visible runs (inside a basin it is hidden:
    // there the liquid is the shape). During a chapter jump the tail follows the journey across skipped stations.
    let d = '';
    const tr = this.transit;
    if (tr) {
      let acc = 0;
      for (const p of tr.pieces) {
        const u0 = acc;
        const u1 = acc + p.weight;
        acc = u1;
        if (!p.run) continue;
        const lo = Math.max(u0, tr.u - L);
        const hi = Math.min(u1, tr.u);
        if (hi - lo < 0.5) continue;
        const sOf = (u: number) => p.s0 + ((p.s1 - p.s0) * (u - u0)) / (p.weight || 1);
        d += this.ribbon(p.run, sOf(lo), sOf(hi), (lo - (tr.u - L)) / L, (hi - (tr.u - L)) / L, width, time, dy, hi === tr.u);
      }
    } else {
      const a = s - L;
      for (const run of this.runs) {
        const lo = Math.max(a, run.s0);
        const hi = Math.min(s, run.s1);
        if (hi - lo < 0.5) continue;
        d += this.ribbon(run, lo, hi, (lo - a) / L, (hi - a) / L, width, time, dy, hi === s);
      }
      const speed = Math.min(1, Math.abs(this.velocity) / 900);
      for (const [gap, k] of drain < 0.05 ? [] : [
        [26, 0.42],
        [58, 0.32],
        [96, 0.24],
      ] as const) {
        const sp = a - gap * (0.6 + speed * 1.4);
        const run = this.runs.find((r) => sp >= r.s0 && sp <= r.s1);
        if (!run) continue;
        const q = at(run, sp);
        const rr = W * k * (0.7 + 0.3 * Math.sin(time * 3 + gap));
        const cy = q.y + dy;
        d += `M${(q.x - rr).toFixed(1)} ${cy.toFixed(1)}a${rr.toFixed(1)} ${rr.toFixed(1)} 0 1 0 ${(2 * rr).toFixed(1)} 0a${rr.toFixed(1)} ${rr.toFixed(1)} 0 1 0 ${(-2 * rr).toFixed(1)} 0Z`;
      }
    }

    const shape = shapeD ? shiftY(shapeD, dy) : '';
    const alpha = shape ? String(shapeAlpha) : '0';
    this.state.s = s;
    this.state.target = this.sTarget;
    this.state.visible = d.length > 0 || shape.length > 0;
    if (d !== this.lastD) {
      this.path.setAttribute('d', d);
      this.path.style.opacity = d ? '1' : '0';
      this.lastD = d;
    }
    if (shape !== this.lastShape) {
      this.shapePath.setAttribute('d', shape);
      this.lastShape = shape;
    }
    if (alpha !== this.lastAlpha) {
      this.shapePath.style.opacity = alpha;
      this.lastAlpha = alpha;
    }
  }

  /**
   * A tapered ribbon along a run from sFrom to sTo (either direction): taper wFrom → wTo (0 tail … 1 head),
   * round head at sTo when it is the liquid's head.
   */
  private ribbon(run: Run, sFrom: number, sTo: number, wFrom: number, wTo: number, W: number, time: number, dy: number, withHead: boolean): string {
    const n = Math.max(2, Math.ceil(Math.abs(sTo - sFrom) / 4));
    const left: string[] = [];
    const right: string[] = [];
    const sign = sTo >= sFrom ? 1 : -1;
    let last = at(run, sTo);
    for (let i = 0; i <= n; i++) {
      const sp = sFrom + ((sTo - sFrom) * i) / n;
      const q = at(run, sp);
      const u = wFrom + ((wTo - wFrom) * i) / n;
      const wob = 1 + 0.08 * Math.sin(u * 13 - time * 5.5);
      const w = (W * (0.14 + 0.86 * Math.pow(clamp(u, 0, 1), 0.9)) * wob) / 2;
      const nx = -q.ty * sign;
      const ny = q.tx * sign;
      const y = q.y + dy;
      left.push(`${(q.x + nx * w).toFixed(1)} ${(y + ny * w).toFixed(1)}`);
      right.push(`${(q.x - nx * w).toFixed(1)} ${(y - ny * w).toFixed(1)}`);
      last = q;
    }
    let d = `M${left[0]}L${left.slice(1).join('L')}`;
    if (withHead) {
      const R = W * 0.95;
      const cx = last.x;
      const cy = last.y + dy;
      const tx = last.tx * sign;
      const ty = last.ty * sign;
      const base = Math.atan2(tx, -ty); // angle of the left normal (−ty, tx)
      for (let k = 0; k <= 10; k++) {
        const ang = base - (k / 10) * Math.PI;
        d += `L${(cx + Math.cos(ang) * R).toFixed(1)} ${(cy + Math.sin(ang) * R).toFixed(1)}`;
      }
    }
    return `${d}L${right.reverse().join('L')}Z`;
  }
}
