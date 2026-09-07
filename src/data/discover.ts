/**
 * Sample data for the Discover demonstration.
 *
 * Every artist, song and album here is fictional, and the artwork is drawn
 * procedurally (see components/Artwork.tsx), so nothing on the page
 * reproduces a real record. The demo picks an album by overlapping the
 * traits of songs you liked with each album's traits — a stand-in for the
 * in-app experience, not the app's real recommendation logic.
 */

export type Trait =
  | 'warm'
  | 'slow'
  | 'electric'
  | 'acoustic'
  | 'late-night'
  | 'driving'
  | 'vocal'
  | 'instrumental'
  | 'analog';

export interface DemoSong {
  id: string;
  title: string;
  artist: string;
  format: string;
  traits: Trait[];
  /** seed for the procedural artwork */
  seed: number;
}

export interface DemoAlbum {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  traits: Trait[];
  seed: number;
  tracks: number;
}

export const DEMO_SONGS: DemoSong[] = [
  { id: 's1', title: 'Low Tide Letters', artist: 'Marrow & Pine', format: 'FLAC 24/96', traits: ['warm', 'acoustic', 'vocal'], seed: 11 },
  { id: 's2', title: 'Velour Static', artist: 'Ileana Voss', format: 'FLAC 16/44.1', traits: ['electric', 'late-night', 'vocal'], seed: 23 },
  { id: 's3', title: 'Corridor Nine', artist: 'Sable Motorway', format: 'FLAC 16/44.1', traits: ['driving', 'electric', 'instrumental'], seed: 37 },
  { id: 's4', title: 'Tape Hiss Lullaby', artist: 'Fern Halloway', format: 'FLAC 24/48', traits: ['slow', 'analog', 'acoustic'], seed: 41 },
  { id: 's5', title: 'Neon Cartography', artist: 'Sable Motorway', format: 'FLAC 16/44.1', traits: ['driving', 'electric', 'late-night'], seed: 53 },
  { id: 's6', title: 'Kitchen Radio, 2 a.m.', artist: 'Marrow & Pine', format: 'FLAC 24/96', traits: ['warm', 'slow', 'analog'], seed: 67 },
];

export const DEMO_ALBUMS: DemoAlbum[] = [
  { id: 'a1', title: 'Porchlight Season', artist: 'Marrow & Pine', year: 2021, genre: 'Folk', traits: ['warm', 'acoustic', 'vocal', 'analog'], seed: 101, tracks: 10 },
  { id: 'a2', title: 'Blue Hour Transit', artist: 'Sable Motorway', year: 2019, genre: 'Synthwave', traits: ['driving', 'electric', 'instrumental', 'late-night'], seed: 113, tracks: 9 },
  { id: 'a3', title: 'Signal Bleed', artist: 'Ileana Voss', year: 2023, genre: 'Alt-pop', traits: ['electric', 'late-night', 'vocal'], seed: 127, tracks: 11 },
  { id: 'a4', title: 'Slow Rooms', artist: 'Fern Halloway', year: 2020, genre: 'Ambient folk', traits: ['slow', 'analog', 'acoustic', 'instrumental'], seed: 139, tracks: 8 },
];

export const TRAIT_LABELS: Record<Trait, string> = {
  warm: 'warm',
  slow: 'slow-paced',
  electric: 'electric',
  acoustic: 'acoustic',
  'late-night': 'late-night',
  driving: 'driving',
  vocal: 'vocal-led',
  instrumental: 'instrumental',
  analog: 'analog-textured',
};

/** Genres shown in the "browse a selection" strip. Purely illustrative. */
export const DEMO_GENRES = [
  'Folk',
  'Synthwave',
  'Alt-pop',
  'Ambient',
  'Jazz',
  'Post-rock',
  'Soul',
  'Hip-hop',
  'Classical',
  'Shoegaze',
];
