import { blogPosts } from "../../components/blog-posts";

// Blog posts render through BlogPostLayout, not the docs shell, so every entry
// switches Nextra's chrome off. Each MDX file repeats this in its frontmatter
// too — Nextra needs it there to avoid a flash of the docs layout on direct
// navigation — but keeping it here as well means a post can never end up half
// wrapped in the sidebar if the frontmatter is forgotten.
const rawBlogTheme = {
  layout: "raw" as const,
  navbar: false,
  footer: false,
  sidebar: false,
  toc: false,
  pagination: false,
  timestamp: false,
  breadcrumb: false,
};

// Derived from components/blog-posts.ts rather than hand-listed. Adding a post
// used to mean editing three files with three chances to typo a slug; now the
// post list is the single source and this stays in step automatically.
// blog/index.tsx is a custom page (not MDX) and is correctly absent — Nextra
// only maps markdown pages into _meta keys.
export default Object.fromEntries(
  blogPosts.map((post) => [post.slug, { title: post.title, theme: rawBlogTheme }]),
);
