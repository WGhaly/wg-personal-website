import { isMotionPaused } from '@/lib/motion';

/** Motion runs unless the visitor asked for less: reduced motion, Save-Data, or the footer's Pause motion. */
export function motionAllowed(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  return !isMotionPaused();
}

/**
 * Runs in <head> before first paint, so station elements don't flash orange and then turn off.
 * Same rules as motionAllowed(), inlined because it must not wait for any bundle.
 */
export const JELLY_BOOT = `(function(){try{var d=document.documentElement,m=matchMedia('(prefers-reduced-motion: reduce)').matches,s=navigator.connection&&navigator.connection.saveData,p=null;try{p=localStorage.getItem('nine-motion')}catch(e){}d.dataset.jellyMode=(m||s||p==='off')?'static':'live';d.dataset.motion=p==='off'?'off':'on'}catch(e){}})();`;
