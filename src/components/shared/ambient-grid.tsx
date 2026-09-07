"use client";
import { useMemo } from "react";

const COLS = 32;
const ROWS = 20;
const SPACING = 40;

type Dot = {
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  strength: number; // 0–1, relative only
};

function seeded(n: number) {
  const x = (n * 9301 + 49297) % 233280;
  return x / 233280;
}

export function AmbientGrid() {
  const dots = useMemo<Dot[]>(() => {
    const list: Dot[] = [];
    let seed = 1;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        seed += 1;

        if (seeded(seed) > 0.86) {
          const variation = seeded(seed * 17);

          list.push({
            x: col * SPACING + SPACING / 2,
            y: row * SPACING + SPACING / 2,
            delay: seeded(seed * 7.3) * 5.5,
            duration: 3.8 + seeded(seed * 3.1) * 2.2,
            size: 1.05 + variation * 0.75,
            strength: 0.55 + variation * 0.45, // relative weight
          });
        }
      }
    }

    return list;
  }, []);

  return (
    <svg
      viewBox={`0 0 ${COLS * SPACING} ${ROWS * SPACING}`}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
      preserveAspectRatio="xMidYMid slice"
    >
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          className="animate-ambient-twinkle fill-primary"
          style={
            {
              ["--dot-strength" as string]: dot.strength,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
