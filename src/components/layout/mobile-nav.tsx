"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import { Download } from "lucide-react";
import { usePathname } from "next/navigation";

import { ScrollLink } from "@/components/shared/scroll-link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button/button";
import { Logo } from "@/components/ui/logo/logo";
import { useActiveSection } from "@/hooks/use-active-section";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      mediaQuery.addEventListener("change", callback);

      return () => {
        mediaQuery.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function MobileNavbar() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [linksReady, setLinksReady] = useState(false);

  /*
   * Boot:
   * chip → full → stagger
   */
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const t1 = window.setTimeout(() => {
      setExpanded(true);
    }, 420);

    const t2 = window.setTimeout(() => {
      setLinksReady(true);
    }, 900);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [prefersReducedMotion]);

  /*
   * Navbar scroll state
   */
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const nextScrolled = window.scrollY > 24;

      setScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Active sections
   *
   * useActiveSection menjadi satu sumber kebenaran
   * untuk active state + programmatic navigation.
   */
  const sectionIds = useMemo(
    () => siteConfig.navigation.map((item) => item.id),
    [],
  );

  const { activeId: activeSectionId, navigateToSection } =
    useActiveSection(sectionIds);

  /*
   * Pada homepage:
   * active state berasal dari scroll observer.
   *
   * Pada route lain:
   * active state mengikuti pathname.
   */
  const scrollActiveId =
    pathname === "/"
      ? activeSectionId
      : pathname.startsWith("/writing")
        ? "writing"
        : pathname.startsWith("/projects")
          ? "projects"
          : pathname.startsWith("/contact")
            ? "contact"
            : pathname.startsWith("/about")
              ? "about"
              : pathname.startsWith("/experience")
                ? "experience"
                : "";

  const activeId = scrollActiveId;
  const isHome = pathname === "/";

  /*
   * Horizontal mobile navigation
   */
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animationTokenRef = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const maxScrollLeft = Math.max(
      0,
      scroller.scrollWidth - scroller.clientWidth,
    );

    setCanScrollLeft(scroller.scrollLeft > 4);

    setCanScrollRight(scroller.scrollLeft < maxScrollLeft - 4);
  };

  /*
   * Center active navigation item inside the horizontal scroller.
   */
  const centerOnId = (id: string) => {
    const scroller = scrollerRef.current;

    if (!scroller || !id) return;

    const activeItem = scroller.querySelector<HTMLElement>(
      `[data-nav-id="${id}"]`,
    );

    if (!activeItem) return;

    const maxScrollLeft = Math.max(
      0,
      scroller.scrollWidth - scroller.clientWidth,
    );

    if (maxScrollLeft <= 0) {
      updateScrollState();
      return;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    const itemCenter = itemRect.left + itemRect.width / 2;

    const viewportCenter = scrollerRect.left + scrollerRect.width / 2;

    const delta = itemCenter - viewportCenter;

    const target = Math.max(
      0,
      Math.min(scroller.scrollLeft + delta, maxScrollLeft),
    );

    const start = scroller.scrollLeft;
    const distance = target - start;

    if (Math.abs(distance) < 1) {
      updateScrollState();
      return;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      scroller.scrollLeft = target;
      updateScrollState();
      return;
    }

    const token = ++animationTokenRef.current;

    const duration = Math.min(
      620,
      Math.max(360, 280 + Math.abs(distance) * 0.75),
    );

    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      if (token !== animationTokenRef.current) {
        return;
      }

      const progress = Math.min((now - startTime) / duration, 1);

      scroller.scrollLeft = start + distance * easeOutCubic(progress);

      updateScrollState();

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        updateScrollState();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  /*
   * Horizontal scroller listeners
   */
  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    updateScrollState();

    scroller.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);

      window.removeEventListener("resize", updateScrollState);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /*
   * Keep the active navigation item centered.
   *
   * Tidak menggunakan pinnedId.
   * Active state sepenuhnya berasal dari useActiveSection.
   */
  useEffect(() => {
    if (!scrollActiveId || !linksReady) {
      return;
    }

    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        centerOnId(scrollActiveId);
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };

    // centerOnId sengaja tidak dimasukkan dependency
    // karena fungsi tersebut membaca ref DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollActiveId, linksReady]);

  /*
   * Re-center after the navigation layout changes.
   */
  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || typeof ResizeObserver === "undefined") {
      return;
    }

    const ro = new ResizeObserver(() => {
      updateScrollState();

      const id = scrollActiveId;

      if (!id || !linksReady) {
        return;
      }

      requestAnimationFrame(() => {
        centerOnId(id);
      });
    });

    ro.observe(scroller);

    return () => {
      ro.disconnect();
    };

    // centerOnId dan updateScrollState membaca ref/state DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollActiveId, linksReady]);

  const navCount = siteConfig.navigation.length;

  return (
    <div className="nav-shell relative min-w-0 w-full flex-1">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full blur-2xl transition-opacity duration-700 ease-out",
          "bg-[color-mix(in_oklab,var(--primary)_7%,transparent)]",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "nav-shell-inner relative flex h-12 items-center rounded-full border p-(--space-micro)",
          "border-border bg-chrome/80 backdrop-blur-xl",
          "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          (expanded || prefersReducedMotion) && "is-expanded",
          scrolled
            ? [
                "border-foreground/15 bg-chrome/90",
                "shadow-[0_10px_32px_-16px_color-mix(in_oklab,var(--primary)_30%,transparent)]",
              ]
            : "shadow-sm",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-px left-1/2 h-px -translate-x-1/2 rounded-full bg-primary blur-[1px] transition-all duration-700 ease-out",
            scrolled ? "w-20 opacity-50" : "w-8 opacity-15",
          )}
        />

        {/* Logo */}
        <div className="flex h-full shrink-0 items-center pr-2 pl-2.5">
          <Logo className="h-5 w-auto" />
        </div>

        {/* Nav + actions */}
        <div
          className={cn(
            "nav-cluster flex min-w-0 flex-1 items-center",
            (linksReady || prefersReducedMotion) && "is-visible",
          )}
        >
          <div
            aria-hidden="true"
            className="nav-boot-item border-foreground/10 mx-0.5 h-4 shrink-0 border-l"
            style={
              {
                "--nav-i": 0,
              } as CSSProperties
            }
          />

          <div className="relative min-w-0 flex-1">
            {/* Left fade */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-chrome to-transparent transition-opacity duration-200",
                canScrollLeft ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Right fade */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-chrome to-transparent transition-opacity duration-200",
                canScrollRight ? "opacity-100" : "opacity-0",
              )}
            />

            <div
              ref={scrollerRef}
              className="no-scrollbar flex min-w-0 items-center gap-(--space-micro) overflow-x-auto px-(--space-micro)"
            >
              {siteConfig.navigation.map((item, index) => {
                const isActive = activeId === item.id;

                const href = isHome ? item.href : `/${item.href}`;

                const path = item.href.replace(/^#/, "/");

                return (
                  <div
                    key={item.id}
                    data-nav-id={item.id}
                    className="nav-boot-item shrink-0"
                    style={
                      {
                        "--nav-i": index + 1,
                      } as CSSProperties
                    }
                  >
                    <ScrollLink
                      href={href}
                      aria-current={
                        isActive ? (isHome ? "location" : "page") : undefined
                      }
                      onNavigate={() => navigateToSection(item.id)}
                      className={cn(
                        "group relative flex h-8 items-center rounded-full px-2.5",
                        "font-mono text-[11px] tracking-tight whitespace-nowrap",
                        "transition-[background-color,color] duration-200",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-chrome focus-visible:outline-none",
                        isActive
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-1.5">
                        {/* Active indicator */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "bg-success h-1.5 w-1.5 shrink-0 rounded-full transition-[opacity,box-shadow] duration-200",
                            isActive
                              ? "opacity-100 shadow-[0_0_7px_color-mix(in_oklab,var(--success)_70%,transparent)]"
                              : "opacity-0",
                          )}
                        />

                        {/* GET */}
                        <span
                          className={cn(
                            "font-semibold transition-colors duration-200",
                            isActive
                              ? "text-accent-text"
                              : "text-muted-foreground/70 group-hover:text-foreground",
                          )}
                        >
                          GET
                        </span>

                        {/* Path */}
                        <span
                          className={cn(
                            "transition-colors duration-200",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        >
                          {path}
                        </span>
                      </span>

                      {/* Active underline */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "bg-primary absolute inset-x-2 bottom-0 h-0.5 origin-center rounded-full transition-transform duration-200",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </ScrollLink>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="nav-boot-item border-foreground/10 mx-0.5 h-4 shrink-0 border-l"
            style={
              {
                "--nav-i": navCount + 1,
              } as CSSProperties
            }
          />

          {/* Actions */}
          <div
            className="nav-boot-item flex h-full shrink-0 items-center gap-1.5 pl-(--space-xs)"
            style={
              {
                "--nav-i": navCount + 2,
              } as CSSProperties
            }
          >
            <ThemeToggle />

            <Button
              render={<a href={siteConfig.assets.resume} download />}
              nativeButton={false}
              variant="default"
              size="sm"
              aria-label="Download resume"
              title="Download resume"
              className={[
                "ml-(--space-micro) h-8 rounded-full px-3",
                "font-mono text-[10px] font-semibold tracking-[0.08em] uppercase",
                "shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent)]",
                "transition-[background-color,box-shadow,transform] duration-200",
                "hover:-translate-y-px",
                "hover:shadow-[0_5px_16px_-7px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
                "active:translate-y-0",
              ].join(" ")}
            >
              <Download aria-hidden="true" size={13} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
