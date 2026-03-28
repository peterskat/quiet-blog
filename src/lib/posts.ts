import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import type { Post, PostFrontmatter, PostSummary } from "@/types/post";

const postsDir = path.join(process.cwd(), "content/posts");

function sortByNewest(first: { date: string }, second: { date: string }) {
  return new Date(second.date).getTime() - new Date(first.date).getTime();
}

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.(md|mdx)$/i.test(f));
}

function validateFrontmatter(raw: Record<string, unknown>, filePath: string): PostFrontmatter {
  const err = (msg: string) => new Error(`Invalid frontmatter in ${filePath}: ${msg}`);

  if (typeof raw.title !== "string" || !raw.title.trim()) throw err("title must be a non-empty string");
  if (typeof raw.date !== "string" || !raw.date.trim()) throw err("date must be an ISO date string");
  if (typeof raw.description !== "string") throw err("description must be a string");
  if (typeof raw.draft !== "boolean") throw err("draft must be a boolean");
  if (!Array.isArray(raw.tags) || !raw.tags.every((t) => typeof t === "string"))
    throw err("tags must be an array of strings");
  if (typeof raw.slug !== "string" || !raw.slug.trim()) throw err("slug must be a non-empty string");
  if (typeof raw.coverImage !== "string") throw err("coverImage must be a string (Cloudinary public ID)");
  if (typeof raw.coverAlt !== "string") throw err("coverAlt must be a string");

  return {
    title: raw.title.trim(),
    date: raw.date.trim(),
    description: raw.description,
    draft: raw.draft,
    tags: raw.tags as string[],
    slug: raw.slug.trim(),
    coverImage: raw.coverImage.trim(),
    coverAlt: raw.coverAlt
  };
}

function readPostFile(filePath: string): { frontmatter: PostFrontmatter; body: string } {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = validateFrontmatter(data as Record<string, unknown>, filePath);
  return { frontmatter, body: content };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(remarkGfm).use(html).process(markdown);
  return processed.toString();
}

/** All markdown/MDX files in /content/posts (drafts folder is never scanned). */
function getPostFilePaths(): string[] {
  return listMarkdownFiles(postsDir).map((f) => path.join(postsDir, f));
}

export function getPublishedSummaries(): PostSummary[] {
  const paths = getPostFilePaths();
  const summaries: PostSummary[] = [];

  for (const filePath of paths) {
    const { frontmatter } = readPostFile(filePath);
    if (frontmatter.draft) continue;
    summaries.push(frontmatter);
  }

  const slugs = summaries.map((p) => p.slug);
  const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
  if (dup) throw new Error(`Duplicate slug "${dup}" in content/posts`);

  return summaries.sort(sortByNewest);
}

export function getPostSlugs(): string[] {
  return getPublishedSummaries().map((p) => p.slug);
}

export function getPostFrontmatters(): PostSummary[] {
  return getPublishedSummaries();
}

export function getAllTags(): string[] {
  const posts = getPublishedSummaries();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function filterPostsByTag(posts: PostSummary[], tag: string | undefined) {
  if (!tag) return posts;
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const paths = getPostFilePaths();

  for (const filePath of paths) {
    const { frontmatter, body } = readPostFile(filePath);
    if (frontmatter.draft) continue;
    if (frontmatter.slug !== slug) continue;

    const contentHtml = await markdownToHtml(body);
    return { ...frontmatter, contentHtml };
  }

  return null;
}
