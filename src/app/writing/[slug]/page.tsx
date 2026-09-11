import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";

import { PageEnter } from "@/components/shared/page-enter";
import { mdxComponents } from "@/components/writing/mdx-components";
import { getAllPosts, getPost } from "@/lib/writing";

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Writing",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `/writing/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function WritingDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;

  const mdx = await compileMDX({
    source: content,
    components: mdxComponents,
  });

  return (
    <div className="relative">
      <div className="container-site section-y">
        <header>
          <PageEnter delay={0}>
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft aria-hidden="true" size={14} />
              <span>/writing</span>
            </Link>
          </PageEnter>

          <div className="mt-(--space-xl) max-w-3xl">
            <PageEnter delay={40}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                  [Writing]
                </span>

                <span aria-hidden="true" className="text-foreground/20">
                  /
                </span>

                <time
                  dateTime={frontmatter.date}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle"
                >
                  <CalendarDays aria-hidden="true" size={12} />
                  {formatDate(frontmatter.date)}
                </time>

                <span aria-hidden="true" className="text-foreground/20">
                  /
                </span>

                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
                  <Clock3 aria-hidden="true" size={12} />
                  {readingTime}
                </span>
              </div>
            </PageEnter>

            <PageEnter tone="heading" delay={90}>
              <h1 className="mt-(--space-md) max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                {frontmatter.title}
              </h1>
            </PageEnter>

            <PageEnter delay={140}>
              <p className="mt-(--space-md) max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {frontmatter.description}
              </p>
            </PageEnter>

            <PageEnter delay={180}>
              <div className="mt-(--space-lg) flex flex-wrap gap-1.5">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-foreground/10 bg-card/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground sm:text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </PageEnter>
          </div>
        </header>

        <div className="mt-(--space-xl)">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,768px)_minmax(0,240px)] lg:items-start lg:justify-between lg:gap-16">
            <PageEnter tone="soft" delay={260} as="article" className="min-w-0">
              <div className="space-y-12">{mdx.content}</div>
            </PageEnter>

            <PageEnter
              tone="soft"
              delay={320}
              as="aside"
              className="space-y-6 lg:sticky lg:top-24 lg:self-start"
            >
              <div className="rounded-md border border-foreground/10 bg-card/40 p-5">
                <h2 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground">
                  Article details
                </h2>

                <dl className="mt-(--space-md) space-y-3">
                  <MetaRow
                    label="Published"
                    value={formatDate(frontmatter.date)}
                  />

                  <MetaRow label="Reading time" value={readingTime} />

                  <MetaRow label="Tags" value={`${frontmatter.tags.length}`} />
                </dl>
              </div>

              <div className="rounded-md border border-foreground/10 bg-card/40 p-5">
                <h2 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground">
                  Tags
                </h2>

                <div className="mt-(--space-md) flex flex-wrap gap-1.5">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-foreground/10 bg-background/50 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/#writing"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View all writing
                <ArrowUpRight
                  aria-hidden="true"
                  size={13}
                  className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </PageEnter>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
        {label}
      </dt>

      <dd className="text-right font-mono text-[10px] text-muted-foreground">
        {value}
      </dd>
    </div>
  );
}
