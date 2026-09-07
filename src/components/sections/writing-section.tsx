import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { getAllPosts } from "@/lib/writing";

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function WritingSection() {
  const posts = await getAllPosts();

  return (
    <section id="writing">
      <div className="container-site section-y">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end md:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-success"
                />
                <span>[Writing]</span>
              </span>

              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.625rem]">
                Engineering notes.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground md:pb-1">
              Notes on backend engineering, system design, databases, and
              software fundamentals.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 border-y border-foreground/8">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group grid gap-5 border-b border-foreground/8 py-6 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-8 sm:py-6 md:grid-cols-[8rem_minmax(0,1fr)] lg:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[11px] tabular-nums uppercase tracking-[0.04em] text-foreground-subtle"
                  >
                    {formatDate(post.date)}
                  </time>

                  <span
                    aria-hidden="true"
                    className="text-foreground/20 sm:hidden"
                  >
                    /
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
                    {post.readingTime}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-start gap-4">
                    <h3 className="min-w-0 flex-1 text-base font-semibold leading-6 tracking-tight text-foreground transition-colors duration-150 group-hover:text-accent-text sm:text-[17px]">
                      {post.title}
                    </h3>

                    <ArrowUpRight
                      aria-hidden="true"
                      size={17}
                      className="mt-0.5 shrink-0 text-muted-foreground transition-[transform,color] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                    />
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-foreground/10 bg-background/40 px-2 py-1 font-mono text-[10px] text-muted-foreground"
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

        <Reveal delay={100}>
          <div className="mt-8 flex justify-start sm:justify-end">
            <Link
              href="/writing"
              className="group inline-flex items-center gap-1.5 rounded-sm py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all notes
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
