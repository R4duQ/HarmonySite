import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Artwork } from '../components/Artwork';
import styles from './Features.module.css';

const BANDS = [
  { hz: '60', v: 62 },
  { hz: '230', v: 48 },
  { hz: '910', v: 55 },
  { hz: '3.6k', v: 40 },
  { hz: '14k', v: 58 },
];

export function Features() {
  const [bands, setBands] = useState(BANDS.map((b) => b.v));

  return (
    <section className="section" id="features">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="kicker">Sound and library</p>
          <h2>The rest of what Harmony does</h2>
          <p className="section-lead">
            Discovery is the part people notice first. Everything below is what makes a library
            worth coming back to.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {/* Offline — wide, leads the grid */}
          <Reveal className={`${styles.cell} ${styles.cellWide}`}>
            <h3>Offline is the default, not a mode</h3>
            <p>
              Harmony plays what is on the phone. No connection is needed to open your library,
              build a playlist or finish an album — the online parts are the ones you go looking
              for, and they stay out of the way when there is no signal.
            </p>
            <div className={styles.offlineArt} aria-hidden="true">
              <span className={styles.offlineDisc} />
              <span className={styles.offlineDisc} />
              <span className={styles.offlineDisc} />
            </div>
          </Reveal>

          {/* Smart Shuffle */}
          <Reveal className={styles.cell} delay={60}>
            <h3>Smart Shuffle</h3>
            <p>
              Shuffle that scores tracks on how they actually sound rather than picking at random,
              and holds an anchor for the session so a run of songs does not drift into a
              completely different mood halfway through.
            </p>
            <div className={styles.shuffleArt} aria-hidden="true">
              {[26, 44, 62, 80, 58, 36, 70, 50].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </Reveal>

          {/* Library + playlists */}
          <Reveal className={styles.cell} delay={120}>
            <h3>A library you can rearrange</h3>
            <p>
              Songs, albums, artists and playlists, with tag editing when a file arrives labelled
              wrong, and deletion controls that tell you exactly what is about to leave the phone.
            </p>
            <div className={styles.libArt} aria-hidden="true">
              <Artwork seed={11} />
              <Artwork seed={53} />
              <Artwork seed={139} />
              <Artwork seed={23} />
            </div>
          </Reveal>

          {/* Format info — wide */}
          <Reveal className={`${styles.cell} ${styles.cellWide}`} delay={60}>
            <h3>What you are actually listening to, on screen</h3>
            <p>
              Harmony reads each file's container, bit depth and sample rate and shows them next to
              the track, and its FLAC check looks at whether a file's contents match what its
              header claims. That tells you what the file <em>is</em> — it cannot tell you where it
              came from or whether it was ever encoded from a lossy source.
            </p>
            <div className={styles.chips}>
              <span>FLAC 24/96</span>
              <span>FLAC 16/44.1</span>
              <span>MP3 320</span>
              <span>Header check</span>
            </div>
          </Reveal>

          {/* Equalizer — interactive but supporting */}
          <Reveal className={styles.cell} delay={120}>
            <h3>Equalizer</h3>
            <p>
              Five bands, a pre-amp with headroom, and gain changes that fade in rather than
              stepping. Drag a slider to see the shape change.
            </p>
            <div className={styles.eq}>
              {BANDS.map((b, i) => (
                <label key={b.hz} className={styles.band}>
                  <span className="visually-hidden">{b.hz} hertz</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={bands[i]}
                    className={styles.slider}
                    onChange={(e) => {
                      const next = [...bands];
                      next[i] = Number(e.target.value);
                      setBands(next);
                    }}
                  />
                  <span className={styles.bandHz} aria-hidden="true">
                    {b.hz}
                  </span>
                </label>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
