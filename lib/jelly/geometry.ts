/**
 * Jelly geometry: polygons, path parsing and the morph interpolator.
 *
 * Every shape is a list of closed rings (polygons) in viewport pixels, y down. Outer rings have positive
 * area, holes negative, rendered with fill-rule nonzero. Curves (glyphs only) are flattened at parse time.
 *
 * Why not MorphSVG: the in-between shapes must stay angular (§4.2), the state must be a pure function of
 * scroll so scrolling up replays it exactly, and the 25% handoff must land on the real box within 2px (test 5).
 * The interpolator below keeps every corner of both shapes, so in-betweens are straight edges only.
 */

export type Pt = readonly [number, number];
export type Ring = Pt[];
export type Shape = Ring[];
export type Box = { x: number; y: number; w: number; h: number };

/* ---------------------------------------------------------------- parsing */

const CMD = /([MmLlHhVvQqCcZz])|(-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)/g;

/** Parses absolute or relative M L H V Q C Z. Curves are flattened into `steps` segments. */
export function parsePath(d: string, steps = 10): Shape {
  const tokens: (string | number)[] = [];
  for (const m of d.matchAll(CMD)) tokens.push(m[1] ?? Number(m[2]));
  const rings: Shape = [];
  let ring: Pt[] = [];
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let cmd = '';
  let i = 0;
  const num = () => tokens[i++] as number;
  const close = () => {
    if (ring.length > 2) rings.push(dedupe(ring));
    ring = [];
  };
  while (i < tokens.length) {
    if (typeof tokens[i] === 'string') cmd = tokens[i++] as string;
    const rel = cmd === cmd.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    switch (cmd.toUpperCase()) {
      case 'M':
        close();
        x = ox + num();
        y = oy + num();
        sx = x;
        sy = y;
        ring.push([x, y]);
        cmd = rel ? 'l' : 'L';
        break;
      case 'L':
        x = ox + num();
        y = oy + num();
        ring.push([x, y]);
        break;
      case 'H':
        x = ox + num();
        ring.push([x, y]);
        break;
      case 'V':
        y = oy + num();
        ring.push([x, y]);
        break;
      case 'Q': {
        const [cx, cy, ex, ey] = [ox + num(), oy + num(), ox + num(), oy + num()];
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const u = 1 - t;
          ring.push([u * u * x + 2 * u * t * cx + t * t * ex, u * u * y + 2 * u * t * cy + t * t * ey]);
        }
        x = ex;
        y = ey;
        break;
      }
      case 'C': {
        const [c1x, c1y, c2x, c2y, ex, ey] = [ox + num(), oy + num(), ox + num(), oy + num(), ox + num(), oy + num()];
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const u = 1 - t;
          ring.push([
            u * u * u * x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * ex,
            u * u * u * y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * ey,
          ]);
        }
        x = ex;
        y = ey;
        break;
      }
      case 'Z':
        x = sx;
        y = sy;
        close();
        break;
      default:
        i++;
    }
  }
  close();
  return rings;
}

function dedupe(r: Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of r) {
    const q = out[out.length - 1];
    if (!q || Math.abs(q[0] - p[0]) > 1e-6 || Math.abs(q[1] - p[1]) > 1e-6) out.push(p);
  }
  const f = out[0];
  const l = out[out.length - 1];
  if (out.length > 1 && Math.abs(f[0] - l[0]) < 1e-6 && Math.abs(f[1] - l[1]) < 1e-6) out.pop();
  return out;
}

/* ---------------------------------------------------------------- basics */

