import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  coverImage: string;
  readingTime: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

export type Heading = {
  level: 2 | 3 | 4;
  text: string;
  id: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

async function readPostFile(filePath: string, slug: string): Promise<Post> {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const frontmatter: PostFrontmatter = {
    title: String(data.title ?? ""),
    date: toIsoDate(data.date ?? data.published),
    description: String(data.description ?? ""),
    category: String(data.category ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
  };

  return {
    ...frontmatter,
    slug,
    coverImage: `/images/posts/${slug}.webp`,
    content,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min`,
    readingMinutes: stats.minutes,
  };
}

async function listPostFiles(): Promise<{ file: string; slug: string }[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
      .map((e) => ({
        file: path.join(POSTS_DIR, e.name),
        slug: e.name.replace(/\.mdx?$/, ""),
      }));
  } catch {
    return [];
  }
}

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const files = await listPostFiles();
  const posts = await Promise.all(
    files.map(async ({ file, slug }) => {
      const post = await readPostFile(file, slug);
      return {
        title: post.title,
        date: post.date,
        description: post.description,
        category: post.category,
        tags: post.tags,
        draft: post.draft,
        slug: post.slug,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
        readingMinutes: post.readingMinutes,
      };
    }),
  );
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const file = path.join(POSTS_DIR, `${slug}.mdx`);
    try {
      return await readPostFile(file, slug);
    } catch {
      const mdFile = path.join(POSTS_DIR, `${slug}.md`);
      try {
        return await readPostFile(mdFile, slug);
      } catch {
        return null;
      }
    }
  },
);

export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3 | 4;
    const text = match[2].replace(/[*_`]/g, "");
    headings.push({ level, text, id: slugify(text) });
  }
  return headings;
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}

export async function getAdjacentPosts(slug: string): Promise<{
  prev: PostMeta | null;
  next: PostMeta | null;
}> {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}
