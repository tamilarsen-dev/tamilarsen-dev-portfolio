"use client";

import { Moon, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button/button";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useThemeTransition } from "@/hooks/use-theme-transition";

export function ThemeToggle() {
  const hasMounted = useHasMounted();
  const { toggleTheme } = useThemeTransition();

  if (!hasMounted) {
    return (
      <Button variant="ghost" size="icon-lg" tabIndex={-1} aria-hidden="true" />
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={toggleTheme}
      className="
        group/theme
        relative
        transition-[background-color,transform]
        duration-200
        hover:bg-foreground/5
        active:scale-[0.94]
        motion-reduce:transition-none
      "
    >
      <SunMedium
        aria-hidden="true"
        className={cn(
          "absolute h-4 w-4",
          "transition-[transform,opacity] duration-300",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none",

          "scale-100 rotate-0 opacity-100",
          "group-hover/theme:rotate-12",

          "dark:scale-75 dark:-rotate-90 dark:opacity-0",
        )}
      />

      <Moon
        aria-hidden="true"
        className={cn(
          "absolute h-4 w-4",
          "transition-[transform,opacity] duration-300",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none",

          "scale-75 rotate-90 opacity-0",
          "dark:scale-100 dark:rotate-0 dark:opacity-100",

          "dark:group-hover/theme:-rotate-12",
        )}
      />
    </Button>
  );
}
