import { useEffect, useRef } from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { AppScreen } from '../components/screens/AppScreens';
import { Artwork } from '../components/Artwork';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { APP_VERSION, MIN_ANDROID } from '../config/links';
import styles from './Hero.module.css';

export function Hero() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const finePointer = useMediaQuery('(pointer: fine)');
  const stageRef = useRef<HTMLDivElement>(null);

  /* Gentle pointer parallax on the floating artwork — desktop, mouse, and
     only when motion is welcome. One rAF-throttled listener and transforms
     are cleared on teardown. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced || !isDesktop || !finePointer) return;

    const layers = Array.from(stage.querySelectorAll<HTMLElement>('[data-depth]'));
    let frame = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      frame = 0;
      for (const el of layers) {
        const d = Number(el.dataset.depth ?? 0);
        el.style.transform = `translate3d(${tx * d}px, ${ty * d}px, 0)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
      for (const el of layers) el.style.transform = '';
    };
  }, [reduced, isDesktop, finePointer]);

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} ${styles.enter}`} style={{ '--i': 0 } as React.CSSProperties}>
            Harmony {APP_VERSION} for Android
          </p>

          <h1 className={styles.title}>
            <span className={styles.enter} style={{ '--i': 1 } as React.CSSProperties}>Your music.</span>
            <span className={styles.enter} style={{ '--i': 2 } as React.CSSProperties}>Your files.</span>
            <span className={`${styles.enter} ${styles.titleAccent}`} style={{ '--i': 3 } as React.CSSProperties}>
              Your rules.
            </span>
          </h1>

          <p className={`${styles.lead} ${styles.enter}`} style={{ '--i': 4 } as React.CSSProperties}>
            A music player for people who still keep their own files. Harmony holds your local
            library, plays it offline, helps you find whole albums worth sitting through, and
            leaves every decision about what stays on your phone to you.
          </p>

          <div className={`${styles.actions} ${styles.enter}`} style={{ '--i': 5 } as React.CSSProperties}>
            <a className="btn" href="#download">
              Download for Android
            </a>
            <a className="btn btn--ghost" href="#showcase">
              Explore Harmony
            </a>
          </div>

          <p className={`${styles.note} ${styles.enter}`} style={{ '--i': 6 } as React.CSSProperties}>
            Android APK · {MIN_ANDROID} or newer
          </p>
        </div>

        <div className={styles.stage} ref={stageRef}>
          <div className={styles.glow} aria-hidden="true" />

          <span className={`${styles.float} ${styles.floatA}`} data-depth="7" aria-hidden="true">
            <Artwork seed={101} />
          </span>
          <span className={`${styles.float} ${styles.floatB}`} data-depth="12" aria-hidden="true">
            <Artwork seed={139} />
          </span>
          <span className={`${styles.float} ${styles.floatC}`} data-depth="18" aria-hidden="true">
            <span className={styles.disc} />
          </span>

          <div className={styles.phoneWrap} data-depth="3">
            <PhoneFrame width={294} label="Harmony's Now Playing screen">
              <AppScreen which="nowPlaying" />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
