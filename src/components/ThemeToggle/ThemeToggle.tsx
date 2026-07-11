import styles from "./ThemeToggle.module.scss";
import { MoonIcon, SunIcon } from "@/components/Icons/icons";
import { toggleTheme } from "@/lib/theme";

/** Visual state comes only from html[data-theme] via CSS — no React theme props. */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <span className={styles.track}>
        <span className={`${styles.iconBase} ${styles.iconSunOutside}`}>
          <SunIcon />
        </span>

        <span className={`${styles.iconBase} ${styles.iconMoonOutside}`}>
          <MoonIcon />
        </span>

        <span className={styles.thumb}>
          <span className={styles.thumbSun}>
            <SunIcon />
          </span>
          <span className={styles.thumbMoon}>
            <MoonIcon />
          </span>
        </span>
      </span>
    </button>
  );
}
