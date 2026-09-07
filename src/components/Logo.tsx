import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

/**
 * Harmony's mark: a slanted H built from three round-capped bars.
 * Geometry and colours are copied from the app's own launcher vector
 * (app/src/main/res/drawable/ic_launcher_h.xml): ink #1A1403 on amber #F3A311.
 * Replace the SVG path here if the logo changes.
 */
export function Logo({ size = 32, withWordmark = true, className = '' }: LogoProps) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 108 108"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="108" height="108" rx="26" fill="#F3A311" />
        <path
          d="M45,34 L34,74 M74,34 L63,74 M39.5,54 L68.5,54"
          stroke="#1A1403"
          strokeWidth="12.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {withWordmark && <span className={styles.wordmark}>Harmony</span>}
    </span>
  );
}
