import { DEMO_ALBUMS, DEMO_SONGS, TRAIT_LABELS, type DemoAlbum, type DemoSong, type Trait } from '../data/discover';

export type Choice = 'like' | 'pass';

export interface Recommendation {
  album: DemoAlbum;
  /** traits shared between liked songs and the album, most common first */
  matchedTraits: Trait[];
  /** liked songs that share at least one trait with the album */
  supportingSongs: DemoSong[];
  /** how many of the songs were liked */
  likedCount: number;
  explanation: string;
}

/**
 * Picks the album whose traits overlap most with the songs the user liked.
 * Passed songs count against albums that share their traits, so the result
 * responds to both directions of the swipe. Deterministic and side-effect free.
 */
export function recommend(choices: Record<string, Choice>): Recommendation {
  const liked = DEMO_SONGS.filter((s) => choices[s.id] === 'like');
  const passed = DEMO_SONGS.filter((s) => choices[s.id] === 'pass');

  const weight = new Map<Trait, number>();
  for (const s of liked) for (const t of s.traits) weight.set(t, (weight.get(t) ?? 0) + 1);
  for (const s of passed) for (const t of s.traits) weight.set(t, (weight.get(t) ?? 0) - 0.5);

  let best: DemoAlbum = DEMO_ALBUMS[0];
  let bestScore = -Infinity;
  for (const album of DEMO_ALBUMS) {
    const score = album.traits.reduce((acc, t) => acc + (weight.get(t) ?? 0), 0);
    if (score > bestScore) {
      best = album;
      bestScore = score;
    }
  }

  const matchedTraits = best.traits
    .filter((t) => (weight.get(t) ?? 0) > 0)
    .sort((a, b) => (weight.get(b) ?? 0) - (weight.get(a) ?? 0));

  const supportingSongs = liked.filter((s) => s.traits.some((t) => best.traits.includes(t)));

  return {
    album: best,
    matchedTraits,
    supportingSongs,
    likedCount: liked.length,
    explanation: buildExplanation(best, matchedTraits, supportingSongs, liked.length),
  };
}

function buildExplanation(album: DemoAlbum, traits: Trait[], songs: DemoSong[], likedCount: number): string {
  if (likedCount === 0) {
    return `You passed on everything this round, so here's a change of direction: ${album.title} sits away from the songs you skipped.`;
  }
  const traitText = traits.slice(0, 3).map((t) => TRAIT_LABELS[t]);
  const songText = songs.slice(0, 2).map((s) => `“${s.title}”`);
  const because = traitText.length
    ? `it shares the ${joinNatural(traitText)} feel of ${joinNatural(songText)}`
    : `it stays close to the songs you liked`;
  return `${album.title} by ${album.artist} — ${because}.`;
}

function joinNatural(parts: string[]): string {
  if (parts.length <= 1) return parts.join('');
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}
