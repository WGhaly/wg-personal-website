'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { getStoryNav, onStoryNav } from '@/lib/jelly/story-nav';

/** A chapter of the story: the first station the liquid forms in it, and the section to fall back to. */
export type RailChapter = { key: string; label: string; station: string; anchor: string };

/**
 * The story rail: a line on the end edge with a point per chapter. The line fills as you read, the current
 * chapter lights up, and a click scrolls there quickly (the liquid races along its path on the way).
 * Without the live jelly it scrolls to the chapter's section instead. nin9.org: the chapter list grows when a
 * path is chosen (HomeStory), so it is a prop and everything is re-measured when it changes.
 */
export function StoryRail({ chapters: CHAPTERS, label }: { chapters: RailChapter[]; label: string }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const starts = useRef<number[]>([]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const nav = getStoryNav();
      const vh = window.innerHeight;
      starts.current = CHAPTERS.map((c, i) => {
        if (i === 0) return 0;
        const pos = nav?.positionOf(c.station);
        if (pos) return pos.arrive;
        const el = document.getElementById(c.anchor);
        return el ? el.getBoundingClientRect().top + window.scrollY - vh * 0.4 : Infinity;
      });
    };
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const s = starts.current;
      let i = 0;
      while (i < s.length - 1 && y >= s[i + 1]) i++;
      const next = s[i + 1] ?? s[i];
      const f = next > s[i] ? Math.min(1, Math.max(0, (y - s[i]) / (next - s[i]))) : 1;
      setActive(i);
      setProgress((i + f) / (CHAPTERS.length - 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const refresh = () => {
      measure();
      onScroll();
    };
    refresh();
    // Engine positions arrive after it starts, and change when it re-measures (resize, fonts).
    const off = onStoryNav(refresh);
    const timer = window.setInterval(measure, 2000);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refresh);
    return () => {
      off();
      clearInterval(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refresh);
    };
  }, [CHAPTERS]);

  const go = (i: number) => {
    const c = CHAPTERS[i];
    const nav = getStoryNav();
    if (nav) nav.goTo(c.station);
    else document.getElementById(c.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const current = `${String(active + 1).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')}`;

  return (
    <>
      {/* Desktop and tablet landscape: the chapters on the start side, always readable, the current one lit. */}
      <nav aria-label={label} className="story-rail" style={{ '--rail-progress': progress } as CSSProperties}>
        <span className="story-rail-line" aria-hidden="true">
          <span />
        </span>
        <ol>
          {CHAPTERS.map((c, i) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === active ? 'step' : undefined}
                data-passed={i < active ? '' : undefined}
                className="story-rail-point"
              >
                <span className="story-rail-dot" aria-hidden="true" />
                <span dir="auto" className="story-rail-label">{c.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Phones and narrow tablets: a slim bar under the header with the current chapter; tap for the list. */}
      <details className="story-bar" style={{ '--rail-progress': progress } as CSSProperties}>
        <summary>
          <span className="story-bar-step" dir="ltr">
            {current}
          </span>
          <span dir="auto" className="story-bar-name">{CHAPTERS[Math.min(active, CHAPTERS.length - 1)].label}</span>
          <span className="story-bar-chevron" aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </summary>
        <ol>
          {CHAPTERS.map((c, i) => (
            <li key={c.key}>
              <button
                type="button"
                aria-current={i === active ? 'step' : undefined}
                onClick={(e) => {
                  (e.currentTarget.closest('details') as HTMLDetailsElement).open = false;
                  go(i);
                }}
              >
                <span className="story-rail-dot" aria-hidden="true" />
                {c.label}
              </button>
            </li>
          ))}
        </ol>
        <span className="story-bar-progress" aria-hidden="true">
          <span />
        </span>
      </details>
    </>
  );
}
