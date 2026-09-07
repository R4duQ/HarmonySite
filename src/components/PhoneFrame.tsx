import type { CSSProperties, ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

interface PhoneFrameProps {
  /** preferred width in px; the phone shrinks to fit a narrower parent */
  width?: number;
  children: ReactNode;
  className?: string;
  label?: string;
  /** status-bar colour: dark text on light screens, light on dark */
  tone?: 'ink' | 'mint';
}

/**
 * A CSS phone with the proportions of a modern Sony Xperia: tall 21:9
 * display, flat sides, small symmetric forehead/chin, no notch, and the
 * power/volume/shutter keys on the right edge.
 *
 * The outer element is a size container capped at 100% of its parent, and
 * everything inside is sized in `cqw`, so the whole device — bezels, radii,
 * and the type on screen — scales together instead of overflowing on a
 * narrow phone.
 */
export function PhoneFrame({ width = 300, children, className = '', label, tone = 'ink' }: PhoneFrameProps) {
  const style = {
    '--phone-w': `${width}px`,
    '--screen-ink': tone === 'ink' ? '#1A1403' : '#D7F0E1',
  } as CSSProperties;

  return (
    <div className={`${styles.phone} ${className}`} style={style} role={label ? 'img' : undefined} aria-label={label}>
      <div className={styles.body}>
        <span className={styles.keyPower} aria-hidden="true" />
        <span className={styles.keyVolume} aria-hidden="true" />
        <span className={styles.keyShutter} aria-hidden="true" />
        <div className={styles.screen}>
          <div className={styles.statusBar} aria-hidden="true">
            <span>9:41</span>
            <span className={styles.statusIcons}>
              <i /> <i /> <i />
            </span>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
