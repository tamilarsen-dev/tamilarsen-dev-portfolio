"use client";

import { GithubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { ArrowUp, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

import { ScrollLink } from "@/components/shared/scroll-link";
import { useLiveClock } from "@/hooks/use-live-clock";
import {
  formatDuration,
  useSessionDuration,
} from "@/hooks/use-session-duration";
import { Button } from "@/components/ui/button/button";
import { Logo } from "@/components/ui/logo/logo";
import { siteConfig } from "@/data/site";

import pkg from "../../../package.json";

export function Footer() {
  const pathname = usePathname();

  const time = useLiveClock("Asia/Jakarta");
  const sessionSeconds = useSessionDuration();
  const currentYear = new Date().getFullYear();

  const isHome = pathname === "/";

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <footer className="border-t border-foreground/10 bg-chrome">
      {/* ------------------------------------------------------------------ */}
      {/* System status                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-b border-foreground/10">
        <div className="container-site">
          <div className="flex min-h-9 flex-wrap items-center gap-x-3 gap-y-1 py-(--space-xs) font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground sm:gap-x-5">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="status-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success"
              />
              <span>Session active</span>
            </span>

            <span aria-hidden="true" className="text-foreground/20">
              /
            </span>

            <span suppressHydrationWarning>{time ?? "--:--:--"} GMT+7</span>

            <span aria-hidden="true" className="text-foreground/20">
              /
            </span>

            <span>Session {formatDuration(sessionSeconds)}</span>

            <span
              aria-hidden="true"
              className="hidden text-foreground/20 sm:inline"
            >
              /
            </span>

            <span className="hidden sm:inline">Build v{pkg.version}</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main footer                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="container-site py-(--space-xl)">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-16">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Logo className="h-6 w-auto" />

              <span className="text-sm font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </div>

            <p className="mt-(--space-sm) max-w-md text-sm leading-6 text-muted-foreground">
              Computer Science graduate focused on full-stack web development,
              with a strong interest in backend engineering and software
              systems.
            </p>

            <div className="mt-(--space-lg)">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                [Connect]
              </span>

              <div className="mt-(--space-sm) flex items-center gap-2.5">
                <a
                  href={siteConfig.social.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={siteConfig.social.github.label}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 text-muted-foreground transition-[border-color,color,transform] duration-150 hover:border-primary/60 hover:text-foreground active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GithubIcon className="h-4 w-4 transition-transform duration-150 group-hover:scale-105" />
                </a>

                <a
                  href={siteConfig.social.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={siteConfig.social.linkedin.label}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 text-muted-foreground transition-[border-color,color,transform] duration-150 hover:border-primary/60 hover:text-foreground active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <LinkedinIcon className="h-4 w-4 transition-transform duration-150 group-hover:scale-105" />
                </a>

                <a
                  href={siteConfig.social.email.href}
                  aria-label={siteConfig.social.email.label}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 text-muted-foreground transition-[border-color,color,transform] duration-150 hover:border-primary/60 hover:text-foreground active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="h-4 w-4 transition-transform duration-150 group-hover:scale-105" />
                </a>
              </div>
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer navigation" className="md:min-w-32">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-text">
              [Sitemap]
            </span>

            <ul className="mt-(--space-sm) grid grid-cols-2 gap-x-10 gap-y-1.5 sm:grid-cols-1">
              {siteConfig.navigation.map((item) => {
                const href = isHome
                  ? item.href
                  : (item.route ?? `/${item.href}`);

                return (
                  <li key={item.id}>
                    <ScrollLink
                      href={href}
                      className="inline-flex py-0.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </ScrollLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Footer bottom                                                    */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative mt-(--space-xl) border-t border-foreground/10 pt-(--space-md)">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          {/* Back to top */}
          <Button
            variant="outline"
            size="icon"
            aria-label="Back to top"
            title="Back to top"
            onClick={handleBackToTop}
            className="
              group
              absolute
              right-0
              top-(--space-md)
              h-9
              w-9
            "
          >
            <ArrowUp
              aria-hidden="true"
              size={16}
              className="transition-transform duration-150 group-hover:-translate-y-0.5"
            />
          </Button>
        </div>
      </div>
    </footer>
  );
}
