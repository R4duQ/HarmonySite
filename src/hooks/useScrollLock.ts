import { useEffect } from 'react';

const CLASS = 'menu-open';

/**
 * Locks page scrolling while `locked` is true by toggling a class on <html>.
 * The class is always removed on cleanup, so an unmounted menu can never
 * leave the page stuck.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    const root = document.documentElement;
    if (!locked) {
      root.classList.remove(CLASS);
      return;
    }
    root.classList.add(CLASS);
    return () => root.classList.remove(CLASS);
  }, [locked]);
}
