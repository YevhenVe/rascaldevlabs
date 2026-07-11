"use client";

import { toggleTheme, type Theme } from "@/lib/theme";

/**
 * Minimal hook — real state lives on <html data-theme> + localStorage.
 * Toggle UI is driven by CSS, so no React theme state (no jump on nav).
 */
export function useTheme() {
  return {
    toggleTheme,
  } as const satisfies {
    toggleTheme: () => void;
  };
}

export type { Theme };
