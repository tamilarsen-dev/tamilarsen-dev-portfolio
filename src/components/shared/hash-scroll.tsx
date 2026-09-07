"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

function scrollToHash(hash: string) {
  if (!hash) return;

  const id = decodeURIComponent(hash.startsWith("#") ? hash.slice(1) : hash);

  const element = document.getElementById(id);

  if (!element) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Home is the Hero entry point.
  // Jump there immediately so the Hero animation can
  // start cleanly from frame 0 instead of running while
  // the browser is still smooth-scrolling.
  const isHome = id === "home";

  element.scrollIntoView({
    behavior: isHome || reduce ? "auto" : "smooth",
    block: "start",
  });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    let retryTimer: number | undefined;

    const run = () => {
      const hash = window.location.hash;

      if (!hash) return;

      requestAnimationFrame(() => {
        const id = decodeURIComponent(hash.slice(1));

        if (document.getElementById(id)) {
          scrollToHash(hash);
          return;
        }

        /**
         * Give the homepage one more chance in case the section
         * has not mounted yet.
         */
        retryTimer = window.setTimeout(() => {
          scrollToHash(hash);
        }, 50);
      });
    };

    /**
     * Run after the route/layout has had a chance to settle.
     */
    const initialTimer = window.setTimeout(run, 0);

    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.clearTimeout(initialTimer);

      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }

      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}
