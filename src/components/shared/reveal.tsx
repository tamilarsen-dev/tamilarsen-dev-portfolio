"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  threshold?: number;
};

function getReducedMotionPreference() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  threshold = 0.12,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(getReducedMotionPreference);

  useEffect(() => {
    const element = ref.current;

    if (!element || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(element);
          }

          return;
        }

        if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold, visible]);

  const revealStyle = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={revealStyle}
      {...props}
    >
      {children}
    </div>
  );
}
