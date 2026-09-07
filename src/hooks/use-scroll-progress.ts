"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const calculate = () => {
      frame = 0;

      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const nextProgress =
        scrollableHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / scrollableHeight))
          : 0;

      setProgress(nextProgress);
    };

    const onScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(calculate);
    };

    const onResize = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(calculate);
    };

    calculate();

    window.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", onResize);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);

      window.removeEventListener("resize", onResize);
    };
  }, []);

  return progress;
}
