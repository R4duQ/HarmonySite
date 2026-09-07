import { useCallback, useEffect, useRef, useState } from 'react';
import { Artwork } from '../components/Artwork';
import { Reveal } from '../components/Reveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DEMO_GENRES, DEMO_SONGS } from '../data/discover';
import { recommend, type Choice, type Recommendation } from '../lib/recommend';
import { SHFL_URL } from '../config/links';
import styles from './DiscoverSection.module.css';

const SWIPE_THRESHOLD = 90;

export function DiscoverSection() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, Choice>>({});
  const [result, setResult] = useState<Recommendation | null>(null);
  const [drag, setDrag] = useState(0);
  const [ghost, setGhost] = useState<{ song: (typeof DEMO_SONGS)[number]; dir: Choice; key: number } | null>(null);
  const [status, setStatus] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const song = DEMO_SONGS[index];
  const done = index >= DEMO_SONGS.length;

  /* The choice is applied immediately and the outgoing card is handed to a
     separate "ghost" element that animates away on its own. Nothing waits on
     an animation, so fast clicking or holding an arrow key never drops an
     input — which is also what makes this usable from the keyboard. */
  const commit = useCallback(
    (choice: Choice) => {
      if (done) return;
      const current = DEMO_SONGS[index];
      const next = { ...choices, [current.id]: choice };

      setChoices(next);
      setDrag(0);
      setIndex(index + 1);
      if (!reduced) setGhost({ song: current, dir: choice, key: index });

      if (index + 1 >= DEMO_SONGS.length) {
        const rec = recommend(next);
        setResult(rec);
        setStatus(`Round finished. Recommended album: ${rec.album.title} by ${rec.album.artist}.`);
      } else {
        setStatus(
          `${choice === 'like' ? 'Liked' : 'Passed'} ${current.title}. ${DEMO_SONGS.length - index - 1} to go.`,
        );
      }
    },
    [choices, done, index, reduced],
  );

  const restart = () => {
    setIndex(0);
    setChoices({});
    setResult(null);
    setDrag(0);
    setGhost(null);
    setStatus('Demonstration restarted.');
  };

  // Move focus to the result so keyboard users land on it.
  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (done) return;
    pointerId.current = e.pointerId;
    startX.current = e.clientX;
    cardRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return;
    setDrag(e.clientX - startX.current);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    if (Math.abs(drag) > SWIPE_THRESHOLD) commit(drag > 0 ? 'like' : 'pass');
    else setDrag(0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      commit('like');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      commit('pass');
    }
  };

  const rotation = drag / 26;

  return (
    <section className="section" id="discover">
      <div className={styles.field} aria-hidden="true" />
      <div className="container">
        <div className={styles.top}>
          <Reveal>
            <p className="kicker">Discover</p>
            <h2 className={styles.title}>
              Find your next
              <span className={styles.titleLine}>full album</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="section-lead">
              Playlists are good at handing you one song at a time. Harmony's Discover works the
              other way round: swipe through a handful of songs, and it points you at one album
              worth hearing end to end — with a line explaining what in your choices led there.
              Refresh to browse another selection of up to 24 albums, or filter down to a genre.
            </p>
          </Reveal>
        </div>

        <Reveal className={styles.demo}>
          <div className={styles.demoHead}>
            <h3 id="demo-heading">Try a round</h3>
            <span className="demo-note">Demonstration with sample data</span>
          </div>

          <div className={styles.demoBody}>
            <div className={styles.deckArea}>
              {ghost && (
                <div
                  key={ghost.key}
                  className={`${styles.ghost} ${ghost.dir === 'like' ? styles.ghostLike : styles.ghostPass}`}
                  data-outgoing-card={ghost.dir}
                  aria-hidden="true"
                  onAnimationEnd={() => setGhost((g) => (g && g.key === ghost.key ? null : g))}
                >
                  <Artwork seed={ghost.song.seed} className={styles.cardArt} />
                  <div className={styles.cardText}>
                    <p className={styles.cardTitle}>{ghost.song.title}</p>
                    <p className={styles.cardArtist}>{ghost.song.artist}</p>
                    <p className={styles.cardFormat}>{ghost.song.format}</p>
                  </div>
                </div>
              )}

              {!done && song && (
                <>
                  {DEMO_SONGS.slice(index + 1, index + 3)
                    .reverse()
                    .map((s, i) => (
                      <div
                        key={s.id}
                        className={styles.behind}
                        style={{ '--k': DEMO_SONGS.slice(index + 1, index + 3).length - i } as React.CSSProperties}
                        aria-hidden="true"
                      >
                        <Artwork seed={s.seed} />
                      </div>
                    ))}

                  <div
                    ref={cardRef}
                    className={styles.card}
                    style={{
                      transform: `translateX(${drag}px) rotate(${rotation}deg)`,
                      transition: pointerId.current !== null ? 'none' : undefined,
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    role="group"
                    aria-labelledby="demo-heading"
                    aria-roledescription="Swipe card"
                    aria-describedby="swipe-help"
                  >
                    <span
                      className={`${styles.stamp} ${styles.stampLike}`}
                      style={{ opacity: Math.max(0, Math.min(1, drag / SWIPE_THRESHOLD)) }}
                      aria-hidden="true"
                    >
                      Like
                    </span>
                    <span
                      className={`${styles.stamp} ${styles.stampPass}`}
                      style={{ opacity: Math.max(0, Math.min(1, -drag / SWIPE_THRESHOLD)) }}
                      aria-hidden="true"
                    >
                      Pass
                    </span>

                    <Artwork seed={song.seed} className={styles.cardArt} />
                    <div className={styles.cardText}>
                      <p className={styles.cardTitle}>{song.title}</p>
                      <p className={styles.cardArtist}>{song.artist}</p>
                      <p className={styles.cardFormat}>{song.format}</p>
                    </div>
                  </div>
                </>
              )}

              {done && result && (
                <div className={styles.result} ref={resultRef} tabIndex={-1}>
                  <p className={styles.resultLabel}>Recommended album</p>
                  <div className={styles.resultArt}>
                    <Artwork seed={result.album.seed} sleeve />
                  </div>
                  <p className={styles.resultTitle}>{result.album.title}</p>
                  <p className={styles.resultMeta}>
                    {result.album.artist} · {result.album.year} · {result.album.genre} ·{' '}
                    {result.album.tracks} tracks
                  </p>
                  <p className={styles.resultWhy}>{result.explanation}</p>
                </div>
              )}
            </div>

            <div className={styles.controls}>
              <p className={styles.progress}>
                {done ? (
                  <>Round finished · {result?.likedCount ?? 0} of {DEMO_SONGS.length} liked</>
                ) : (
                  <>
                    Song {index + 1} of {DEMO_SONGS.length}
                  </>
                )}
              </p>
              <div className={styles.bar} aria-hidden="true">
                <span style={{ width: `${(index / DEMO_SONGS.length) * 100}%` }} />
              </div>

              {!done ? (
                <>
                  <div className={styles.buttons}>
                    <button type="button" className="btn btn--ghost" onClick={() => commit('pass')}>
                      Pass
                    </button>
                    <button type="button" className="btn" onClick={() => commit('like')}>
                      Like
                    </button>
                  </div>
                  <p className={styles.help} id="swipe-help">
                    Drag the card, use the buttons, or focus the card and press the left and right
                    arrow keys.
                  </p>
                </>
              ) : (
                <div className={styles.buttons}>
                  <button type="button" className="btn btn--quiet" onClick={restart}>
                    Start over
                  </button>
                </div>
              )}

              <p className={styles.disclaimer}>
                A small illustration of the idea, running on made-up songs. The real
                recommendations happen in the app, on your own library.
              </p>
            </div>
          </div>

          <p className="visually-hidden" role="status" aria-live="polite">
            {status}
          </p>
        </Reveal>

        <Reveal className={styles.genres}>
          <h3 className={styles.genresHead}>Or browse by genre</h3>
          <ul className={styles.genreList}>
            {DEMO_GENRES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className={styles.shfl}>
            Harmony's curated album selection draws on public album pages from{' '}
            <a href={SHFL_URL} target="_blank" rel="noreferrer noopener">
              The Shfl
            </a>
            , which open in your browser. Harmony is not affiliated with, sponsored by or endorsed
            by The Shfl, and listening notes in the app are Harmony's own writing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
