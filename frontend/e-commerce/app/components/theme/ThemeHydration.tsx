"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeHydration() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDarkMode ? "dark" : "light");
    }
  }, [theme, setTheme]);

  return null;
}