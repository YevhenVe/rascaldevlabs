"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.scss";

const STORAGE_KEY = "rdl-cookie-consent";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getConsentSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  // Assume accepted on server so banner doesn't SSR-flash open
  return true;
}

function notify() {
  listeners.forEach((l) => l());
}

export default function CookieConsent() {
  const accepted = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerSnapshot,
  );

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    notify();
  }, []);

  if (accepted) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p id="cookie-consent-title" className={styles.title}>
            Cookies &amp; local data
          </p>
          <p id="cookie-consent-desc" className={styles.text}>
            This site uses cookies and browser storage for theme preference and
            basic functionality (for example, remembering that you accepted this
            notice). By continuing, you agree to this limited use of local data.
            No analytics or tracking. Details in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <button type="button" className={styles.button} onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
