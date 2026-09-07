import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

export type WritingFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type WritingPost = WritingFrontmatter & {
  slug: string;
  readingTime: string;
};

export type WritingPostContent = {
  frontmatter: WritingFrontmatter;
  content: string;
  readingTime: string;
};

async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(WRITING_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get a single MDX post.
 *
 * Returns the parsed frontmatter + raw MDX content.
 */
export async function getPost(
  slug: string,
): Promise<WritingPostContent | null> {
  const filePath = path.join(WRITING_DIR, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);

    const stats = readingTime(content);

    const frontmatter: WritingFrontmatter = {
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    };

    return {
      frontmatter,
      content,
      readingTime: `${Math.ceil(stats.minutes)} min`,
    };
  } catch {
    return null;
  }
}

/**
 * Get all posts for listing pages.
 *
 * Returns flattened post metadata:
 * {
 *   title,
 *   description,
 *   date,
 *   tags,
 *   slug,
 *   readingTime
 * }
 */
export async function getAllPosts(): Promise<WritingPost[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug): Promise<WritingPost | null> => {
      const post = await getPost(slug);

      if (!post) {
        return null;
      }

      return {
        ...post.frontmatter,
        slug,
        readingTime: post.readingTime,
      };
    }),
  );

  return posts
    .filter((post): post is WritingPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
