"use client";

import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo/BrandLogo";
import HamburgerMenu from "@/components/HamburgerMenu/HamburgerMenu";
import NavLinks from "@/components/NavLinks/NavLinks";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <BrandLogo size="md" priority onClick={closeMenu} />

        <NavLinks id="main-nav" isOpen={menuOpen} onNavigate={closeMenu} />

        <div className={styles.actions}>
          <ThemeToggle />
          <HamburgerMenu
            isOpen={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
            controlsId="main-nav"
          />
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
