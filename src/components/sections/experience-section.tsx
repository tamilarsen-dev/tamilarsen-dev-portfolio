"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Briefcase, Code2, GraduationCap, type LucideIcon } from "lucide-react";

import { experiences, experienceTypeLabel } from "@/data/experience";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, LucideIcon> = {
  "full-time": Briefcase,
  internship: Code2,
  contract: Code2,
  education: GraduationCap,
};

type RailGeometry = {
  start: number;
  length: number;
  stops: number[];
};

type ExperienceItemProps = {
  index: number;
  exp: (typeof experiences)[number];
  activeIndex: number;
  progress: number;
  stop: number;
  nodeRef: (element: HTMLDivElement | null) => void;
};

function ExperienceContent({
  index,
  exp,
  isActive,
  isPast,
  isLeft,
}: Readonly<{
  index: number;
  exp: (typeof experiences)[number];
  isActive: boolean;
  isPast: boolean;
  isLeft: boolean;
}>) {
  const contentState = isActive
    ? "experience-content-active"
    : isPast
      ? "experience-content-past"
      : "experience-content-future";

  const metaColor = isActive ? "text-accent-text" : "text-muted-foreground/55";

  const titleColor = isActive ? "text-foreground" : "text-foreground/75";

  const companyColor = isActive ? "text-accent-text" : "text-muted-foreground";

  const scopeColor = isActive
    ? "text-muted-foreground"
    : "text-muted-foreground/45";

  const techColor = isActive
    ? "text-foreground/55"
    : "text-muted-foreground/50";

  const alignment = isLeft
    ? "md:ml-auto md:text-right"
    : "md:mr-auto md:text-left";

  const metaAlignment = isLeft ? "md:justify-end" : "md:justify-start";

  return (
    <div className={cn("experience-content max-w-md", alignment, contentState)}>
      <div
        className={cn(
          "mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase",
          metaAlignment,
          metaColor,
        )}
      >
        <span className="text-muted-foreground/40">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span aria-hidden="true" className="text-foreground/20">
          ·
        </span>

        <span>{exp.period}</span>

        <span aria-hidden="true" className="text-foreground/20">
          /
        </span>

        <span>{experienceTypeLabel[exp.type]}</span>
      </div>

      <h3
        className={cn(
          "text-lg font-semibold tracking-tight sm:text-xl",
          titleColor,
        )}
      >
        {exp.role}
      </h3>

      <p className={cn("mt-1 text-sm font-medium", companyColor)}>
        {exp.company}
      </p>

      {exp.scope ? (
        <p
          className={cn(
            "mt-1 font-mono text-[10px] tracking-widest uppercase",
            scopeColor,
          )}
        >
          / {exp.scope}
        </p>
      ) : null}

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {exp.description}
      </p>

      <p className={cn("mt-4 font-mono text-[11px] tracking-wide", techColor)}>
        {exp.tech.join(" · ")}
      </p>
    </div>
  );
}

function ExperienceNode({
  exp,
  isActive,
  isPast,
  isReached,
  nodeRef,
}: Readonly<{
  index: number;
  exp: (typeof experiences)[number];
  isActive: boolean;
  isPast: boolean;
  isReached: boolean;
  nodeRef: (element: HTMLDivElement | null) => void;
}>) {
  const Icon = typeIcon[exp.type] ?? Code2;

  let nodeState = "experience-node-future";

  if (isActive) {
    nodeState = "experience-node-active";
  } else if (isPast) {
    nodeState = "experience-node-past";
  }

  let iconColor = "text-muted-foreground";

  if (isActive) {
    iconColor = "text-primary-foreground";
  } else if (isReached) {
    iconColor = "text-accent-text";
  }

  return (
    <div
      ref={nodeRef}
      className={cn(
        "experience-node absolute top-0 left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-background md:left-1/2",
        nodeState,
      )}
    >
      {isActive ? (
        <span
          aria-hidden="true"
          className="experience-node-pulse border-primary absolute -inset-1.25 rounded-full border"
        />
      ) : null}

      <Icon
        size={17}
        strokeWidth={isActive ? 2.2 : 1.8}
        className={cn(
          "relative z-10 transition-colors duration-200",
          iconColor,
        )}
      />
    </div>
  );
}

