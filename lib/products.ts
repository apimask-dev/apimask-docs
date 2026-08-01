// Single source of truth for product, category, and endpoint data. Consumed by
// the homepage, the /api catalog, the site footer, and their JSON-LD.
//
// Titles and descriptions below are lifted verbatim from each endpoint page's
// frontmatter under pages/apis/, and RapidAPI links from the listings those
// pages actually link to — so nothing here is invented, and drift between the
// catalog and the docs is a copy-paste away from being caught.

/** Marketplace profile. Every generic "subscribe / view on RapidAPI" CTA in the
 *  site points here. Previously three files disagreed: the homepage and SiteNav
 *  hardcoded a single Instagram listing while theme.config used the profile. */
export const RAPIDAPI_PROFILE_URL = "https://rapidapi.com/user/aftaab";

const RAPIDAPI = {
  devUtilities: "https://rapidapi.com/aftaab/api/apimask-developer-utilities-api",
  emailDomain: "https://rapidapi.com/aftaab/api/email-domain-validation-api",
  bulkEmail: "https://rapidapi.com/aftaab/api/bulk-email-verification-api",
  seoAudit: "https://rapidapi.com/aftaab/api/seo-website-audit-api",
  qrWithLogo: "https://rapidapi.com/aftaab/api/qr-code-generator-api-with-logo",
  aiContent: "https://rapidapi.com/aftaab/api/ai-content-generator-api",
  twitter: "https://rapidapi.com/aftaab/api/twitter-x-api",
  instagram: "https://rapidapi.com/aftaab/api/instagram-api",
} as const;

/* -------------------------------------------------------------------------- */
/* Categories                                                                  */
/* -------------------------------------------------------------------------- */

export type CategoryStatus = "Live" | "Soon";

export type Category = {
  /** Stable key used to group endpoints and to filter in the catalog UI. */
  slug: string;
  name: string;
  status: CategoryStatus;
  note: string;
};

// Forward-looking category map. "Live" groups are shippable today; the rest are
// on the public roadmap. Kept honest with explicit status so we capture
// category search intent without overpromising.
export const categories: Category[] = [
  {
    slug: "developer-utilities",
    name: "Developer utilities",
    status: "Live",
    note: "Regex, stacktraces, JSON, Base64, hashing, IDs, URL parsing",
  },
  {
    slug: "ai-content",
    name: "AI content",
    status: "Live",
    note: "SEO meta tags, summaries, rewrites, descriptions, captions",
  },
  {
    slug: "email-domain",
    name: "Email & domain",
    status: "Live",
    note: "Validation, bulk lists, MX/DNS, deliverability",
  },
  {
    slug: "website-security",
    name: "Website & security",
    status: "Live",
    note: "SSL, security headers, URL safety, CORS",
  },
  {
    slug: "qr-codes",
    name: "QR codes",
    status: "Live",
    note: "URL, WiFi, vCard, branded logo QR codes",
  },
  {
    slug: "seo",
    name: "SEO",
    status: "Live",
    note: "Site audits, meta tags, robots.txt, sitemaps",
  },
  {
    slug: "social-app",
    name: "Social & app intelligence",
    status: "Live",
    note: "Twitter/X and Instagram profile and content data",
  },
  {
    slug: "ocr-pdf",
    name: "OCR & PDF",
    status: "Soon",
    note: "PDF-to-Markdown, table & field extraction, OCR cleanup",
  },
  {
    slug: "resume-ats",
    name: "Resume & ATS",
    status: "Soon",
    note: "ATS scoring, keyword gaps, resume rewrite",
  },
  {
    slug: "appstore-aso",
    name: "App Store / ASO",
    status: "Soon",
    note: "Metadata, keywords, release notes, review sentiment",
  },
  {
    slug: "enrichment",
    name: "Data enrichment",
    status: "Soon",
    note: "Company, email, and domain enrichment",
  },
  {
    slug: "threat-intel",
    name: "Security & threat intel",
    status: "Soon",
    note: "URL safety, breach checks, header hardening",
  },
  {
    slug: "ai-agents",
    name: "AI agents & workflows",
    status: "Soon",
    note: "Tool endpoints and structured extraction for agents",
  },
];

