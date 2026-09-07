import { Reveal } from '../components/Reveal';
import {
  APK_ARM64_URL,
  APK_X86_64_URL,
  APP_VERSION,
  MIN_ANDROID,
  RELEASES_URL,
  RELEASE_NOTES_URL,
} from '../config/links';
import styles from './Download.module.css';

interface Build {
  id: string;
  name: string;
  who: string;
  url: string | null;
}

const BUILDS: Build[] = [
  {
    id: 'arm64',
    name: 'Android ARM64',
    who: 'For 64-bit ARM phones, which is what almost every Android phone sold in the last several years uses. Start here.',
    url: APK_ARM64_URL,
  },
  {
    id: 'x86_64',
    name: 'x86_64',
    who: 'Mainly for Android emulators on a desktop machine. Only pick this if you know your device reports an x86_64 architecture.',
    url: APK_X86_64_URL,
  },
];

function BuildCard({ build }: { build: Build }) {
  const available = Boolean(build.url);
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <h3 className={styles.cardName}>{build.name}</h3>
        <span className={`${styles.state} ${available ? styles.stateOn : styles.stateOff}`}>
          {available ? 'Available' : 'Not published yet'}
        </span>
      </div>
      <p className={styles.cardWho}>{build.who}</p>

      {available ? (
        <a className={`btn ${styles.cardBtn}`} href={build.url ?? undefined} download>
          Download {build.name}
        </a>
      ) : (
        <>
          <span className={`btn ${styles.cardBtn}`} aria-disabled="true" role="link">
            Download {build.name}
          </span>
          <p className={styles.unavailable}>
            No file is configured for this build yet.{' '}
            <a href={RELEASES_URL} target="_blank" rel="noreferrer noopener">
              Check the releases page
            </a>{' '}
            for the latest APKs.
          </p>
        </>
      )}
    </div>
  );
}

export function Download() {
  return (
    <section className="section" id="download">
      <div className={styles.field} aria-hidden="true" />
      <div className="container">
        <Reveal className={styles.head}>
          <p className="kicker">Download</p>
          <h2>Harmony {APP_VERSION} for Android</h2>
          <p className="section-lead">
            Harmony is distributed as an APK you install yourself, not through an app store. Pick
            the build that matches your device.
          </p>
        </Reveal>

        <div className={styles.cards}>
          {BUILDS.map((b, i) => (
            <Reveal key={b.id} delay={i * 70}>
              <BuildCard build={b} />
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.notes}>
          <div>
            <h3 className={styles.notesHead}>Before you install</h3>
            <ul className={styles.list}>
              <li>
                Requires {MIN_ANDROID} or newer. Meeting that does not guarantee every phone
                behaves identically — hardware and vendor software vary.
              </li>
              <li>
                An APK installs outside the Play Store, so Android will ask you to allow
                installation from your browser or file manager the first time.
              </li>
              <li>
                There is no iOS version and no Play Store listing. This site and the GitHub
                releases page are the distribution.
              </li>
              <li>
                Updating an existing install needs the same signing key as the version already on
                the phone.
              </li>
            </ul>
          </div>
          <p className={styles.releaseLink}>
            <a href={RELEASE_NOTES_URL} target="_blank" rel="noreferrer noopener">
              Read the release notes
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
