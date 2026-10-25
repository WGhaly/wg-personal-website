'use client';

import { useEffect, useRef } from 'react';
import { setStoryNav } from '@/lib/jelly/story-nav';
import { subscribeMotion } from '@/lib/motion';
import { motionAllowed } from './motion-gate';

/**
 * The jelly as one liquid stream (stream.ts): a fixed, decorative SVG above the content and below the header.
 * The engine (and Lenis) loads as a separate chunk, so it never blocks first paint.
 * Without motion (reduced motion, Save-Data, Pause motion, or no JS) the layer stays hidden and every
 * station element shows its orange state from CSS instead.
 */
export function JellyLayer() {
  const pathRef = useRef<SVGPathElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let engine: import('@/lib/jelly/stream').StreamEngine | null = null;
    let cancelled = false;

    const sync = async () => {
      const live = motionAllowed();
      document.documentElement.dataset.jellyMode = live ? 'live' : 'static';
      if (!live) {
        engine?.destroy();
        engine = null;
        setStoryNav(null);
        return;
      }
      if (engine || !pathRef.current || !shapeRef.current) return;
      const { StreamEngine } = await import('@/lib/jelly/stream');
      if (cancelled || engine || !motionAllowed()) return;
      const smooth = !window.matchMedia('(pointer: coarse)').matches;
      engine = new StreamEngine(pathRef.current, shapeRef.current!, { smooth });
      engine.start();
      setStoryNav(engine);
      (window as unknown as { __nineJelly?: () => unknown }).__nineJelly = () => engine?.debug();
    };

    sync();
    const unsubscribe = subscribeMotion(() => void sync());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', sync);
    const onDir = () => engine?.refresh();
    window.addEventListener('nine:dir', onDir);
    return () => {
      cancelled = true;
      unsubscribe();
      mq.removeEventListener('change', sync);
      window.removeEventListener('nine:dir', onDir);
      engine?.destroy();
      setStoryNav(null);
    };
  }, []);

  return (
    <svg className="jelly-layer" aria-hidden="true" focusable="false">
      <defs>
        {/* "Goo": blur, then a hard alpha threshold. Nearby drops merge and stretch apart like liquid. */}
        <filter id="jelly-goo" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" />
        </filter>
      </defs>
      {/* The object the liquid is forming: crisp edges, so it lands exactly on the real element. */}
      <path id="jelly-shape" ref={shapeRef} fill="var(--liquid)" fillRule="nonzero" style={{ opacity: 0 }} />
      <g filter="url(#jelly-goo)">
        <path id="jelly-fill" ref={pathRef} fill="var(--liquid)" fillRule="nonzero" style={{ opacity: 0 }} />
      </g>
      {/* Reserved for outline transitions drawn edge by edge (§4.6, frame 15). Hidden until used. */}
      <path id="jelly-stroke" fill="none" stroke="var(--liquid)" strokeWidth={3} style={{ opacity: 0 }} />
    </svg>
  );
}
