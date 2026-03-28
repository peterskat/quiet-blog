/** Strict frontmatter schema — only these fields are supported. */
export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  draft: boolean;
  tags: string[];
  slug: string;
  /** Cloudinary public ID (not a full URL). */
  coverImage: string;
  coverAlt: string;
};

export type Post = PostFrontmatter & {
  contentHtml: string;
};

/** Published listing (no body). */
export type PostSummary = PostFrontmatter;