export const liveCategories = categories.filter((c) => c.status === "Live");
export const soonCategories = categories.filter((c) => c.status === "Soon");

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* Endpoints                                                                   */
/* -------------------------------------------------------------------------- */

export type ApiEndpoint = {
  /** Docs slug under pages/apis/. Public URL is /api/<slug> (see next.config). */
  slug: string;
  name: string;
  /** One line, from the page's frontmatter description. */
  description: string;
  category: string;
  rapidapi?: string;
  /** Product hub pages that document a whole collection rather than one call. */
  isCollection?: boolean;
};

// Mirrors the live (non-roadmap) entries in pages/apis/_meta.ts. When adding an
// endpoint page, add it here too — liveEndpointCount is derived from this array
// so the count on the homepage can no longer drift from reality.
export const endpoints: ApiEndpoint[] = [
  // --- Collections / product hubs ---
  {
    slug: "developer-utilities",
    name: "Developer Utilities API",
    description:
      "Regex, stacktrace, README, changelog, JSON, Base64, hash, ID, and URL parsing endpoints in one product.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
    isCollection: true,
  },
  {
    slug: "email-domain-validation",
    name: "Email, Domain & Website Utilities API",
    description:
      "Email validation, DNS, SSL, URL safety, security headers, robots.txt, sitemap, and CORS checks in one product.",
    category: "email-domain",
    rapidapi: RAPIDAPI.emailDomain,
    isCollection: true,
  },
  {
    slug: "seo-website-audit",
    name: "SEO Website Audit API",
    description:
      "Site audit, SEO meta tags, sitemap, robots.txt, SSL, DNS, security headers, URL safety, and CORS checks in one product.",
    category: "seo",
    rapidapi: RAPIDAPI.seoAudit,
    isCollection: true,
  },

  // --- Email & domain ---
  {
    slug: "email-validation",
    name: "Email Validation API",
    description:
      "Validate email syntax, domains, MX records, disposable providers, role accounts, and optional SMTP mailbox checks.",
    category: "email-domain",
    rapidapi: RAPIDAPI.emailDomain,
  },
  {
    slug: "bulk-email-verification",
    name: "Bulk Email Verification API",
    description:
      "Validate email lists, upload CSVs, detect disposable addresses and role accounts, and check MX, SPF, and DMARC records.",
    category: "email-domain",
    rapidapi: RAPIDAPI.bulkEmail,
  },
  {
    slug: "dns-analyzer",
    name: "DNS Analyzer API",
    description: "Analyze A, AAAA, MX, TXT, NS, CNAME, SPF, and DMARC records for a domain.",
    category: "email-domain",
    rapidapi: RAPIDAPI.emailDomain,
  },

  // --- Website & security ---
  {
    slug: "ssl-checker",
    name: "SSL Certificate Checker API",
    description:
      "Check SSL certificates for validity, issuer, subject, SANs, expiration dates, and days remaining.",
    category: "website-security",
    rapidapi: RAPIDAPI.emailDomain,
  },
  {
    slug: "security-headers-analyzer",
    name: "Security Headers Analyzer API",
    description:
      "Analyze website security headers, score header coverage, and get missing header recommendations.",
    category: "website-security",
    rapidapi: RAPIDAPI.emailDomain,
  },
  {
    slug: "url-safety-checker",
    name: "URL Safety Checker API",
    description:
      "Check URL redirects, final URL, homograph risk, status code, threat indicators, and safety status.",
    category: "website-security",
    rapidapi: RAPIDAPI.emailDomain,
  },
  {
    slug: "cors-checker",
    name: "CORS Checker API",
    description:
      "Check CORS response headers, allowed origins, credentials, methods, exposed headers, and risk level.",
    category: "website-security",
    rapidapi: RAPIDAPI.emailDomain,
  },

  // --- SEO ---
  {
    slug: "seo-site-audit",
    name: "SEO Site Audit API",
    description:
      "Run one combined website audit covering URL safety, security headers, robots.txt, sitemap, CORS, SSL, DNS, and SEO meta tags.",
    category: "seo",
    rapidapi: RAPIDAPI.seoAudit,
  },
  {
    slug: "seo-meta-tags-api",
    name: "SEO Meta Tags API",
    description:
      "Generate SEO titles, meta descriptions, and keyword sets from page content with a single JSON endpoint.",
    category: "seo",
    rapidapi: RAPIDAPI.aiContent,
  },
  {
    slug: "robots-txt-analyzer",
    name: "Robots.txt Analyzer API",
    description: "Analyze robots.txt status, directives, sitemap URLs, user agents, and warnings.",
    category: "seo",
    rapidapi: RAPIDAPI.emailDomain,
  },
  {
    slug: "sitemap-validator",
    name: "Sitemap Validator API",
    description: "Validate XML sitemaps, sitemap indexes, status codes, URL counts, and warnings.",
    category: "seo",
    rapidapi: RAPIDAPI.emailDomain,
  },

  // --- QR codes ---
  {
    slug: "qr-code-generator-api",
    name: "QR Code Generator API",
    description:
      "Generate QR codes as PNG or SVG for URLs, text, WiFi, vCards, email links, and SMS, with branded colors.",
    category: "qr-codes",
    rapidapi: RAPIDAPI.qrWithLogo,
  },
  {
    slug: "qr-code-api-with-logo",
    name: "QR Code API with Logo",
    description:
      "Generate branded QR codes with a centered logo overlay, custom colors, sizing, and error correction.",
    category: "qr-codes",
    rapidapi: RAPIDAPI.qrWithLogo,
  },
  {
    slug: "wifi-qr-code-api",
    name: "WiFi QR Code API",
    description:
      "Generate scannable WiFi QR codes for guest networks, venues, offices, events, and customer onboarding.",
    category: "qr-codes",
    rapidapi: RAPIDAPI.qrWithLogo,
  },

  // --- AI content ---
  {
    slug: "ai-content-generator-api",
    name: "AI Content Generator API",
    description:
      "Generate summaries, rewrites, SEO meta tags, blog outlines, product descriptions, social captions, headlines, and FAQs.",
    category: "ai-content",
    rapidapi: RAPIDAPI.aiContent,
  },

  // --- Social & app intelligence ---
  {
    slug: "twitter",
    name: "Twitter/X Data API",
    description:
      "Twitter/X profiles, tweets, search results, replies, and thread extraction as normalized JSON.",
    category: "social-app",
    rapidapi: RAPIDAPI.twitter,
  },
  {
    slug: "instagram",
    name: "Instagram API Collection",
    description:
      "Instagram profiles, posts, reels, comments, hashtag search, and AI insights in normalized JSON.",
    category: "social-app",
    rapidapi: RAPIDAPI.instagram,
  },

  // --- Developer utilities ---
  {
    slug: "regex-generator",
    name: "Regex Generator API",
    description:
      "Generate regular expressions from plain English descriptions, with explanations and test cases.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "regex-explainer",
    name: "Regex Explainer API",
    description: "Explain regular expressions in plain English with token-by-token breakdowns.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "stacktrace-analyzer",
    name: "Stacktrace Analyzer API",
    description:
      "Analyze stacktraces, identify root causes, suggest fixes, and return relevant documentation links.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "readme-generator",
    name: "README Generator API",
    description: "Generate professional README.md content from repository metadata.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "changelog-generator",
    name: "Changelog Generator API",
    description: "Generate categorized changelogs from raw git logs or diffs.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter API",
    description: "Validate, format, minify, and optionally sort JSON.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encode and Decode API",
    description:
      "Encode UTF-8 text as Base64 or decode it back, with optional URL-safe alphabet support.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "hash-generator",
    name: "Hash Generator API",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512, and BLAKE2 hashes for strings.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "id-generator",
    name: "UUID and ULID Generator API",
    description: "Generate UUIDv4, UUIDv1, or ULID-compatible identifiers.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    slug: "url-parser",
    name: "URL Parser API",
    description:
      "Parse URLs into scheme, host, port, path, query parameters, fragment, and normalized URL.",
    category: "developer-utilities",
    rapidapi: RAPIDAPI.devUtilities,
  },
];

