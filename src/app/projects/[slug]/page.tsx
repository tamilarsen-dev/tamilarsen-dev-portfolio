import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { getProject, projects, statusLabel } from "@/data/projects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

export default async function ProjectDetailPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const isActive = project.status === "active";

  return (
    <div className="relative">
      <div className="container-site py-12 sm:py-16 lg:py-20">
        {/* Back + Header */}
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

            <div className="mt-(--space-xl) max-w-4xl">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                  [Project]
                </span>

                <span aria-hidden="true" className="text-foreground/20">
                  /
                </span>

                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground-subtle">
                  {project.year}
                </span>

                <span aria-hidden="true" className="text-foreground/20">
                  /
                </span>

                <span
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-success"
                      : "inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-foreground-subtle"
                  }
                >
                  <span
                    aria-hidden="true"
                    className={
                      isActive
                        ? "h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_currentColor]"
                        : "h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
                    }
                  />

                  {statusLabel[project.status]}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-(--space-md) text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              {/* Description */}
              <p className="mt-(--space-md) max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {project.description}
              </p>

              {/* Tech + actions */}
              <div className="mt-(--space-lg) flex flex-col gap-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-foreground/10 bg-card/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground sm:text-[11px]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {(project.github || project.demo) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-2 rounded-md border border-foreground/10 bg-card/50 px-3.5 text-sm font-medium text-muted-foreground transition-[background-color,border-color,color,transform] duration-150 hover:border-foreground/20 hover:bg-card hover:text-foreground active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Source code
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Live demo
                        <ExternalLink aria-hidden="true" size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>
        </Reveal>

        {/* Hero */}
        <Reveal delay={60}>
          <figure className="mt-12 overflow-hidden rounded-md border border-foreground/10 bg-card/30 sm:mt-14 lg:mt-16">
            <div className="relative aspect-video w-full">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>

        {/* Content */}
        <Reveal delay={120}>
          <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,768px)_minmax(0,240px)] lg:items-start lg:justify-between lg:gap-16">
            {/* Reading content */}
            <article className="min-w-0">
              <div className="space-y-14">
                {/* Overview */}
                <section>
                  <SectionLabel>Overview</SectionLabel>

                  <p className="mt-4 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {project.longDescription}
                  </p>
                </section>

                {/* Highlights */}
                <section>
                  <SectionLabel>Highlights</SectionLabel>

                  <ul className="mt-5 space-y-3.5">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-[15px] leading-7 text-muted-foreground sm:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-success shadow-[0_0_8px_currentColor]"
                        />

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Gallery */}
                {project.images.length > 1 && (
                  <section>
                    <SectionLabel>Gallery</SectionLabel>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {project.images.slice(1).map((image) => (
                        <figure
                          key={image.alt}
                          className="group overflow-hidden rounded-md border border-foreground/10 bg-card/30"
                        >
                          <div className="relative aspect-4/3 w-full overflow-hidden">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 384px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                {/* Technical notes */}
                <section>
                  <SectionLabel>Technical notes</SectionLabel>

                  <div className="mt-4 space-y-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {project.technicalNotes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                </section>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Stack */}
              <div className="rounded-md border border-foreground/10 bg-card/40 p-5">
                <h2 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground">
                  Stack
                </h2>

                <div className="mt-(--space-md) flex flex-wrap gap-1.5">
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

              {/* Links */}
              {(project.github || project.demo) && (
                <div className="rounded-md border border-foreground/10 bg-card/40 p-5">
                  <h2 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground">
                    Links
                  </h2>

                  <div className="mt-(--space-md) flex flex-col gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        Source code
                        <ExternalLink
                          aria-hidden="true"
                          size={13}
                          className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        Live demo
                        <ExternalLink
                          aria-hidden="true"
                          size={13}
                          className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function SectionLabel({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground">
      {children}
    </h2>
  );
}
