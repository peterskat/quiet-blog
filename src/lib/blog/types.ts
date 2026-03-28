/** Markdown frontmatter — each branch is independent; fields are not translations of other locales. */
export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  excerpt: string;
  /** Cloudinary public ID; empty string if none. */
  coverImage: string;
  draft: boolean;
  coverAlt?: string;
  tags?: string[];
};

export type Post = PostFrontmatter & {
  contentHtml: string;
};

export type PostSummary = PostFrontmatter;
