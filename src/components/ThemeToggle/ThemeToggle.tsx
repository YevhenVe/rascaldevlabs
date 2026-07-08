import styles from "./ThemeToggle.module.scss";

type Theme = "light" | "dark";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className={styles.track}>
        {/* Static sun icon (left) — semi-transparent when dark */}
        <span className={`${styles.iconBase} ${styles.iconSunOutside} ${isDark ? styles.iconDimmed : ""}`}>
          <SunIcon />
        </span>

        {/* Static moon icon (right) — semi-transparent when light */}
        <span className={`${styles.iconBase} ${styles.iconMoonOutside} ${!isDark ? styles.iconDimmed : ""}`}>
          <MoonIcon />
        </span>

        {/* Moving thumb with icon inside */}
        <span className={`${styles.thumb} ${isDark ? styles.thumbDark : styles.thumbLight}`}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>
    </button>
  );
}