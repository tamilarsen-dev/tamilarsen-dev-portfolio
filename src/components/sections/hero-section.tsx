import type { CSSProperties } from "react";

import { ArrowRight, Mail } from "lucide-react";

import { homeData } from "@/data/home";
import { siteConfig } from "@/data/site";

import { ScrollLink } from "@/components/shared/scroll-link";

import { Button } from "@/components/ui/button/button";

import { SystemTicker } from "@/components/ui/system-ticker/system-ticker";

const HERO_NAME_START = 900;
const HERO_NAME_STAGGER = 32;
const HERO_NAME_DURATION = 600;

const HERO_ROLE_GAP = 80;
const HERO_DESCRIPTION_GAP = 150;
const HERO_TICKER_GAP = 200;

export function HomeSection() {
  const name = siteConfig.author.name;
  const nameLength = name.length;

  const heroNameEnd =
    HERO_NAME_START +
    Math.max(nameLength - 1, 0) * HERO_NAME_STAGGER +
    HERO_NAME_DURATION;

  const heroRoleDelay = heroNameEnd + HERO_ROLE_GAP;
  const heroDescriptionDelay = heroRoleDelay + HERO_DESCRIPTION_GAP;
  const heroTickerDelay = heroDescriptionDelay + HERO_TICKER_GAP;

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-5.5rem)] flex-col overflow-hidden"
    >
      <div className="flex flex-1 flex-col justify-center px-0 pb-4">
        <div className="container-site pt-4 text-center sm:pt-6">
          <div className="reading-content">
            {/* 1. Greeting — soft typewriter */}
            <span className="text-muted-foreground inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] uppercase sm:text-sm">
              <span className="hero-greeting-text">{homeData.greeting}</span>

              <span
                aria-hidden="true"
                className="bg-primary hero-cursor h-[1.1em] w-px"
              />
            </span>

            {/* 2. Name — per letter */}
            <h1
              className="text-foreground mt-(--space-sm) text-[clamp(2.75rem,9.5vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.045em]"
              aria-label={name}
            >
              {name.split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="hero-letter inline-block"
                  style={
                    {
                      "--letter-index": index,
                    } as CSSProperties
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* 3. Role */}
            <div
              className="hero-animate border-primary/30 bg-primary/5 mt-(--space-md) inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={
                {
                  "--hero-delay": `${heroRoleDelay}ms`,
                } as CSSProperties
              }
            >
              <span
                aria-hidden="true"
                className="bg-success status-pulse-dot h-1.5 w-1.5 shrink-0 rounded-full"
              />

              <span className="text-accent-text font-mono text-[11px] font-semibold tracking-widest uppercase">
                {siteConfig.author.jobTitle}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Description + CTA */}
        <div className="container-site">
          <div
            className="hero-animate mx-auto mt-(--space-lg) max-w-2xl text-center"
            style={
              {
                "--hero-delay": `${heroDescriptionDelay}ms`,
              } as CSSProperties
            }
          >
            <p className="text-muted-foreground text-base leading-7 sm:text-lg sm:leading-8">
              {homeData.description}
            </p>

            <div className="mt-(--space-lg) flex flex-wrap items-center justify-center gap-3">
              <Button
                size="xl"
                nativeButton={false}
                render={<ScrollLink href={homeData.actions.projects.href} />}
                className="group transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {homeData.actions.projects.label}

                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>

              <Button
                size="xl"
                nativeButton={false}
                variant="outline"
                render={<ScrollLink href={homeData.actions.contact.href} />}
                className="group transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/50 active:scale-[0.98]"
              >
                {homeData.actions.contact.label}

                <Mail
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg]"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Ticker */}
      <div
        className="hero-animate relative z-10 mt-auto shrink-0 pb-4 sm:pb-6"
        style={
          {
            "--hero-delay": `${heroTickerDelay}ms`,
          } as CSSProperties
        }
      >
        <SystemTicker />
      </div>
    </section>
  );
}
