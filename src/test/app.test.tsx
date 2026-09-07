import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { DEMO_SONGS } from '../data/discover';
import { recommend } from '../lib/recommend';

beforeEach(() => {
  document.documentElement.className = '';
});

describe('navigation and scroll locking', () => {
  it('opens the mobile menu, locks scrolling, and unlocks it after a link is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(document.documentElement).not.toHaveClass('menu-open');

    await user.click(toggle);
    expect(document.documentElement).toHaveClass('menu-open');

    const panel = document.getElementById('mobile-menu')!;
    const link = within(panel).getByRole('link', { name: 'Features' });
    await user.click(link);

    expect(document.documentElement).not.toHaveClass('menu-open');
    expect(panel).toHaveAttribute('hidden');
  });

  it('closes on Escape and restores scrolling', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(document.documentElement).toHaveClass('menu-open');

    await user.keyboard('{Escape}');
    expect(document.documentElement).not.toHaveClass('menu-open');
  });

  it('points every nav link at a section that exists on the page', () => {
    render(<App />);
    const hrefs = ['#discover', '#features', '#download', '#about', '#showcase', '#top', '#main'];
    for (const href of hrefs) {
      expect(document.querySelector(href), `${href} should exist`).toBeTruthy();
    }
  });
});

describe('app showcase tabs', () => {
  it('follows the ARIA tabs pattern and swaps panels with the arrow keys', async () => {
    const user = userEvent.setup();
    render(<App />);

    const tablist = screen.getByRole('tablist', { name: /harmony screens/i });
    const tabs = within(tablist).getAllByRole('tab');
    expect(tabs).toHaveLength(4);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    tabs[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveFocus();

    await user.keyboard('{End}');
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Discover demonstration', () => {
  it('runs a full round with the buttons and reveals an explained album', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(`Song 1 of ${DEMO_SONGS.length}`)).toBeInTheDocument();

    for (let i = 0; i < DEMO_SONGS.length; i++) {
      const like = screen.getByRole('button', { name: 'Like' });
      await user.click(like);
    }

    // the visible label, not the live-region announcement
    expect(await screen.findByText('Recommended album')).toBeInTheDocument();
    expect(screen.getByText(/Round finished ·/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start over/i })).toBeInTheDocument();

    // the album named in the Discover section is the one the recommender picks,
    // and the explanation names it too rather than being boilerplate
    const discover = within(document.getElementById('discover')!);
    const expected = recommend(
      Object.fromEntries(DEMO_SONGS.map((s) => [s.id, 'like' as const])),
    ).album;
    expect(discover.getByText(expected.title)).toBeInTheDocument();
    // appears in the visible explanation and in the live-region announcement
    expect(
      discover.getAllByText(new RegExp(`${expected.title} by ${expected.artist}`)).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('accepts arrow keys on the focused card as a swipe alternative', async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen.getByRole('group', { name: /try a round/i });
    card.focus();
    await user.keyboard('{ArrowRight}');
    expect(await screen.findByText(`Song 2 of ${DEMO_SONGS.length}`)).toBeInTheDocument();

    const card2 = screen.getByRole('group', { name: /try a round/i });
    card2.focus();
    await user.keyboard('{ArrowLeft}');
    expect(await screen.findByText(`Song 3 of ${DEMO_SONGS.length}`)).toBeInTheDocument();
  });

  it('resets cleanly with Start over', async () => {
    const user = userEvent.setup();
    render(<App />);

    for (let i = 0; i < DEMO_SONGS.length; i++) {
      await user.click(screen.getByRole('button', { name: 'Pass' }));
    }
    await user.click(await screen.findByRole('button', { name: /start over/i }));

    expect(screen.getByText(`Song 1 of ${DEMO_SONGS.length}`)).toBeInTheDocument();
    expect(screen.queryByText('Recommended album')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
  });

  it('labels itself as a demonstration', () => {
    render(<App />);
    expect(screen.getByText(/Demonstration with sample data/i)).toBeInTheDocument();
  });
});

describe('track selection preview', () => {
  it('toggles tracks and keeps the total in step', async () => {
    const user = userEvent.setup();
    render(<App />);

    const group = screen.getByRole('group', { name: /choose the tracks to transfer/i });
    const boxes = within(group).getAllByRole('checkbox');
    expect(boxes).toHaveLength(5);

    const checkedBefore = boxes.filter((b) => (b as HTMLInputElement).checked).length;
    expect(screen.getByText(new RegExp(`${checkedBefore} of 5 selected`))).toBeInTheDocument();

    await user.click(boxes[0]);
    const checkedAfter = boxes.filter((b) => (b as HTMLInputElement).checked).length;
    expect(checkedAfter).toBe(checkedBefore - 1);
    expect(screen.getByText(new RegExp(`${checkedAfter} of 5 selected`))).toBeInTheDocument();
  });
});
