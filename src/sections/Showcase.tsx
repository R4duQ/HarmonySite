import { useRef, useState } from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppScreen, isRecreation } from '../components/screens/AppScreens';
import { Reveal } from '../components/Reveal';
import { SCREEN_LABELS, SCREEN_ORDER, type ScreenKey } from '../config/screens';
import styles from './Showcase.module.css';

const BLURBS: Record<ScreenKey, string> = {
  library: 'Everything stored on the phone, with the format, bit depth and sample rate of each file visible in the list rather than buried in a details panel.',
  nowPlaying: 'The record turns while it plays, the seek bar is drawn from the track itself, and the format of what you are hearing stays on screen.',
  discover: 'A deck of songs you swipe through. Harmony reads the round and points you at one full album at the end.',
  downloads: 'A queue you can watch, pause and cancel, with per-track choices kept from the moment you started the download.',
};

export function Showcase() {
  const [active, setActive] = useState<ScreenKey>('library');
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  /* Roving-tabindex arrow-key navigation, per the WAI-ARIA tabs pattern. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = SCREEN_ORDER.indexOf(active);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % SCREEN_ORDER.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = SCREEN_ORDER.length - 1;
    else return;
    e.preventDefault();
    setActive(SCREEN_ORDER[next]);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className="section" id="showcase">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="kicker">Inside the app</p>
          <h2>Four screens, one idea: your files, close at hand</h2>
          <p className="section-lead">
            Pick a screen to see how Harmony lays it out. These are previews on a website — the
            Android app is where they actually run.
          </p>
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.phoneCol}>
            <PhoneFrame width={320} label={`Harmony ${SCREEN_LABELS[active]} screen`}>
              <div key={active} className={styles.screenSwap}>
                <AppScreen which={active} />
              </div>
            </PhoneFrame>
          </div>

          <div className={styles.panel}>
            <div
              className={styles.tabs}
              role="tablist"
              aria-label="Harmony screens"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
            >
              {SCREEN_ORDER.map((key, i) => (
                <button
                  key={key}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${key}`}
                  aria-selected={active === key}
                  aria-controls={`panel-${key}`}
                  tabIndex={active === key ? 0 : -1}
                  className={`${styles.tab} ${active === key ? styles.tabOn : ''}`}
                  onClick={() => setActive(key)}
                >
                  <span className={styles.tabName}>{SCREEN_LABELS[key]}</span>
                </button>
              ))}
            </div>

            <div
              className={styles.blurb}
              role="tabpanel"
              id={`panel-${active}`}
              aria-labelledby={`tab-${active}`}
              tabIndex={0}
            >
              <h3>{SCREEN_LABELS[active]}</h3>
              <p>{BLURBS[active]}</p>
              {isRecreation(active) && (
                <p className="demo-note">Website preview, recreated in CSS</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
