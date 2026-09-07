"use client";

import { useEffect, useState } from "react";

export function useSessionDuration() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();

    const update = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);

      setSeconds(elapsed);
    };

    update();

    let timeoutId: number;

    const schedule = () => {
      const now = Date.now();
      const nextSecond = 1000 - (now % 1000);

      timeoutId = window.setTimeout(() => {
        update();
        schedule();
      }, nextSecond);
    };

    schedule();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return seconds;
}

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }

  return [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}
