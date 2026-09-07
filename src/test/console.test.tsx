import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import App from '../App';

let errors: unknown[][] = [];
let warns: unknown[][] = [];

beforeEach(() => {
  errors = [];
  warns = [];
  vi.spyOn(console, 'error').mockImplementation((...a) => errors.push(a));
  vi.spyOn(console, 'warn').mockImplementation((...a) => warns.push(a));
});

afterEach(() => vi.restoreAllMocks());

describe('render hygiene', () => {
  it('mounts the whole page in StrictMode with no console errors or warnings', () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    expect(errors, `console.error: ${JSON.stringify(errors)}`).toHaveLength(0);
    expect(warns, `console.warn: ${JSON.stringify(warns)}`).toHaveLength(0);
  });

  it('has exactly one h1 and no skipped heading levels', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('h1')).toHaveLength(1);

    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4')).map((h) =>
      Number(h.tagName[1]),
    );
    let prev = levels[0];
    for (const level of levels) {
      expect(level - prev, `jump from h${prev} to h${level}`).toBeLessThanOrEqual(1);
      prev = level;
    }
  });

  it('gives every landmark and interactive control an accessible name', () => {
    const { container } = render(<App />);

    for (const btn of container.querySelectorAll('button')) {
      const name = btn.getAttribute('aria-label') || btn.textContent?.trim();
      expect(name, `button without a name: ${btn.outerHTML.slice(0, 80)}`).toBeTruthy();
    }
    for (const a of container.querySelectorAll('a')) {
      const name = a.getAttribute('aria-label') || a.textContent?.trim();
      expect(name, `link without a name: ${a.outerHTML.slice(0, 80)}`).toBeTruthy();
    }
    expect(container.querySelector('main')).toBeTruthy();
    expect(container.querySelector('header')).toBeTruthy();
    expect(container.querySelector('footer')).toBeTruthy();
  });

  it('opens every external link safely', () => {
    const { container } = render(<App />);
    for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
      expect(a.target, a.href).toBe('_blank');
      expect(a.rel, a.href).toContain('noopener');
    }
  });
});
