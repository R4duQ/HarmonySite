import styles from './Artwork.module.css';

interface ArtworkProps {
  /** deterministic seed → same picture every render */
  seed: number;
  /** optional real image; when set, the procedural cover is replaced */
  image?: string | null;
  alt?: string;
  className?: string;
  /** show a vinyl disc peeking out from the sleeve */
  sleeve?: boolean;
}

/* tiny deterministic PRNG so covers are stable across renders */
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const PALETTES: [string, string, string][] = [
  ['#1e4a3a', '#7fd6a8', '#f3a311'],
  ['#2a1e4a', '#b7a2ff', '#ffb36b'],
  ['#4a2a1e', '#ffc97a', '#d7f0e1'],
  ['#1e2f4a', '#8fc2ff', '#46e28e'],
  ['#3d1e2b', '#ff9bb0', '#f3e8d0'],
  ['#1f3a1e', '#c8ff8f', '#f3a311'],
];

/**
 * Original, procedurally drawn album artwork. Nothing here is a real record,
 * so the site never shows a cover it doesn't own. Pass `image` to use a real
 * file instead.
 */
export function Artwork({ seed, image, alt = '', className = '', sleeve = false }: ArtworkProps) {
  if (image) {
    return (
      <span className={`${styles.wrap} ${sleeve ? styles.sleeve : ''} ${className}`}>
        <img src={image} alt={alt} loading="lazy" decoding="async" className={styles.img} />
        {sleeve && <span className={styles.disc} aria-hidden="true" />}
      </span>
    );
  }

  const r = rng(seed);
  const [bg, a, b] = PALETTES[seed % PALETTES.length];
  const variant = Math.floor(r() * 3);
  const cx = 30 + r() * 40;
  const cy = 30 + r() * 40;
  const rad = 18 + r() * 22;
  const tilt = -20 + r() * 40;

  return (
    <span className={`${styles.wrap} ${sleeve ? styles.sleeve : ''} ${className}`} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <svg viewBox="0 0 100 100" className={styles.img} aria-hidden="true" focusable="false">
        <rect width="100" height="100" fill={bg} />
        {variant === 0 && (
          <>
            <circle cx={cx} cy={cy} r={rad} fill={a} />
            <circle cx={cx + rad * 0.55} cy={cy + rad * 0.35} r={rad * 0.45} fill={b} opacity="0.9" />
            <rect x="0" y="78" width="100" height="6" fill={b} opacity="0.5" />
          </>
        )}
        {variant === 1 && (
          <g transform={`rotate(${tilt} 50 50)`}>
            <rect x="-20" y="30" width="140" height="14" fill={a} />
            <rect x="-20" y="50" width="140" height="8" fill={b} opacity="0.85" />
            <rect x="-20" y="64" width="140" height="22" fill={a} opacity="0.55" />
          </g>
        )}
        {variant === 2 && (
          <>
            <path d={`M0,${60 + tilt} C 25,${30 + tilt} 50,${90 - tilt} 100,${45 + tilt} L100,100 L0,100 Z`} fill={a} />
            <circle cx={cx} cy={cy * 0.6} r={rad * 0.5} fill={b} />
          </>
        )}
      </svg>
      {sleeve && <span className={styles.disc} aria-hidden="true" />}
    </span>
  );
}
