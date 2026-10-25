/**
 * Jelly shapes: the outlines the liquid forms. Every function returns rings in layout pixels, ready for geometry.ts.
 * Boxes have soft round corners (Nine Brand v1.1; the v0.7 identity used 45° cuts here). Glyph targets are real
 * Manrope / Alexandria letterforms, and logo stations trace the logo file's own orange path (stream.ts).
 */
import glyphData from './glyphs.json';
import { type Box, type Pt, type Ring, type Shape, parsePath, transform } from './geometry';

export const pad = (b: Box, p: number): Box => ({ x: b.x - p, y: b.y - p, w: b.w + 2 * p, h: b.h + 2 * p });

/* ---------------------------------------------------------------- boxes */

/**
 * Physical corners. Every corner is rounded unless a component lists logical ones (data-jelly-corners="ts te"),
 * which resolveCorners mirrors in RTL.
 */
export type Corner = 'tl' | 'tr' | 'br' | 'bl';

export function resolveCorners(logical: string | undefined, rtl: boolean): Corner[] {
  if (!logical) return ['tl', 'tr', 'br', 'bl'];
  const map: Record<string, Corner> = rtl
    ? { ts: 'tr', te: 'tl', bs: 'br', be: 'bl' }
    : { ts: 'tl', te: 'tr', bs: 'bl', be: 'br' };
  return logical
    .split(/[\s,]+/)
    .map((c) => map[c] ?? (c as Corner))
    .filter(Boolean);
}

/** Points per quarter circle: enough that a 16px corner reads round, few enough for the morph. */
const ARC = 6;

/** A rectangle with round corners of radius `r` px on the given corners. Clockwise from the top-left. */
export function roundRect(b: Box, r = 0, corners: Corner[] = ['tl', 'tr', 'br', 'bl']): Ring {
  const c = Math.max(0, Math.min(r, b.w / 2, b.h / 2));
  const { x, y, w, h } = b;
  const out: Pt[] = [];
  // Corner centre and start angle (y down, so -90° points up), clockwise.
  const spec: [Corner, number, number, number, Pt][] = [
    ['tl', x + c, y + c, Math.PI, [x, y]],
    ['tr', x + w - c, y + c, -Math.PI / 2, [x + w, y]],
    ['br', x + w - c, y + h - c, 0, [x + w, y + h]],
    ['bl', x + c, y + h - c, Math.PI / 2, [x, y + h]],
  ];
  for (const [k, cx, cy, a0, sharp] of spec) {
    if (c === 0 || !corners.includes(k)) {
      out.push(sharp);
      continue;
    }
    for (let i = 0; i <= ARC; i++) {
      const a = a0 + (i / ARC) * (Math.PI / 2);
      out.push([cx + c * Math.cos(a), cy + c * Math.sin(a)]);
    }
  }
  return out;
}

/**
 * An outline as a filled ring: outer edge on the box, inner edge `stroke` px inside. The inner radius is
 * r − stroke, as CSS draws a border's inner edge, so it matches .jelly-frame in globals.css and the handoff is exact.
 */
export function frameRing(b: Box, stroke = 3, r = 0, corners: Corner[] = ['tl', 'tr', 'br', 'bl']): Shape {
  const outer = roundRect(b, r, corners);
  const inset = { x: b.x + stroke, y: b.y + stroke, w: b.w - 2 * stroke, h: b.h - 2 * stroke };
  const inner = roundRect(inset, Math.max(0, r - stroke), corners).reverse();
  return [outer, inner];
}

/* ---------------------------------------------------------------- glyphs */

type GlyphId = keyof typeof glyphData.glyphs;
const GLYPHS = Object.fromEntries(
  Object.entries(glyphData.glyphs).map(([id, g]) => [id, g.chars.map((c) => ({ x: c.x, rings: parsePath(c.d, 12) }))]),
) as Record<GlyphId, { x: number; rings: Shape }[]>;

export const isGlyphId = (id: string): id is GlyphId => id in glyphData.glyphs;

/**
 * A glyph target fitted to its DOM text (§4.4). `box` is the inline element's content box; its top sits one
 * ascender above the baseline (Manrope's hhea ascender = winAscent; Alexandria's = its typo ascender, which
 * browsers use because it sets USE_TYPO_METRICS, so this holds on every platform).
 */
export function glyph(id: GlyphId, box: Box, fontSize: number, letterSpacing = 0): Shape {
  const g = glyphData.glyphs[id];
  const k = fontSize / g.unitsPerEm;
  const baseline = box.y + g.ascender * k;
  return GLYPHS[id].flatMap((c, i) => transform(c.rings, k, box.x + i * letterSpacing, baseline));
}
