// Motion preference store (§4.3). localStorage holds only this one value (§11), always inside try/catch.
export const MOTION_KEY = 'nine-motion';
const EVENT = 'nine:motion';

export function isMotionPaused(): boolean {
  try {
    return window.localStorage.getItem(MOTION_KEY) === 'off';
  } catch {
    return false;
  }
}

export function setMotionPaused(paused: boolean) {
  try {
    window.localStorage.setItem(MOTION_KEY, paused ? 'off' : 'on');
  } catch {}
  document.documentElement.dataset.motion = paused ? 'off' : 'on';
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { paused } }));
}

export function subscribeMotion(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}