/** Public docs URL for an endpoint. Pages live under /apis/** but are served at
 *  /api/** (see the rewrite in next.config.js). */
export function docsHref(slug: string): string {
  return `/api/${slug}`;
}

export const liveEndpointCount = endpoints.length;

export function endpointsByCategory(slug: string): ApiEndpoint[] {
  return endpoints.filter((e) => e.category === slug);
}

/** Endpoint count per category slug, for catalog badges. */
export const categoryCounts: Record<string, number> = endpoints.reduce<Record<string, number>>(
  (acc, endpoint) => {
    acc[endpoint.category] = (acc[endpoint.category] || 0) + 1;
    return acc;
  },
  {},
);

/* -------------------------------------------------------------------------- */
/* Flagship products                                                           */
/* -------------------------------------------------------------------------- */

// The three ApiMask products with their own dedicated RapidAPI listing today.
/** Every RapidAPI listing, as shown on the homepage.
 *
 *  `count` is the number of endpoints in the RapidAPI listing, which is not the
 *  same as the number of docs pages under pages/apis/ — several endpoints share
 *  a page, and a few are sold under more than one listing. The numbers are the
 *  operation counts in the platform's own OpenAPI specs
 *  (apimask-platform/docs/*.openapi.json), so verify against those when a
 *  listing gains an endpoint. */
