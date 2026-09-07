"use client";

import { useEffect, useState } from "react";

export function useLiveClock(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;

    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const update = () => {
      setTime(formatter.format(new Date()));

      /*
       * Align the next update to the next whole second instead
       * of relying on a fixed interval that can drift.
       */
      const now = Date.now();
      const delay = 1000 - (now % 1000);

      timeoutId = window.setTimeout(update, delay);
    };

    update();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeZone]);

  return time;
}
