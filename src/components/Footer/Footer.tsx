import Link from "next/link";
import BrandLogo from "@/components/BrandLogo/BrandLogo";
import { extraLinks, navLinks } from "@/lib/site-links";
import styles from "./Footer.module.scss";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <BrandLogo size="md" />
          <p className={styles.tagline}>
            Solo full-stack studio UI/UX to production.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <div className={styles.col}>
            <p className={styles.colTitle}>Explore</p>
            <ul className={styles.list}>
              <li>
                <Link href="/">Home</Link>
              </li>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Site</p>
            <ul className={styles.list}>
              {extraLinks
                .filter((l) => l.href !== "/")
                .map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              <li>
                <Link href="/contact">Start a project</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copy}>
            © {year > 2026 ? `2026 – ${year}` : "2026"} Rascal Dev Labs LLC. All
            rights reserved.
          </p>
          <p className={styles.meta}>Built with care · One developer studio</p>
        </div>
      </div>
    </footer>
  );
}
