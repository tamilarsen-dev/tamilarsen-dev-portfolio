"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const currentTheme = resolvedTheme === "light" ? "light" : "dark";

      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      const root = document.documentElement;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /*
       * Native fallback:
       * - unsupported browser
       * - reduced motion preference
       */
      if (!document.startViewTransition || reducedMotion) {
        setTheme(nextTheme);
        return;
      }

      const x = event.clientX;
      const y = event.clientY;

      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      root.style.setProperty("--x", `${x}px`);

      root.style.setProperty("--y", `${y}px`);

      root.style.setProperty("--r", `${radius}px`);

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });

      transition.finished.finally(() => {
        root.style.removeProperty("--x");
        root.style.removeProperty("--y");
        root.style.removeProperty("--r");
      });
    },
    [resolvedTheme, setTheme],
  );

  return {
    resolvedTheme,
    toggleTheme,
  };
}
