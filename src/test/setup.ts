import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom has no matchMedia; the hooks guard for it but tests exercise both paths.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// jsdom has no IntersectionObserver; Reveal falls back to showing content.
if (!('IntersectionObserver' in window)) {
  // @ts-expect-error test shim
  window.IntersectionObserver = undefined;
}

if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn(() => false);
}
