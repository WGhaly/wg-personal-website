/**
 * Station registry (Nine liquid scroll engine, adapted for waseemghaly.com). A station is a real DOM element the
 * liquid becomes:
 *   <el data-jelly="<id>" data-jelly-type="text|glyph|fill|outline|rest">
 * inside a pinned section <section data-jelly-section>. The engine walks them in DOM order.
 *
 * Optional attributes on a station element:
 *   data-jelly-radius="12" [data-jelly-corners="ts te"]   corner radius; all corners unless listed (logical, mirrored in RTL)
 *   data-jelly-stroke="3"                                 outline thickness (matches the --stroke of .jelly-frame)
 *   [data-jelly-part]                                     outline type: children whose frames form the shape
 */
export type StationType = 'text' | 'glyph' | 'fill' | 'outline' | 'rest';

/** What the station does during its hold. p runs 0 → 1. Must be idempotent for any p. */
export type Hold = (el: HTMLElement, p: number) => void;

/** waseemghaly.com story order (Oct 2026): Nin9 first, then consulting, the journey and contact. */
export const STATIONS: { id: string; type: StationType }[] = [
  { id: 'wg-mark', type: 'fill' },
  { id: 'hero-nin9', type: 'text' },
  { id: 'nin9-frame', type: 'outline' },
  { id: 'plan-phases', type: 'outline' },
  { id: 'consulting-areas', type: 'outline' },
  { id: 'journey-word', type: 'text' },
  { id: 'clients-word', type: 'text' },
  { id: 'execution', type: 'text' },
  { id: 'contact-email', type: 'fill' },
];

/** Shows [data-reveal] items one by one across the hold. p < 0 (no engine) shows them all. */
const reveal = (root: ParentNode, p: number, sel = '[data-reveal]') => {
  const items = root.querySelectorAll<HTMLElement>(sel);
  items.forEach((it, i) => it.toggleAttribute('data-shown', p < 0 || p >= (i + 0.5) / (items.length + 0.5)));
};
/** Lights an outline's parts in order (1 → n). p < 0 lights them all. */
const lightParts = (el: HTMLElement, p: number) => {
  const parts = el.querySelectorAll<HTMLElement>('[data-jelly-part]');
  parts.forEach((part, i) => part.toggleAttribute('data-lit', p < 0 || p >= i / parts.length));
};
/** The section: chapter-wide reveals. */
const chapterOf = (el: HTMLElement) => el.closest<HTMLElement>('[data-jelly-section]') ?? el;

/**
 * Hold animations keyed by station id. Called with p in 0…1 while scrolling, and with p = -1 when the engine
 * stops (reduced motion, Pause motion): restore the static, server-rendered state.
 */
export const holds: Record<string, Hold> = {
  'nin9-frame': (el, p) => reveal(chapterOf(el), p),
  'plan-phases': lightParts,
  'consulting-areas': lightParts,
  'journey-word': (el, p) => reveal(chapterOf(el), p),
  'clients-word': (el, p) => reveal(chapterOf(el), p),
  execution: (el, p) => reveal(chapterOf(el), p),
  'contact-email': (el, p) => reveal(chapterOf(el), p),
};