export const area = (r: Ring) => {
  let a = 0;
  for (let i = 0, n = r.length; i < n; i++) {
    const p = r[i];
    const q = r[(i + 1) % n];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
};

export const transform = (s: Shape, k: number, tx: number, ty: number, kx = k): Shape =>
  s.map((r) => r.map(([x, y]) => [x * kx + tx, y * k + ty] as const));

export function bounds(s: Shape): Box {
  let x1 = Infinity;
  let y1 = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;
  for (const r of s)
    for (const [x, y] of r) {
      if (x < x1) x1 = x;
      if (y < y1) y1 = y;
      if (x > x2) x2 = x;
      if (y > y2) y2 = y;
    }
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

/** Outer rings positive, holes negative (holes are rings whose sign differs from the largest ring). */
export function normalize(s: Shape): Shape {
  if (!s.length) return s;
  const big = s.reduce((a, b) => (Math.abs(area(b)) > Math.abs(area(a)) ? b : a));
  const flip = area(big) < 0;
  return s.map((r) => (flip ? [...r].reverse() : r));
}

const fmt = (n: number) => (Math.round(n * 100) / 100).toString();

export function toPath(s: Shape): string {
  let d = '';
  for (const r of s) {
    if (!r.length) continue;
    d += `M${fmt(r[0][0])} ${fmt(r[0][1])}`;
    for (let i = 1; i < r.length; i++) d += `L${fmt(r[i][0])} ${fmt(r[i][1])}`;
    d += 'Z';
  }
  return d;
}

/* ---------------------------------------------------------------- morph */

/** Cumulative arc-length parameters (0…1) of each vertex. */
function params(r: Ring): number[] {
  const n = r.length;
  const len: number[] = [0];
  let total = 0;
  for (let i = 0; i < n; i++) {
    const p = r[i];
    const q = r[(i + 1) % n];
    total += Math.hypot(q[0] - p[0], q[1] - p[1]);
    len.push(total);
  }
  return total === 0 ? r.map(() => 0) : len.slice(0, n).map((l) => l / total);
}

function sampleAt(r: Ring, u: number[], ts: number[]): Pt[] {
  const n = r.length;
  if (n === 1 || u[n - 1] === 0) return ts.map(() => r[0]);
  const out: Pt[] = [];
  let j = 0;
  for (const t of ts) {
    while (j < n - 1 && u[j + 1] <= t) j++;
    const u0 = u[j];
    const u1 = j + 1 < n ? u[j + 1] : 1;
    const p = r[j];
    const q = r[(j + 1) % n];
    const f = u1 > u0 ? (t - u0) / (u1 - u0) : 0;
    out.push([p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f]);
  }
  return out;
}

const rotate = (r: Ring, k: number): Ring => (k ? [...r.slice(k), ...r.slice(0, k)] : r);

/** Chooses B's start vertex so A and B line up with the least travel (the equivalent of shapeIndex "auto"). */
function align(a: Ring, b: Ring): Ring {
  if (b.length < 2 || a.length < 2) return b;
  const K = 32;
  const ts = Array.from({ length: K }, (_, i) => i / K);
  const sa = sampleAt(a, params(a), ts);
  const stride = Math.max(1, Math.floor(b.length / 96));
  let best = 0;
  let bestCost = Infinity;
  for (let k = 0; k < b.length; k += stride) {
    const rb = rotate(b, k);
    const sb = sampleAt(rb, params(rb), ts);
    let c = 0;
    for (let i = 0; i < K; i++) c += (sa[i][0] - sb[i][0]) ** 2 + (sa[i][1] - sb[i][1]) ** 2;
    if (c < bestCost) {
      bestCost = c;
      best = k;
    }
  }
  return rotate(b, best);
}

/** Resamples both rings on the union of their vertex parameters: each keeps all its own corners. */
function pairRings(a: Ring, b: Ring): [Float64Array, Float64Array] {
  const bb = align(a, b);
  const ua = params(a);
  const ub = params(bb);
  const ts = [...new Set([...ua, ...ub].map((t) => Math.round(t * 1e6) / 1e6))].sort((x, y) => x - y);
  const pa = sampleAt(a, ua, ts);
  const pb = sampleAt(bb, ub, ts);
  const fa = new Float64Array(ts.length * 2);
  const fb = new Float64Array(ts.length * 2);
  for (let i = 0; i < ts.length; i++) {
    fa[2 * i] = pa[i][0];
    fa[2 * i + 1] = pa[i][1];
    fb[2 * i] = pb[i][0];
    fb[2 * i + 1] = pb[i][1];
  }
  return [fa, fb];
}

const centroid = (r: Ring): Pt => {
  let x = 0;
  let y = 0;
  for (const p of r) {
    x += p[0];
    y += p[1];
  }
  return [x / r.length, y / r.length];
};

function nearestVertex(r: Ring, p: Pt): Pt {
  let best = r[0];
  let d = Infinity;
  for (const q of r) {
    const e = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2;
    if (e < d) {
      d = e;
      best = q;
    }
  }
  return best;
}

export type Morph = { a: Float64Array[]; b: Float64Array[] };

/**
 * Pairs rings outer-with-outer and hole-with-hole by size. A ring with no partner grows out of
 * (or shrinks into) the nearest corner of the other shape's main outline, so new parts emerge from the jelly.
 */
export function prepare(A: Shape, B: Shape): Morph {
  const a = normalize(A);
  const b = normalize(B);
  const split = (s: Shape) => {
    const outer = s.filter((r) => area(r) > 0).sort((p, q) => area(q) - area(p));
    const holes = s.filter((r) => area(r) <= 0).sort((p, q) => area(p) - area(q));
    return { outer, holes };
  };
  const sa = split(a);
  const sb = split(b);
  const mainA = sa.outer[0] ?? a[0];
  const mainB = sb.outer[0] ?? b[0];
  const out: Morph = { a: [], b: [] };
  for (const kind of ['outer', 'holes'] as const) {
    const ra = sa[kind];
    const rb = sb[kind];
    const n = Math.max(ra.length, rb.length);
    for (let i = 0; i < n; i++) {
      const x = ra[i] ?? [nearestVertex(mainA, centroid(rb[i]))];
      const y = rb[i] ?? [nearestVertex(mainB, centroid(ra[i]))];
      const [fa, fb] = pairRings(x, y);
      out.a.push(fa);
      out.b.push(fb);
    }
  }
  return out;
}

/**
 * One leg of jelly motion, A → B. The jelly first *stretches* A's box onto B's box (an affine stretch, so every
 * edge stays straight: allowed for the website jelly, §4.2), and only in the last part of the leg squares off into
 * B's outline, where vertices travel a few pixels at most. Interpolating far-apart vertices directly reads as a blob.
 */
export class Leg {
  private m: Morph;
  private from: Box;
  private to: Box;
  constructor(A: Shape, B: Shape, private shapeStart = 0.45) {
    this.from = bounds(A);
    this.to = bounds(B);
    const k = (v: number, w: number) => (w > 1e-6 ? v / w : 0);
    const kx = k(this.to.w, this.from.w);
    const ky = k(this.to.h, this.from.h);
    // A, stretched onto B's box.
    const a = A.map((r) => r.map(([x, y]) => [this.to.x + (x - this.from.x) * kx, this.to.y + (y - this.from.y) * ky] as const));
    this.m = prepare(a, B);
  }
  /** Box of the jelly at t (eased progress 0…1). */
  box(t: number): Box {
    const l = (p: number, q: number) => p + (q - p) * t;
    return { x: l(this.from.x, this.to.x), y: l(this.from.y, this.to.y), w: l(this.from.w, this.to.w), h: l(this.from.h, this.to.h) };
  }
  path(t: number): string {
    const s = t <= this.shapeStart ? 0 : (t - this.shapeStart) / (1 - this.shapeStart);
    const b = this.box(t);
    const kx = this.to.w > 1e-6 ? b.w / this.to.w : 1;
    const ky = this.to.h > 1e-6 ? b.h / this.to.h : 1;
    let d = '';
    for (let r = 0; r < this.m.a.length; r++) {
      const a = this.m.a[r];
      const c = this.m.b[r];
      for (let i = 0; i < a.length; i += 2) {
        const x = a[i] + (c[i] - a[i]) * s;
        const y = a[i + 1] + (c[i + 1] - a[i + 1]) * s;
        d += `${i ? 'L' : 'M'}${fmt(b.x + (x - this.to.x) * kx)} ${fmt(b.y + (y - this.to.y) * ky)}`;
      }
      d += 'Z';
    }
    return d;
  }
}

/** A keyframe sequence (§4.6): shapes[0] → shapes[1] → …, each leg taking its share of t. */
export class Sequence {
  private legs: Leg[] = [];
  private stops: number[] = [0];
  constructor(
    readonly shapes: Shape[],
    weights?: number[],
  ) {
    const w = weights ?? shapes.slice(1).map(() => 1);
    const sum = w.reduce((p, q) => p + q, 0);
    let acc = 0;
    for (let i = 1; i < shapes.length; i++) {
      this.legs.push(new Leg(shapes[i - 1], shapes[i]));
      acc += w[i - 1] / sum;
      this.stops.push(acc);
    }
  }
  path(t: number): string {
    const c = Math.min(1, Math.max(0, t));
    let i = 0;
    while (i < this.legs.length - 1 && c > this.stops[i + 1]) i++;
    const local = (c - this.stops[i]) / (this.stops[i + 1] - this.stops[i] || 1);
    return this.legs[i].path(ease(local));
  }
}

/** The brand ease, cubic-bezier(.7,0,.2,1), solved for x. */
export function ease(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const [x1, y1, x2, y2] = [0.7, 0, 0.2, 1];
  const bx = (t: number) => 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3;
  const by = (t: number) => 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3;
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 24; k++) {
    const mid = (lo + hi) / 2;
    if (bx(mid) < x) lo = mid;
    else hi = mid;
  }
  return by((lo + hi) / 2);
}
