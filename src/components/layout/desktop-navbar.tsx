"use client";

import { Download } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { ScrollLink } from "@/components/shared/scroll-link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button/button";
import { Logo } from "@/components/ui/logo/logo";
import { useActiveSection } from "@/hooks/use-active-section";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function DesktopNavbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [linksReady, setLinksReady] = useState(false);

  const sectionIds = useMemo(
    () => siteConfig.navigation.map((item) => item.id),
    [],
  );

  const { activeId: activeSectionId, navigateToSection } =
    useActiveSection(sectionIds);

  let activeId = "";

  if (pathname === "/") {
    activeId = activeSectionId;
  } else if (pathname.startsWith("/writing")) {
    activeId = "writing";
  } else if (pathname.startsWith("/projects")) {
    activeId = "projects";
  }

  const isHome = pathname === "/";

  /*
   * Boot: chip → full bar → links
   */
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      const frame = window.requestAnimationFrame(() => {
        setExpanded(true);
        setLinksReady(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
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
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const next = window.scrollY > 24;

      setScrolled((current) => (current === next ? current : next));

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="nav-shell relative w-full">
      {/* Ambient glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-x-8 -inset-y-3 rounded-full blur-2xl transition-opacity duration-700 ease-out",
          "bg-[color-mix(in_oklab,var(--primary)_8%,transparent)]",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "nav-shell-inner relative flex h-12 items-center rounded-full border border-border bg-chrome/80 p-1 backdrop-blur-xl",
          "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          expanded && "is-expanded",
          scrolled
            ? [
                "border-foreground/15 bg-chrome/90",
                "shadow-[0_10px_36px_-18px_color-mix(in_oklab,var(--primary)_32%,transparent)]",
              ]
            : "shadow-sm",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-px left-1/2 h-px -translate-x-1/2 rounded-full bg-primary blur-[1px] transition-all duration-700 ease-out",
            scrolled ? "w-24 opacity-50" : "w-10 opacity-15",
          )}
        />

        <div className="flex h-full shrink-0 items-center px-3">
          <Logo className="h-6 w-auto" />
        </div>

        <div
          className={cn(
            "nav-cluster flex min-w-0 flex-1 items-center",
            linksReady && "is-visible",
          )}
        >
          <div
            aria-hidden
            className="nav-boot-item border-foreground/10 mx-1 h-6 shrink-0 border-l"
            style={{ "--nav-i": 0 } as CSSProperties}
          />

          <nav
            aria-label="Primary navigation"
            className="flex min-w-0 flex-1 items-center justify-center"
          >
            <div className="flex items-center gap-0.5">
              {siteConfig.navigation.map((item, index) => {
                const isActive = activeId === item.id;
                const path = item.href.replace(/^#/, "/");

                const href = isHome ? item.href : `/${item.href}`;
                let ariaCurrent: "location" | "page" | undefined;

                if (isActive) {
                  ariaCurrent = isHome ? "location" : "page";
                }
                return (
                  <ScrollLink
                    key={item.id}
                    href={href}
                    aria-current={ariaCurrent}
                    onNavigate={() => navigateToSection(item.id)}
                    style={
                      {
                        "--nav-i": index + 1,
                      } as CSSProperties
                    }
                    className={cn(
                      "nav-boot-item group relative flex h-9 items-center rounded-full px-3 font-mono text-[12px] tracking-tight",
                      "transition-[background-color,color] duration-200",
                      "focus-visible:ring-ring focus-visible:ring-offset-chrome focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-foreground/5",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className={cn(
                          "bg-success h-1.5 w-1.5 shrink-0 rounded-full transition-[opacity,box-shadow] duration-300",
                          isActive
                            ? "opacity-100 shadow-[0_0_8px_color-mix(in_oklab,var(--success)_80%,transparent)]"
                            : "opacity-0",
                        )}
                      />

                      <span
                        className={cn(
                          "font-semibold transition-colors duration-200",
                          isActive
                            ? "text-accent-text"
                            : "text-muted-foreground/70 group-hover:text-accent-text/80",
                        )}
                      >
                        GET
                      </span>

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

                    <span
                      aria-hidden
                      className={cn(
                        "bg-primary absolute inset-x-3 bottom-1 h-0.5 origin-center rounded-full transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </ScrollLink>
                );
              })}
            </div>
          </nav>

          <div
            aria-hidden
            className="nav-boot-item border-foreground/10 mx-1 h-6 shrink-0 border-l"
            style={
              {
                "--nav-i": siteConfig.navigation.length + 1,
              } as CSSProperties
            }
          />

          <div
            className="nav-boot-item flex h-full shrink-0 items-center gap-2 pl-2"
            style={
              {
                "--nav-i": siteConfig.navigation.length + 2,
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
                "ml-1 h-9 rounded-full px-4",
                "font-mono text-[11px] font-semibold tracking-[0.08em] uppercase",
                "shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent)]",
                "transition-[background-color,box-shadow,transform] duration-300",
                "hover:-translate-y-px",
                "hover:shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)]",
                "active:translate-y-0",
              ].join(" ")}
            >
              <span>Resume</span>
              <Download aria-hidden size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
