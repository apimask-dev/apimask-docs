import { docsHref } from "../lib/products";

export type BlogPost = {
  title: string;
  slug: string;
  /** Display name of the API category the post supports. */
  category: string;
  /** Matching category slug in lib/products.ts, used for filtering and for
   *  "more in this category" links. */
  categorySlug: string;
  description: string;
  readTime: string;
  /** ISO date. Required: Article JSON-LD needs a datePublished, and the index
   *  sorts on it — the array used to be hand-ordered with blogPosts[0]
   *  implicitly meaning "featured". */
  date: string;
  updated?: string;
  /** Docs page this post should send readers to. */
  api: string;
  /** Primary search intent, for reference when editing. Not rendered. */
  keywords: string[];
  featured?: boolean;
};

// About two posts per live API category. Adding a post means three files: the MDX
// body in pages/blog/, an entry here, and a key in pages/blog/_meta.ts.
const posts: BlogPost[] = [
  {
    title: "How to Validate Emails Before Users Sign Up",
    slug: "validate-emails-before-signup",
    category: "Email & domain",
    categorySlug: "email-domain",
    description:
      "Protect signup flows from fake accounts, disposable inboxes, bounces, and low-quality lead data before the problem reaches your database.",
    readTime: "10 min read",
    date: "2025-11-04",
    api: docsHref("email-validation"),
    keywords: ["email validation api", "verify email before signup"],
    featured: true,
  },
  {
    title: "MX, SPF, DKIM, and DMARC Explained for Developers",
    slug: "mx-spf-dkim-dmarc-explained",
    category: "Email & domain",
    categorySlug: "email-domain",
    description:
      "Understand the records behind email delivery, domain trust, sender authentication, and onboarding checks without becoming a DNS specialist.",
    readTime: "9 min read",
    date: "2025-11-18",
    api: docsHref("dns-analyzer"),
    keywords: ["spf dkim dmarc explained", "dns analyzer api"],
  },
  {
    title: "How to Check If a Website Has Proper Security Headers",
    slug: "check-website-security-headers",
    category: "Website & security",
    categorySlug: "website-security",
    description:
      "Learn which headers matter first, what they protect, and how to turn security header checks into repeatable website audits.",
    readTime: "9 min read",
    date: "2025-12-02",
    api: docsHref("security-headers-analyzer"),
    keywords: ["security headers checker api", "content security policy check"],
  },
  {
    title: "CORS Explained: Common Errors and How to Debug Them",
    slug: "cors-errors-explained",
    category: "Website & security",
    categorySlug: "website-security",
    description:
      "Decode origins, preflight requests, credential rules, and the browser errors that make otherwise working APIs look broken.",
    readTime: "9 min read",
    date: "2025-12-16",
    api: docsHref("cors-checker"),
    keywords: ["cors error", "cors checker api", "preflight request"],
  },
  {
    title: "How to Generate QR Codes with Logos Using an API",
    slug: "generate-qr-codes-with-logo-api",
    category: "QR codes",
    categorySlug: "qr-codes",
    description:
      "Build branded QR generation into apps, events, packaging, WiFi flows, campaigns, and internal tools without manual QR exports.",
    readTime: "8 min read",
    date: "2026-01-13",
    api: docsHref("qr-code-generator-api"),
    keywords: ["qr code api with logo", "branded qr code generator api"],
  },
  {
    title: "Website Audit API Checklist for SEO, Security, and Technical Health",
    slug: "website-audit-api-checklist",
    category: "SEO",
    categorySlug: "seo",
    description:
      "Combine SSL, DNS, security headers, CORS, robots.txt, sitemaps, URL safety, and metadata checks into a real audit product.",
    readTime: "11 min read",
    date: "2026-01-27",
    api: docsHref("ssl-checker"),
    keywords: ["website audit api", "technical seo audit automation"],
  },
  {
    title: "Generate and Explain Regex with an API",
    slug: "regex-generator-api-guide",
    category: "Developer utilities",
    categorySlug: "developer-utilities",
    description:
      "Turn plain-English rules into working regular expressions, then get a token-by-token explanation of any pattern you inherit.",
    readTime: "9 min read",
    date: "2026-02-10",
    api: docsHref("regex-generator"),
    keywords: ["regex generator api", "explain regex", "regex from description"],
  },
  {
    title: "The Developer Utility APIs You Keep Rewriting",
    slug: "developer-utility-apis-you-keep-rewriting",
    category: "Developer utilities",
    categorySlug: "developer-utilities",
    description:
      "Hashing, UUIDs, Base64, JSON formatting, and URL parsing show up in every project. Here's when to call an API instead of vendoring a helper.",
    readTime: "10 min read",
    date: "2026-02-24",
    api: docsHref("developer-utilities"),
    keywords: ["uuid generator api", "json formatter api", "hash generator api"],
  },
  {
    title: "How to Generate SEO Titles and Meta Descriptions at Scale",
    slug: "generate-seo-meta-tags-at-scale",
    category: "AI content",
    categorySlug: "ai-content",
    description:
      "Write metadata for thousands of pages without writing it by hand — and without shipping the generic output that gets rewritten by Google.",
    readTime: "10 min read",
    date: "2026-03-10",
    api: docsHref("seo-meta-tags-api"),
    keywords: ["meta description generator api", "seo title generator api"],
  },
  {
    title: "Automating Product Descriptions, Summaries, and Social Captions",
    slug: "ai-product-descriptions-and-captions-api",
    category: "AI content",
    categorySlug: "ai-content",
    description:
      "Where an AI content API genuinely saves time in a catalog or content pipeline, where it doesn't, and how to keep the output usable.",
    readTime: "9 min read",
    date: "2026-03-24",
    api: docsHref("ai-content-generator-api"),
    keywords: ["ai product description generator api", "ai content generation api"],
  },
  {
    title: "Beyond the Basic QR Code: WiFi, vCards, and SVG",
    slug: "wifi-vcard-svg-qr-codes",
    category: "QR codes",
    categorySlug: "qr-codes",
    description:
      "The payload formats behind WiFi and contact QR codes, why SVG matters for print, and the escaping rules that quietly break scans.",
    readTime: "9 min read",
    date: "2026-04-07",
    api: docsHref("wifi-qr-code-api"),
    keywords: ["wifi qr code api", "vcard qr code", "svg qr code generator"],
  },
  {
    title: "Robots.txt and Sitemap Errors That Quietly Kill Your Crawl Budget",
    slug: "robots-txt-and-sitemap-errors",
    category: "SEO",
    categorySlug: "seo",
    description:
      "The misconfigurations that stop pages being indexed, why they're so easy to miss, and how to catch them automatically before a deploy ships.",
    readTime: "10 min read",
    date: "2026-04-21",
    api: docsHref("robots-txt-analyzer"),
    keywords: ["robots.txt checker api", "sitemap validator api", "crawl budget"],
  },
  {
    title: "Cleaning a 50,000-Row Email List with a Bulk Verification API",
    slug: "bulk-email-verification-csv-guide",
    category: "Email & domain",
    categorySlug: "email-domain",
    description:
      "A practical pass over a real list: CSV upload, batching, what each flag means, which addresses to drop, and what a healthy result looks like.",
    readTime: "11 min read",
    date: "2026-06-02",
    api: docsHref("bulk-email-verification"),
    keywords: ["bulk email verification api", "clean email list csv"],
  },
];

/** Newest first. The index and the prev/next links both read this order. */
export const blogPosts: BlogPost[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const featuredPost: BlogPost =
  blogPosts.find((post) => post.featured) ?? blogPosts[0];

export function postHref(slug: string): string {
  return `/blog/${slug}`;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? blogPosts[index - 1] : undefined,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined,
  };
}

/** Other posts in the same category, for the "more in…" block on a post. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getBlogPost(slug);
  if (!post) return [];
  return blogPosts
    .filter((other) => other.slug !== slug && other.categorySlug === post.categorySlug)
    .slice(0, limit);
}

/** Category slugs present in the post list, in the order they first appear. */
export function blogCategories(): { slug: string; name: string; count: number }[] {
  const seen = new Map<string, { slug: string; name: string; count: number }>();
  for (const post of blogPosts) {
    const existing = seen.get(post.categorySlug);
    if (existing) existing.count += 1;
    else seen.set(post.categorySlug, { slug: post.categorySlug, name: post.category, count: 1 });
  }
  return [...seen.values()];
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
