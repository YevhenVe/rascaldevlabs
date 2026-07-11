export type Theme = "light" | "dark";

export const THEME_KEY = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

function writeThemeCookie(next: Theme): void {
  document.cookie = `${THEME_KEY}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";

  const attr = document.documentElement.getAttribute("data-theme");
  if (isTheme(attr)) return attr;

  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (isTheme(saved)) return saved;
  } catch {
    // ignore
  }

  return "light";
}

export function setTheme(next: Theme): void {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // ignore
  }
  writeThemeCookie(next);
}

export function toggleTheme(): void {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/**
 * One-time client sync: localStorage → cookie + data-theme
 * (no <script> tag — avoids React 19 / Next 16 console error).
 */
export function syncThemeFromStorage(): void {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (!isTheme(saved)) return;
    document.documentElement.setAttribute("data-theme", saved);
    writeThemeCookie(saved);
  } catch {
    // ignore
  }
}
