import { describe, expect, it } from 'vitest';
import { recommend } from '../lib/recommend';
import { DEMO_SONGS } from '../data/discover';

const byTitle = (t: string) => DEMO_SONGS.find((s) => s.title === t)!;

describe('demo recommendation', () => {
  it('picks the folk record when the warm acoustic songs are liked', () => {
    const rec = recommend({
      [byTitle('Low Tide Letters').id]: 'like',
      [byTitle('Kitchen Radio, 2 a.m.').id]: 'like',
      [byTitle('Corridor Nine').id]: 'pass',
      [byTitle('Neon Cartography').id]: 'pass',
    });
    expect(rec.album.title).toBe('Porchlight Season');
    expect(rec.likedCount).toBe(2);
    expect(rec.explanation).toContain('Porchlight Season');
  });

  it('picks the synthwave record when the driving electric songs are liked', () => {
    const rec = recommend({
      [byTitle('Corridor Nine').id]: 'like',
      [byTitle('Neon Cartography').id]: 'like',
      [byTitle('Low Tide Letters').id]: 'pass',
    });
    expect(rec.album.title).toBe('Blue Hour Transit');
  });

  it('still returns an album and a sensible line when nothing was liked', () => {
    const choices = Object.fromEntries(DEMO_SONGS.map((s) => [s.id, 'pass' as const]));
    const rec = recommend(choices);
    expect(rec.album).toBeTruthy();
    expect(rec.likedCount).toBe(0);
    expect(rec.explanation).toContain('change of direction');
  });

  it('is deterministic', () => {
    const choices = { [DEMO_SONGS[0].id]: 'like' as const };
    expect(recommend(choices).album.id).toBe(recommend(choices).album.id);
  });

  it('names supporting songs that actually share a trait with the album', () => {
    const rec = recommend({
      [byTitle('Low Tide Letters').id]: 'like',
      [byTitle('Kitchen Radio, 2 a.m.').id]: 'like',
    });
    for (const song of rec.supportingSongs) {
      expect(song.traits.some((t) => rec.album.traits.includes(t))).toBe(true);
    }
  });
});
