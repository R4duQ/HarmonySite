import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';

const RELEASES = 'https://github.com/R4duQ/HarmonyApp/releases';

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

async function renderDownload(arm64: string | null, x86: string | null) {
  vi.resetModules();
  vi.doMock('../config/links', async () => {
    const actual = await vi.importActual<typeof import('../config/links')>('../config/links');
    return { ...actual, APK_ARM64_URL: arm64, APK_X86_64_URL: x86 };
  });
  const { Download } = await import('../sections/Download');
  return render(<Download />);
}

describe('APK download buttons', () => {
  it('shows an unavailable state and a releases link when no URL is configured', async () => {
    await renderDownload(null, null);

    expect(screen.getAllByText('Not published yet')).toHaveLength(2);
    expect(screen.queryByText('Available')).not.toBeInTheDocument();

    // the button is present but explicitly disabled, and never a dead link
    const btn = screen.getByRole('link', { name: /download android arm64/i });
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(btn).not.toHaveAttribute('href');

    const fallbacks = screen.getAllByRole('link', { name: /check the releases page/i });
    expect(fallbacks).toHaveLength(2);
    for (const link of fallbacks) expect(link).toHaveAttribute('href', RELEASES);
  });

  it('becomes a real download link once a URL is configured', async () => {
    const url = 'https://github.com/R4duQ/HarmonyApp/releases/download/v1.0.0/Harmony-v1.0.0-arm64-v8a.apk';
    await renderDownload(url, null);

    expect(screen.getByText('Available')).toBeInTheDocument();
    const btn = screen.getByRole('link', { name: /download android arm64/i });
    expect(btn).toHaveAttribute('href', url);
    expect(btn).toHaveAttribute('download');
    expect(btn).not.toHaveAttribute('aria-disabled');

    // the other build still shows its unavailable state independently
    expect(screen.getByText('Not published yet')).toBeInTheDocument();
  });

  it('never invents a Play Store or iOS route', async () => {
    await renderDownload(null, null);
    const text = document.body.textContent ?? '';
    expect(text).toMatch(/no iOS version and no Play Store listing/i);
  });

  it('states the Android minimum without claiming universal support', async () => {
    await renderDownload(null, null);
    const notes = screen.getByRole('heading', { name: /before you install/i }).parentElement!;
    expect(within(notes).getByText(/Android 10 or newer/i)).toBeInTheDocument();
    expect(within(notes).getByText(/does not guarantee every phone/i)).toBeInTheDocument();
  });
});
