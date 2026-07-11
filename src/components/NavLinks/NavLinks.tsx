"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site-links";
import styles from "./NavLinks.module.scss";

interface NavLinksProps {
  id?: string;
  isOpen?: boolean;
  onNavigate?: () => void;
}

export default function NavLinks({
  id = "main-nav",
  isOpen = false,
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav
      id={id}
      className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}
      aria-label="Main"
    >
      <ul className={styles.links}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${styles.link} ${pathname === href ? styles.linkActive : ""}`}
              onClick={onNavigate}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