function ExperienceItem({
  index,
  exp,
  activeIndex,
  progress,
  stop,
  nodeRef,
}: Readonly<ExperienceItemProps>) {
  const isReached = progress + 0.02 >= stop;
  const isActive = index === activeIndex;
  const isPast = isReached && !isActive;
  const isLeft = index % 2 === 0;

  return (
    <li key={`${exp.company}-${exp.period}`} className="relative">
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-16">
        <div>
          {isLeft ? (
            <ExperienceContent
              index={index}
              exp={exp}
              isActive={isActive}
              isPast={isPast}
              isLeft={isLeft}
            />
          ) : null}
        </div>

        <div>
          {!isLeft ? (
            <ExperienceContent
              index={index}
              exp={exp}
              isActive={isActive}
              isPast={isPast}
              isLeft={isLeft}
            />
          ) : null}
        </div>
      </div>

      <div className="pl-16 md:hidden">
        <ExperienceContent
          index={index}
          exp={exp}
          isActive={isActive}
          isPast={isPast}
          isLeft={isLeft}
        />
      </div>

      <ExperienceNode
        index={index}
        exp={exp}
        isActive={isActive}
        isPast={isPast}
        isReached={isReached}
        nodeRef={nodeRef}
      />
    </li>
  );
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [rail, setRail] = useState<RailGeometry>({
    start: 0,
    length: 0,
    stops: [],
  });

  const updateTimeline = useCallback(() => {
    const timeline = timelineRef.current;

    if (!timeline) {
      return;
    }

    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!nodes.length) {
      return;
    }

    const timelineRect = timeline.getBoundingClientRect();

    const centers = nodes.map((node) => {
      const rect = node.getBoundingClientRect();

      return {
        documentY: rect.top + rect.height / 2 + window.scrollY,
        relativeY: rect.top + rect.height / 2 - timelineRect.top,
      };
    });

    const first = centers[0];
    const last = centers.at(-1);

    if (!first || !last) {
      return;
    }

    const railStart = first.relativeY;
    const railLength = Math.max(0, last.relativeY - first.relativeY);

    const stops =
      railLength <= 0
        ? centers.map(() => 0)
        : centers.map(
            (center) => (center.relativeY - first.relativeY) / railLength,
          );

    setRail((previous) => {
      const same =
        Math.abs(previous.start - railStart) < 0.5 &&
        Math.abs(previous.length - railLength) < 0.5 &&
        previous.stops.length === stops.length &&
        previous.stops.every(
          (stop, index) => Math.abs(stop - (stops[index] ?? 0)) < 0.001,
        );

      if (same) {
        return previous;
      }

      return {
        start: railStart,
        length: railLength,
        stops,
      };
    });

    const focusY = window.scrollY + window.innerHeight * 0.42;

    const span = Math.max(1, last.documentY - first.documentY);

    const nextProgress = Math.min(
      1,
      Math.max(0, (focusY - first.documentY) / span),
    );

    setProgress((previous) =>
      Math.abs(previous - nextProgress) < 0.0005 ? previous : nextProgress,
    );

    let nextActive = 0;

    for (let index = 0; index < stops.length; index += 1) {
      const stop = stops[index] ?? 0;

      if (nextProgress + 0.02 >= stop) {
        nextActive = index;
      } else {
        break;
      }
    }

    setActiveIndex((previous) =>
      previous === nextActive ? previous : nextActive,
    );
  }, []);

  useEffect(() => {
    const requestUpdate = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateTimeline();
      });
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    const timeline = timelineRef.current;

    let resizeObserver: ResizeObserver | null = null;

    if (timeline && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(requestUpdate);
      resizeObserver.observe(timeline);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);

      window.removeEventListener("resize", requestUpdate);

      resizeObserver?.disconnect();

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateTimeline]);

  return (
    <section id="experience">
      <div className="container-site section-y">
        {/* Header */}
        <Reveal>
          <div className="border-b border-foreground/8 pb-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-accent-text inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase">
                  <span
                    aria-hidden="true"
                    className="bg-success h-1.5 w-1.5 rounded-full"
                  />
                  <span>[Experience]</span>
                </span>

                <h2 className="text-foreground mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.625rem]">
                  Where I&apos;ve contributed.
                </h2>
              </div>

              <p className="text-muted-foreground max-w-sm text-sm leading-6 md:pb-1">
                Roles, responsibilities, and the technical work behind each
                role.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="relative mx-auto mt-(--space-xl) max-w-4xl"
        >
          {rail.length > 0 ? (
            <>
              <div
                aria-hidden="true"
                className="experience-base-rail absolute left-6 w-px md:left-1/2 md:-translate-x-1/2"
                style={{
                  top: rail.start,
                  height: rail.length,
                }}
              />

              <div
                aria-hidden="true"
                className="experience-progress-rail bg-primary absolute left-6 z-1 w-px origin-top md:left-1/2 md:-translate-x-1/2"
                style={{
                  top: rail.start,
                  height: rail.length,
                  transform: `scaleY(${progress})`,
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-6 z-1 md:left-1/2"
                style={{
                  top: rail.start,
                  transform: `translate3d(-50%, ${
                    progress * rail.length
                  }px, 0)`,
                  opacity: progress > 0.005 && progress < 0.995 ? 1 : 0,
                }}
              >
                <div className="timeline-head-glow bg-primary h-2 w-2 rounded-full" />
              </div>
            </>
          ) : null}

          <ol className="relative space-y-12 sm:space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={`${exp.company}-${exp.period}`}
                index={index}
                exp={exp}
                activeIndex={activeIndex}
                progress={progress}
                stop={rail.stops[index] ?? 0}
                nodeRef={(element) => {
                  nodeRefs.current[index] = element;
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
