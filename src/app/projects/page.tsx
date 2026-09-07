import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { projects, statusLabel } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main>
      <section>
        <div className="container-site section-y-lg">
          <Reveal>
            <header>
              <Link
                href="/#projects"
                className={[
                  "inline-flex items-center gap-2",
                  "font-mono text-[11px] uppercase tracking-[0.08em]",
                  "text-muted-foreground transition-colors duration-150",
                  "hover:text-foreground",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                ].join(" ")}
              >
                <ArrowLeft aria-hidden="true" size={14} />
                <span>/projects</span>
              </Link>

              <div className="mt-(--space-lg) border-b border-foreground/8 pb-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-success"
                      />
                      <span>[Projects]</span>
                    </span>

                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                      Project archive.
                    </h1>
                  </div>

                  <p className="max-w-md text-sm leading-6 text-muted-foreground md:pb-1">
                    An archive of systems, experiments, and software projects
                    I&apos;ve built.
                  </p>
                </div>
              </div>
            </header>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-(--space-xl) grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => {
                const isActive = project.status === "active";

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-foreground/10 bg-card/50 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-foreground/[0.035]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/25 transition-colors duration-200 group-hover:text-muted-foreground/40">
                          {project.slug}
                        </span>
                      </div>

                      <div className="absolute left-3 top-3">
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 rounded-full border px-2 py-1",
                            "font-mono text-[9px] font-medium uppercase tracking-[0.08em]",
                            "backdrop-blur-sm",
                            isActive
                              ? "border-success/25 bg-background/60 text-success"
                              : "border-foreground/10 bg-background/60 text-muted-foreground/70",
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

                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
                            {project.year}
                          </div>

                          <h2 className="mt-(--space-micro) text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent-text sm:text-[17px]">
                            {project.title}
                          </h2>
                        </div>

                        <ArrowUpRight
                          aria-hidden="true"
                          size={17}
                          className="mt-0.5 shrink-0 text-muted-foreground transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                        />
                      </div>

                      <p className="mt-(--space-sm) line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mt-auto pt-(--space-lg)">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-md border border-foreground/10 bg-background/50 px-2 py-1 font-mono text-[10px] text-muted-foreground"
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
        </div>
      </section>
    </main>
  );
}