export const rapidapiProducts = [
  {
    icon: "QR",
    count: 6,
    title: "QR Code Generator API with Logo",
    copy: "PNG/SVG QR codes for URLs, WiFi, vCards, email, and SMS, with branded colors and optional logo overlay.",
    tags: ["Logo", "WiFi", "vCard", "SVG"],
    docs: docsHref("qr-code-generator-api"),
    rapidapi: RAPIDAPI.qrWithLogo,
  },
  {
    icon: "AI",
    count: 8,
    title: "AI Content Generator API",
    copy: "Summaries, rewrites, SEO meta tags, blog outlines, product descriptions, social captions, headlines, and FAQs.",
    tags: ["SEO", "Rewrite", "Captions", "FAQ"],
    docs: docsHref("ai-content-generator-api"),
    rapidapi: RAPIDAPI.aiContent,
  },
  {
    icon: "@",
    count: 5,
    title: "Bulk Email Verification API",
    copy: "Validate JSON batches and CSV uploads, flag disposable and role-account emails, and check MX, SPF, and DMARC readiness.",
    tags: ["CSV", "MX", "SPF", "DMARC"],
    docs: docsHref("bulk-email-verification"),
    rapidapi: RAPIDAPI.bulkEmail,
  },
  {
    icon: "{}",
    count: 12,
    title: "Developer Utilities API",
    copy: "Regex generation and explanation, stacktrace analysis, README and changelog generation, JSON, Base64, hashing, IDs, and URL parsing.",
    tags: ["Regex", "JSON", "Hash", "UUID"],
    docs: docsHref("developer-utilities"),
    rapidapi: RAPIDAPI.devUtilities,
  },
  {
    icon: "MX",
    count: 8,
    title: "Email & Domain Validation API",
    copy: "Validate emails and domains, and check DNS records, SSL certificates, URL safety, security headers, robots.txt, sitemaps, and CORS.",
    tags: ["MX", "SSL", "Headers", "CORS"],
    docs: docsHref("email-domain-validation"),
    rapidapi: RAPIDAPI.emailDomain,
  },
  {
    icon: "SEO",
    count: 9,
    title: "SEO Website Audit API",
    copy: "Run one combined website audit, validate sitemaps and robots.txt, check SSL, DNS, security headers, URL safety, and CORS, and generate meta tags.",
    tags: ["Audit", "Sitemap", "Robots", "Meta"],
    docs: docsHref("seo-website-audit"),
    rapidapi: RAPIDAPI.seoAudit,
  },
  {
    icon: "X",
    count: 10,
    title: "Twitter/X Data API",
    copy: "Profiles, tweets, search results, replies, and thread extraction through stable, normalized JSON endpoints.",
    tags: ["Profiles", "Tweets", "Search", "Threads"],
    docs: docsHref("twitter"),
    rapidapi: RAPIDAPI.twitter,
  },
  {
    icon: "IG",
    count: 9,
    title: "Instagram API Collection",
    copy: "Profiles, posts, reels, comments, hashtag search, and AI insights, returned as normalized JSON.",
    tags: ["Profiles", "Reels", "Hashtags", "Insights"],
    docs: docsHref("instagram"),
    rapidapi: RAPIDAPI.instagram,
  },
] as const;

export const rapidapiProductCount = rapidapiProducts.length;
