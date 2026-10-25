'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { isMotionPaused, setMotionPaused, subscribeMotion } from '@/lib/motion';

/** Footer "Pause motion" (§4.3). Remembered across visits. */
export function MotionToggle({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const paused = useSyncExternalStore(subscribeMotion, isMotionPaused, () => false);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'off' : 'on';
  }, [paused]);

  return (
    <button type="button" onClick={() => setMotionPaused(!paused)} aria-pressed={paused} className="min-h-11 text-sm text-ink-muted transition-colors hover:text-ink">
      {paused ? playLabel : pauseLabel}
    </button>
  );
}
