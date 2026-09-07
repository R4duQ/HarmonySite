import { useState } from 'react';
import { Artwork } from '../components/Artwork';
import { Reveal } from '../components/Reveal';
import { SOULSEEK_URL } from '../config/links';
import styles from './FlowSection.module.css';

const TRACKS = [
  { n: 1, title: 'Porchlight', len: '3:42', size: '32 MB' },
  { n: 2, title: 'Sixteen Winters', len: '4:18', size: '38 MB' },
  { n: 3, title: 'Dry Season', len: '2:55', size: '26 MB' },
  { n: 4, title: 'The Long Way Round', len: '5:31', size: '48 MB' },
  { n: 5, title: 'Porchlight (reprise)', len: '1:47', size: '15 MB' },
];

const STEPS = [
  {
    t: 'Find an album',
    d: 'A swipe round, a genre browse, or a playlist you brought in from elsewhere — you end up looking at one record rather than a stream of singles.',
  },
  {
    t: 'Pick a source',
    d: 'Harmony shows the sources you have set up and what each one can currently reach. Availability depends on the source, not on Harmony.',
  },
  {
    t: 'Take the album or just the tracks you want',
    d: 'Every track has its own checkbox before the transfer starts, so a 14-track record can arrive as the four songs you actually wanted.',
  },
  {
    t: 'Listen offline',
    d: 'Once files are on the phone they play with no connection at all. Nothing phones home to keep your own library working.',
  },
  {
    t: 'Keep it or clear it',
    d: 'After you have lived with an album for a while, Harmony asks whether to keep everything, keep what you played, or delete the files. Storage stays yours to manage.',
  },
];

export function FlowSection() {
  const [selected, setSelected] = useState<number[]>([1, 2, 4]);

  const toggle = (n: number) =>
    setSelected((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const totalMb = TRACKS.filter((t) => selected.includes(t.n)).reduce(
    (acc, t) => acc + parseInt(t.size, 10),
    0,
  );

  return (
    <section className="section" id="flow">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="kicker">From finding it to keeping it</p>
          <h2>Download. Listen. Keep what matters.</h2>
          <p className="section-lead">
            The whole point of a local library is that you decide what lives on your phone. Harmony
            makes each step of that explicit rather than filling your storage quietly.
          </p>
        </Reveal>

        <div className={styles.body}>
          <Reveal className={styles.steps} as="div">
            <ol className={styles.stepList}>
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.t}</h3>
                    <p className={styles.stepText}>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className={styles.picker} delay={80}>
            <div className={styles.pickerHead}>
              <span className={styles.pickerArt}>
                <Artwork seed={101} />
              </span>
              <div>
                <p className={styles.pickerTitle}>Porchlight Season</p>
                <p className={styles.pickerMeta}>Marrow &amp; Pine · 2021 · 5 tracks</p>
              </div>
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Choose the tracks to transfer</legend>
              <ul className={styles.trackList}>
                {TRACKS.map((t) => {
                  const on = selected.includes(t.n);
                  return (
                    <li key={t.n}>
                      <label className={`${styles.track} ${on ? styles.trackOn : ''}`}>
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggle(t.n)}
                          className={styles.checkbox}
                        />
                        <span className={styles.tick} aria-hidden="true">
                          <svg viewBox="0 0 16 16" width="11" height="11">
                            <path
                              d="M2 8.5l4 4 8-9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className={styles.trackNum}>{t.n}</span>
                        <span className={styles.trackTitle}>{t.title}</span>
                        <span className={styles.trackLen}>{t.len}</span>
                        <span className={styles.trackSize}>{t.size}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <div className={styles.pickerFoot}>
              <p className={styles.total}>
                {selected.length} of {TRACKS.length} selected · about {totalMb} MB
              </p>
              <span className="demo-note">Website preview · nothing is downloaded here</span>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.sources}>
          <h3 className={styles.sourcesHead}>About the sources</h3>
          <div className={styles.sourceGrid}>
            <div className={styles.source}>
              <p className={styles.sourceName}>
                <a href={SOULSEEK_URL} target="_blank" rel="noreferrer noopener">
                  Soulseek
                </a>
              </p>
              <p className={styles.sourceText}>
                Harmony includes a Soulseek client for searching and transferring files over that
                peer-to-peer network. What you can find there depends entirely on which users are
                online and what they choose to share — Harmony has no catalogue of its own and no
                affiliation with the network. You are responsible for having the right to the files
                you transfer.
              </p>
            </div>
            <div className={styles.source}>
              <p className={styles.sourceName}>Spotify playlist import</p>
              <p className={styles.sourceText}>
                Importing a playlist brings across the <em>list</em> — track names, artists, running
                order — so Harmony can match it against your library and show you what you are
                missing. It does not bring across audio, and Spotify does not supply files to
                Harmony.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
