import { Reveal } from '../components/Reveal';
import { GITHUB_URL, SUPPORT_URL } from '../config/links';
import styles from './About.module.css';

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="kicker">About</p>
            <h2 className={styles.title}>Why this exists</h2>
          </Reveal>

          <Reveal delay={80} className={styles.body}>
            <p className={styles.big}>
              I wanted a player that treats a record as a whole thing again, and treats my files as
              mine.
            </p>
            <p>
              Streaming taught everyone to listen in singles. Harmony is built the other way round:
              find an album, sit with it, and decide afterwards whether it earns a place on your
              phone. The library lives on your device, so it plays with no connection and keeps
              working whether or not anything else does.
            </p>
            <p>
              Nothing is uploaded about what you listen to. What stays on the phone is your call —
              keep the album, keep the four songs you played, or delete it and get the storage back.
            </p>
            <p className={styles.signature}>Harmony is a personal project, built in the open.</p>

            <div className={styles.actions}>
              <a className="btn btn--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                Source on GitHub
              </a>
              <a className="btn btn--quiet" href={SUPPORT_URL} target="_blank" rel="noreferrer noopener">
                Report an issue or suggest something
              </a>
            </div>
            <p className={styles.note}>
              Feedback goes through GitHub issues — that way it stays visible and gets an answer,
              rather than disappearing into a contact form.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
