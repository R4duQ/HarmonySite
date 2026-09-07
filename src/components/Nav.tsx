import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { useScrollLock } from '../hooks/useScrollLock';
import { GITHUB_URL } from '../config/links';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#discover', label: 'Discover' },
  { href: '#features', label: 'Features' },
  { href: '#download', label: 'Download' },
  { href: '#about', label: 'About' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // If the viewport grows past the mobile breakpoint while the menu is open,
  // close it so the scroll lock can never outlive the panel.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <header className={`${styles.bar} ${scrolled ? styles.barScrolled : ''}`}>
        <nav className={styles.inner} aria-label="Main">
          <a href="#top" className={styles.brand} aria-label="Harmony, back to top">
            <Logo size={30} />
          </a>

          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
            </li>
          </ul>

          <a className={`btn btn--sm ${styles.cta}`} href="#download">
            Download
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.burgerXTop : styles.burgerLine} />
            <span className={open ? styles.burgerXHidden : styles.burgerLine} />
            <span className={open ? styles.burgerXBottom : styles.burgerLine} />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        hidden={!open}
      >
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" onClick={() => setOpen(false)}>
              GitHub
            </a>
          </li>
        </ul>
        <a className="btn" href="#download" onClick={() => setOpen(false)}>
          Download for Android
        </a>
      </div>
    </>
  );
}
