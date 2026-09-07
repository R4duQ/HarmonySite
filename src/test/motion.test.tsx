import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/** Makes matchMedia answer `true` for the reduced-motion query only. */
function stubReducedMotion(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduced : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => vi.resetModules());

describe('reduced motion', () => {
  it('skips the flying card entirely but still advances the round', async () => {
    stubReducedMotion(true);
    const { DiscoverSection } = await import('../sections/DiscoverSection');
    const user = userEvent.setup();
    render(<DiscoverSection />);

    await user.click(screen.getByRole('button', { name: 'Like' }));

    // no ghost card is left behind to animate
    expect(document.querySelectorAll('[data-outgoing-card]')).toHaveLength(0);
    expect(screen.getByText(/Song 2 of/)).toBeInTheDocument();
  });

  it('animates an outgoing card when motion is welcome', async () => {
    stubReducedMotion(false);
    const { DiscoverSection } = await import('../sections/DiscoverSection');
    const user = userEvent.setup();
    render(<DiscoverSection />);

    await user.click(screen.getByRole('button', { name: 'Like' }));
    expect(document.querySelectorAll('[data-outgoing-card="like"]').length).toBe(1);
    expect(screen.getByText(/Song 2 of/)).toBeInTheDocument();
  });

  it('announces each choice to screen readers', async () => {
    stubReducedMotion(true);
    const { DiscoverSection } = await import('../sections/DiscoverSection');
    const user = userEvent.setup();
    render(<DiscoverSection />);

    await user.click(screen.getByRole('button', { name: 'Pass' }));
    const live = screen.getByRole('status');
    expect(live).toHaveTextContent(/Passed .+\. \d+ to go\./);
  });
});
