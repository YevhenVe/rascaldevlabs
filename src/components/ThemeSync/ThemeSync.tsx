"use client";

import { useEffect } from "react";
import { syncThemeFromStorage } from "@/lib/theme";

/** Migrates/syncs theme from localStorage without injecting a <script> tag. */
export default function ThemeSync() {
  useEffect(() => {
    syncThemeFromStorage();
  }, []);

  return null;
}
