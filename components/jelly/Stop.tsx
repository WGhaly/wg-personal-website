import type { CSSProperties, ReactNode } from 'react';

/**
 * A reading stop (v3): while the jelly is live, the section sticks to the top and an empty spacer gives
 * `holds` stops' worth of scroll, so the page stands still while the liquid forms, the station's animation
 * finishes and the visitor reads. Without the live jelly the spacer is gone and the page scrolls normally.
 */
export function Stop({ holds = 1, children }: { holds?: number; children: ReactNode }) {
  return (
    <div data-jelly-wrap style={{ '--holds': holds } as CSSProperties}>
      {children}
      <div data-jelly-spacer aria-hidden="true" />
    </div>
  );
}
