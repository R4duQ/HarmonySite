import { Logo } from '../components/Logo';
import {
  DEEZER_URL,
  GITHUB_URL,
  RELEASES_URL,
  SHFL_URL,
  SOULSEEK_URL,
  SUPPORT_URL,
} from '../config/links';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size={34} />
            <p className={styles.tagline}>Your music. Your files. Your rules.</p>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <div>
              <h2 className={styles.colHead}>Site</h2>
              <ul>
                <li><a href="#discover">Discover</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#download">Download</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div>
            <div>
              <h2 className={styles.colHead}>Project</h2>
              <ul>
                <li><a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">GitHub</a></li>
                <li><a href={RELEASES_URL} target="_blank" rel="noreferrer noopener">Releases</a></li>
                <li><a href={SUPPORT_URL} target="_blank" rel="noreferrer noopener">Issues</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.attribution}>
          <h2 className={styles.colHead}>Attribution</h2>
          <p>
            Album covers shown on this site are original artwork generated for the page; no real
            record sleeves are reproduced. Harmony's curated album selection links to public album
            pages on{' '}
            <a href={SHFL_URL} target="_blank" rel="noreferrer noopener">The Shfl</a>, and album
            metadata and optional previews in the app come from{' '}
            <a href={DEEZER_URL} target="_blank" rel="noreferrer noopener">Deezer</a>'s public
            endpoints. Harmony includes a client for the{' '}
            <a href={SOULSEEK_URL} target="_blank" rel="noreferrer noopener">Soulseek</a> network.
            Harmony is not affiliated with, sponsored by or endorsed by any of them, and all names,
            trademarks and artwork remain the property of their owners. Full notices ship with the
            source in <code>THIRD_PARTY_NOTICES.md</code>.
          </p>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} R4duQ. Harmony is a personal project.</p>
          <p>Built for Android. Distributed as an APK.</p>
        </div>
      </div>
    </footer>
  );
}
