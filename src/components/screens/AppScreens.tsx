import { Artwork } from '../Artwork';
import { SCREENSHOTS, type ScreenKey } from '../../config/screens';
import s from './screens.module.css';

/* ---------------------------------------------------------------
   Website previews of Harmony's screens.

   These are CSS recreations that follow the app's editorial design
   system (one colour field per section). If a real screenshot is set
   in src/config/screens.ts, it replaces the recreation entirely.
---------------------------------------------------------------- */

function NavBar({ active }: { active: 'Library' | 'Discover' | 'Playing' | 'Downloads' }) {
  const items: typeof active[] = ['Library', 'Discover', 'Playing', 'Downloads'];
  return (
    <div className={s.nav} aria-hidden="true">
      {items.map((i) => (
        <span key={i} className={i === active ? s.navItemOn : s.navItem}>
          {i}
        </span>
      ))}
    </div>
  );
}

const LIBRARY_ROWS = [
  { t: 'Low Tide Letters', a: 'Marrow & Pine', f: 'FLAC 24/96', seed: 11 },
  { t: 'Velour Static', a: 'Ileana Voss', f: 'FLAC 16/44.1', seed: 23 },
  { t: 'Corridor Nine', a: 'Sable Motorway', f: 'FLAC 16/44.1', seed: 37 },
  { t: 'Tape Hiss Lullaby', a: 'Fern Halloway', f: 'FLAC 24/48', seed: 41 },
  { t: 'Kitchen Radio, 2 a.m.', a: 'Marrow & Pine', f: 'MP3 320', seed: 67 },
  { t: 'Neon Cartography', a: 'Sable Motorway', f: 'FLAC 16/44.1', seed: 53 },
];

export function LibraryScreen() {
  return (
    <div className={`${s.screen} ${s.amber}`}>
      <div className={s.head}>Library</div>
      <div className={s.sub}>412 songs · 38 albums · on this phone</div>
      <div className={s.rows}>
        {LIBRARY_ROWS.map((r) => (
          <div className={s.row} key={r.t}>
            <span className={s.rowArt}>
              <Artwork seed={r.seed} />
            </span>
            <span className={s.rowText}>
              <span className={s.rowTitle}>{r.t}</span>
              <span className={s.rowMeta}>{r.a}</span>
            </span>
            <span className={s.badge}>{r.f}</span>
          </div>
        ))}
      </div>
      <NavBar active="Library" />
    </div>
  );
}

export function NowPlayingScreen() {
  const bars = [18, 34, 52, 30, 66, 44, 78, 50, 88, 40, 62, 28, 70, 46, 82, 36, 58, 24, 44, 30];
  const played = 11;
  return (
    <div className={`${s.screen} ${s.lavender}`}>
      <div className={s.npArt}>
        <Artwork seed={23} sleeve />
      </div>
      <div className={s.npTitle}>Velour Static</div>
      <div className={s.npArtist}>Ileana Voss · Signal Bleed</div>
      <div className={s.wave} aria-hidden="true">
        {bars.map((h, i) => (
          <i key={i} data-played={i < played ? '1' : '0'} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className={s.times}>
        <span>2:14</span>
        <span>4:02</span>
      </div>
      <div className={s.controls} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6L18 6v12z" />
        </svg>
        <span className={s.ctlPlay}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#b4a4dd">
            <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
          </svg>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" />
        </svg>
      </div>
      <div className={s.formatRow}>
        <span className={s.chip}>FLAC</span>
        <span className={s.chip}>16-bit</span>
        <span className={s.chip}>44.1 kHz</span>
      </div>
      <NavBar active="Playing" />
    </div>
  );
}

export function DiscoverScreen() {
  return (
    <div className={`${s.screen} ${s.green}`}>
      <div className={s.head}>Discover</div>
      <div className={s.sub}>Swipe songs · get an album</div>
      <div className={s.deck} aria-hidden="true">
        <div className={s.deckCard}>
          <Artwork seed={101} />
        </div>
        <div className={s.deckCard}>
          <Artwork seed={113} />
        </div>
        <div className={s.deckCard}>
          <Artwork seed={127} />
          <div className={s.deckLabel}>Velour Static</div>
          <div className={s.deckMeta}>Ileana Voss · Alt-pop</div>
        </div>
      </div>
      <div className={s.swipeHint} aria-hidden="true">
        <span>← Pass</span>
        <span>Like →</span>
      </div>
      <NavBar active="Discover" />
    </div>
  );
}

export function DownloadsScreen() {
  const rows = [
    { t: 'Porchlight Season', pct: 100 },
    { t: 'Blue Hour Transit', pct: 62 },
    { t: 'Slow Rooms', pct: 18 },
  ];
  return (
    <div className={`${s.screen} ${s.blue}`}>
      <div className={s.head}>Downloads</div>
      <div className={s.sub}>3 albums in the queue</div>
      <span className={s.simTag}>Simulated progress</span>
      <div className={s.rows}>
        {rows.map((r) => (
          <div key={r.t}>
            <div className={s.rowTitle}>{r.t}</div>
            <div className={s.dlRow}>
              <span className={s.dlBar}>
                <span style={{ width: `${r.pct}%` }} />
              </span>
              <span className={s.dlPct}>{r.pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <NavBar active="Downloads" />
    </div>
  );
}

const RECREATIONS: Record<ScreenKey, () => React.JSX.Element> = {
  library: LibraryScreen,
  nowPlaying: NowPlayingScreen,
  discover: DiscoverScreen,
  downloads: DownloadsScreen,
};

export const SCREEN_TONE: Record<ScreenKey, 'ink' | 'mint'> = {
  library: 'ink',
  nowPlaying: 'ink',
  discover: 'ink',
  downloads: 'ink',
};

/** Renders a real screenshot when configured, otherwise the CSS recreation. */
export function AppScreen({ which }: { which: ScreenKey }) {
  const shot = SCREENSHOTS[which];
  if (shot) {
    return (
      <img
        src={shot}
        alt={`Harmony ${which} screen`}
        loading="lazy"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }
  const Recreation = RECREATIONS[which];
  return <Recreation />;
}

/** True when this screen is a website recreation rather than a real screenshot. */
export function isRecreation(which: ScreenKey): boolean {
  return SCREENSHOTS[which] === null;
}
