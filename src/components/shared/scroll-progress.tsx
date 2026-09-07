"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5"
    >
      <div
        className="h-full w-full origin-left bg-primary will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}
