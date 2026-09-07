/**
 * Screenshots of the real app.
 *
 * Drop PNG/JPG files into `public/screens/` and set the path here.
 * Recommended: portrait, 21:9-ish (e.g. 1096 × 2560 from a Sony Xperia),
 * without the status bar if you can. Anything with a `null` path falls back
 * to the CSS recreation of that screen, which the site labels as a
 * "website preview".
 *
 * Example:
 *   library: '/screens/library.png',
 */
export type ScreenKey = 'library' | 'nowPlaying' | 'discover' | 'downloads';

export const SCREENSHOTS: Record<ScreenKey, string | null> = {
  library: null,
  nowPlaying: null,
  discover: null,
  downloads: null,
};

export const SCREEN_LABELS: Record<ScreenKey, string> = {
  library: 'Library',
  nowPlaying: 'Now Playing',
  discover: 'Discover',
  downloads: 'Downloads',
};

export const SCREEN_ORDER: ScreenKey[] = ['library', 'nowPlaying', 'discover', 'downloads'];
