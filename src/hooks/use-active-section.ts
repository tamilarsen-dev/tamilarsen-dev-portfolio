"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

const ACTIVE_LINE_RATIO = 0.35;
const BOTTOM_OFFSET = 100;

/**
 * Fallback only.
 *
 * scrollend is the preferred way to release the navigation lock.
 * This timeout exists for browsers/environments where scrollend
 * does not fire.
 */
const NAVIGATION_FALLBACK_DELAY = 300;

type UseActiveSectionResult = {
  activeId: string;
  navigateToSection: (id: string) => void;
};

export function useActiveSection(
  sectionIds: readonly string[],
): UseActiveSectionResult {
  const pathname = usePathname();

  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  /**
   * When navigation is triggered from the navbar,
   * temporarily lock the active indicator to the
   * requested destination.
   *
   * This belongs here instead of inside DesktopNavbar
   * or MobileNavbar so both navigations share the
   * same behavior.
   */
  const navigationTargetRef = useRef<string | null>(null);

  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Keep the URL hash synchronized with the section
   * that is currently active during manual scrolling.
   *
   * IMPORTANT:
   * Hash synchronization belongs exclusively to the
   * homepage.
   *
   * This prevents a pending animation frame from the
   * homepage from turning:
   *
   * /#writing
   *   ↓
   * /writing
   *
   * into:
   *
   * /writing#writing
   *
   * or:
   *
   * /writing#home
   *
   * We also explicitly write "/#id" instead of "#id"
   * so the hash can never accidentally attach itself
   * to a different pathname.
   *
   * replaceState is intentional:
   * scrolling through sections should not create
   * a new browser-history entry for every section.
   */
  const syncHash = useCallback((id: string) => {
    if (!id) return;

    if (window.location.pathname !== "/") {
      return;
    }

    // Home adalah URL root, tidak perlu #home.
    if (id === "home") {
      if (window.location.hash === "#home") {
        window.history.replaceState(null, "", "/");
      }

      return;
    }

    const nextUrl = `/#${id}`;
    const currentUrl = `${window.location.pathname}${window.location.hash}`;

    if (currentUrl === nextUrl) {
      return;
    }

    window.history.replaceState(null, "", nextUrl);
  }, []);

  const navigateToSection = useCallback(
    (id: string) => {
      /**
       * Section tracking only applies to the homepage.
       *
       * Dedicated routes are handled by pathname logic
       * in the navbar.
       */
      if (pathname !== "/") return;

      if (!sectionIds.includes(id)) return;

      /**
       * Lock the requested destination immediately.
       *
       * This prevents the active indicator from following
       * every section while smooth scrolling.
       */
      navigationTargetRef.current = id;
      setActiveId(id);

      /**
       * Do NOT release the lock here.
       *
       * The scroll has only just started.
       * scrollend / fallback logic below owns the release.
       */
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    },
    [pathname, sectionIds],
  );

  useEffect(() => {
    /**
     * Active-section tracking only applies to the homepage.
     */
    if (pathname !== "/") {
      navigationTargetRef.current = null;

      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }

      return;
    }

    if (!sectionIds.length) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(
        (element): element is HTMLElement => element instanceof HTMLElement,
      );

    if (!elements.length) {
      return;
    }

    let frame = 0;

    /**
     * Recalculate the actual section under
     * the active line.
     */
    const updateActiveSection = () => {
      frame = 0;

      /**
       * A navbar-triggered navigation owns the active
       * indicator until the programmatic scroll settles.
       *
       * Do not calculate intermediate sections.
       */
      if (navigationTargetRef.current) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const activeLine = viewportHeight * ACTIVE_LINE_RATIO;

      /**
       * At the very bottom, Contact should always win.
       */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_OFFSET;

      if (atBottom) {
        const lastId = elements[elements.length - 1]?.id;

        if (lastId) {
          setActiveId((current) => {
            if (current === lastId) {
              return current;
            }

            return lastId;
          });

          syncHash(lastId);
        }

        return;
      }

      let closestId = elements[0]?.id ?? "";
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        /**
         * Completely above viewport.
         */
        if (rect.bottom <= 0) {
          continue;
        }

        /**
         * Completely below viewport.
         */
        if (rect.top >= viewportHeight) {
          continue;
        }

        /**
         * Compare section center with active line.
         */
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - activeLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = element.id;
        }
      }

      if (closestId) {
        setActiveId((current) => {
          if (current === closestId) {
            return current;
          }

          return closestId;
        });

        syncHash(closestId);
      }
    };

    /**
     * Release the navigation lock.
     */
    const releaseNavigationLock = () => {
      if (!navigationTargetRef.current) {
        return;
      }

      navigationTargetRef.current = null;

      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }

      /**
       * Recalculate immediately after the
       * programmatic scroll finishes.
       */
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      frame = window.requestAnimationFrame(updateActiveSection);
    };

    /**
     * Fallback for environments where scrollend
     * is unavailable or doesn't fire.
     */
    const scheduleNavigationRelease = () => {
      if (!navigationTargetRef.current) {
        return;
      }

      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
      }

      settleTimerRef.current = setTimeout(
        releaseNavigationLock,
        NAVIGATION_FALLBACK_DELAY,
      );
    };

    const onScroll = () => {
      /**
       * During programmatic navigation:
       *
       * - keep destination active
       * - do not calculate intermediate sections
       * - arm the fallback
       */
      if (navigationTargetRef.current) {
        scheduleNavigationRelease();
        return;
      }

      if (frame) return;

      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const onResize = () => {
      /**
       * Do not let resize events interfere with
       * a programmatic navigation.
       */
      if (navigationTargetRef.current) {
        return;
      }

      if (frame) return;

      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const onScrollEnd = () => {
      /**
       * Modern browsers:
       * this is the preferred release mechanism.
       */
      releaseNavigationLock();
    };

    /**
     * Initial calculation.
     */
    updateActiveSection();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onResize);

    /**
     * Modern browsers support scrollend.
     * The fallback timeout remains for compatibility.
     */
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }

      navigationTargetRef.current = null;

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [pathname, sectionIds, syncHash]);

  return {
    activeId,
    navigateToSection,
  };
}
