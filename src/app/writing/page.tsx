import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { getAllPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes and articles on backend systems, databases, APIs, and software engineering.",
};

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function WritingPage() {
  const posts = await getAllPosts();

  return (
    <div className="container-site section-y">
      <Reveal>
        <header>
          <Link
            href="/#writing"
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
            <span>/writing</span>
          </Link>

          <div className="mt-(--space-lg)">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-success"
              />
              <span>[Writing]</span>
            </span>

            <h1 className="mt-(--space-sm) text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
              Engineering notes.
            </h1>

            <p className="mt-(--space-md) text-base leading-7 text-muted-foreground">
              Notes on backend systems, databases, APIs, and software
              engineering.
            </p>
          </div>
        </header>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-(--space-xl) border-y border-foreground/8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group grid gap-5 border-b border-foreground/8 py-7 last:border-b-0 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
            >
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
                <time
                  dateTime={post.date}
                  className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-subtle"
                >
                  {formatDate(post.date)}
                </time>

                <span
                  aria-hidden="true"
                  className="text-foreground/20 md:hidden"
                >
                  /
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
                  {post.readingTime}
                </span>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <h2 className="flex-1 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-text">
                    {post.title}
                  </h2>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                <p className="mt-(--space-xs) max-w-2xl text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>

                <div className="mt-(--space-md) flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-foreground/10 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
