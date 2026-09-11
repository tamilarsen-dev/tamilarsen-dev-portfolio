"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { projects, statusLabel } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects">
      <div className="container-site section-y">
        {/* Header */}
        <Reveal>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end md:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-success"
                />
                <span>[Projects]</span>
              </span>

              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.625rem]">
                Systems I&apos;ve built
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground md:pb-1">
              Projects exploring backend engineering, system design, data flow,
              and practical software architecture.
            </p>
          </div>
        </Reveal>

        {/* Project grid */}
        <Reveal delay={60}>
          <div className="mt-(--space-xl) grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects
              .filter((project) => project.featured)
              .slice(0, 3)
              .map((project) => {
                const isActive = project.status === "active";

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className={[
                      "group flex min-w-0 flex-col overflow-hidden",
                      "rounded-md border border-foreground/10 bg-card/50",
                      "transition-[background-color,border-color,box-shadow,transform] duration-200",
                      "hover:-translate-y-0.5",
                      "hover:border-foreground/20 hover:bg-card",
                      "hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-background",
                    ].join(" ")}
                  >
                    {/* Media */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-foreground/[0.035]">
                      {/* Placeholder */}
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      {/* Subtle technical glow */}
                      <div
                        aria-hidden="true"
                        className={[
                          "pointer-events-none absolute inset-0",
                          "bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary),transparent_88%),transparent_60%)]",
                          "opacity-0 transition-opacity duration-300",
                          "group-hover:opacity-100",
                        ].join(" ")}
                      />

                      {/* Status */}
                      <div className="absolute left-3 top-3">
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                            "font-mono text-[9px] font-medium uppercase tracking-[0.08em]",
                            "backdrop-blur-sm",
                            isActive
                              ? [
                                  "border-success/30 bg-white/90 text-success shadow-sm",
                                  "dark:border-success/25 dark:bg-background/60 dark:text-success",
                                ].join(" ")
                              : [
                                  "border-foreground/10 bg-white/90 text-muted-foreground",
                                  "dark:bg-background/60 dark:text-muted-foreground/70",
                                ].join(" "),
                          ].join(" ")}
                        >
                          <span
                            aria-hidden="true"
                            className={[
                              "h-1.5 w-1.5 rounded-full",
                              isActive
                                ? "bg-success shadow-[0_0_8px_currentColor]"
                                : "bg-muted-foreground/40",
                            ].join(" ")}
                          />

                          {statusLabel[project.status]}
                        </span>
                      </div>

                      {/* Bottom interaction hint */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
                            {project.year}
                          </div>

                          <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent-text sm:text-[17px]">
                            {project.title}
                          </h3>
                        </div>

                        <ArrowUpRight
                          aria-hidden="true"
                          size={17}
                          className="mt-0.5 shrink-0 text-muted-foreground transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                        />
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-md border border-foreground/10 bg-background/50 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors duration-200 group-hover:border-foreground/15"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-(--space-xl) flex justify-start sm:justify-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 rounded-sm py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View system index
              <ArrowUpRight
                aria-hidden="true"
                size={13}
                className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
