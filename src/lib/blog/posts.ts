import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import type { Locale } from "@/lib/blog/config";
import type { Post, PostFrontmatter, PostSummary } from "@/lib/blog/types";

const contentRoot = path.join(process.cwd(), "content");

function sortByNewest(first: { date: string }, second: { date: string }) {
  return new Date(second.date).getTime() - new Date(first.date).getTime();
}

function localeDir(locale: Locale): string {
  return path.join(contentRoot, locale);
}

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/i.test(f));
}

function validateFrontmatter(raw: Record<string, unknown>, filePath: string): PostFrontmatter {
  const err = (msg: string) => new Error(`Invalid frontmatter in ${filePath}: ${msg}`);

  if (typeof raw.title !== "string" || !raw.title.trim()) throw err("title must be a non-empty string");
  if (typeof raw.description !== "string") throw err("description must be a string");
  if (typeof raw.date !== "string" || !raw.date.trim()) throw err("date must be an ISO date string");
  if (typeof raw.slug !== "string" || !raw.slug.trim()) throw err("slug must be a non-empty string");
  if (typeof raw.excerpt !== "string") throw err("excerpt must be a string");
  if (typeof raw.coverImage !== "string") throw err("coverImage must be a string (Cloudinary public ID or empty)");
  if (typeof raw.draft !== "boolean") throw err("draft must be a boolean");

  const tags = raw.tags;
  if (tags !== undefined && (!Array.isArray(tags) || !tags.every((t) => typeof t === "string"))) {
    throw err("tags must be an array of strings when present");
  }

  const coverAlt = raw.coverAlt;
  if (coverAlt !== undefined && typeof coverAlt !== "string") throw err("coverAlt must be a string when present");

  return {
    title: raw.title.trim(),
    description: raw.description,
    date: raw.date.trim(),
    slug: raw.slug.trim(),
    excerpt: raw.excerpt,
    coverImage: raw.coverImage.trim(),
    draft: raw.draft,
    coverAlt: typeof coverAlt === "string" ? coverAlt : "",
    tags: tags as string[] | undefined
  };
}

function readPostFile(filePath: string): { frontmatter: PostFrontmatter; body: string } {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: validateFrontmatter(data as Record<string, unknown>, filePath), body: content };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(remarkGfm).use(html).process(markdown);
  return processed.toString();
}

function getPostFilePaths(locale: Locale): string[] {
  return listMarkdownFiles(localeDir(locale)).map((f) => path.join(localeDir(locale), f));
}

export function getPublishedSummaries(locale: Locale): PostSummary[] {
  const paths = getPostFilePaths(locale);
  const summaries: PostSummary[] = [];

  for (const filePath of paths) {
    const { frontmatter } = readPostFile(filePath);
    if (frontmatter.draft) continue;
    summaries.push(frontmatter);
  }

  const slugs = summaries.map((p) => p.slug);
  const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
  if (dup) throw new Error(`Duplicate slug "${dup}" in content/${locale}`);

  return summaries.sort(sortByNewest);
}

export function getPostSlugs(locale: Locale): string[] {
  return getPublishedSummaries(locale).map((p) => p.slug);
}

export function getAllTags(locale: Locale): string[] {
  const posts = getPublishedSummaries(locale);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function filterPostsByTag(posts: PostSummary[], tag: string | undefined) {
  if (!tag) return posts;
  return posts.filter((post) => post.tags?.includes(tag));
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<Post | null> {
  const paths = getPostFilePaths(locale);

  for (const filePath of paths) {
    const { frontmatter, body } = readPostFile(filePath);
    if (frontmatter.draft) continue;
    if (frontmatter.slug !== slug) continue;

    const contentHtml = await markdownToHtml(body);
    return { ...frontmatter, contentHtml };
  }

  return null;
}
