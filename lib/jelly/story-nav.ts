/**
 * A tiny bridge between the story rail and the stream engine, so the rail (in the first bundle) never imports
 * the engine (a separate chunk). The engine registers itself once it starts; the rail asks it for positions.
 */
export type StationPosition = { arrive: number; formed: number; held: number };
export type StoryNav = {
  positionOf(stationId: string): StationPosition | null;
  goTo(stationId: string): void;
  /** Re-reads every station from the DOM (nin9.org: a chosen path adds its chapters after load). */
  refresh(): void;
};

let current: StoryNav | null = null;
const listeners = new Set<() => void>();

export function setStoryNav(nav: StoryNav | null) {
  current = nav;
  listeners.forEach((f) => f());
}
export const getStoryNav = () => current;
export function onStoryNav(f: () => void) {
  listeners.add(f);
  return () => listeners.delete(f);
}
