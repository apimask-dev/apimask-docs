// Single source of truth for product, category, and endpoint data. Consumed by
// the homepage, the /api catalog, the site footer, and their JSON-LD.
//
// Titles and descriptions below are lifted verbatim from each endpoint page's
// frontmatter under pages/apis/, so nothing here is invented, and drift between
// the catalog and the docs is a copy-paste away from being caught. Only routes
// the Go gateway serves (apimask-platform/internal/gateway/catalog.go) belong
// here.

/** Where every "get an API key" call to action points: magic-link sign-in,
 *  which creates the account on first use. */
export const SIGNUP_HREF = "/login";

/** Public API base URL used in every example. */
export const API_BASE_URL = "https://api.apimask.dev";

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

// Category map. Only live groups are listed: the site does not advertise
// roadmap categories, because nothing beyond these is committed
// (apimask-platform/docs/business/roadmap.md). "Soon" stays in the type for a
// future family that has a date.
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
    note: "Disposable and typo detection, bulk lists, MX, SPF, DMARC",
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
  /** Set for routes only the Pro plan includes (the AI endpoints). */
  plan?: "pro";
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
    isCollection: true,
  },
  {
    slug: "email-domain-validation",
    name: "Email, Domain & Website Utilities API",
    description:
      "Email validation, DNS, SSL, URL safety, security headers, robots.txt, sitemap, and CORS checks in one product.",
    category: "email-domain",
    isCollection: true,
  },
  {
    slug: "seo-website-audit",
    name: "SEO Website Audit API",
    description:
      "Site audit, SEO meta tags, sitemap, robots.txt, SSL, DNS, security headers, URL safety, and CORS checks in one product.",
    category: "seo",
    isCollection: true,
  },

  // --- Email & domain ---
  {
    slug: "email-validation",
    name: "Email Validation API",
    description:
      "Validate signup emails. Checks syntax, MX records, 10,000+ disposable domains including subdomains, role accounts, and suggests corrections for typos like gmail.con.",
    category: "email-domain",
  },
  {
    slug: "bulk-email-verification",
    name: "Bulk Email Verification API",
    description:
      "Validate email lists, upload CSVs, detect disposable addresses and role accounts, and check MX, SPF, and DMARC records.",
    category: "email-domain",
  },
  {
    slug: "dns-analyzer",
    name: "DNS Analyzer API",
    description: "Analyze A, AAAA, MX, TXT, NS, CNAME, SPF, and DMARC records for a domain.",
    category: "email-domain",
  },

  // --- Website & security ---
  {
    slug: "ssl-checker",
    name: "SSL Certificate Checker API",
    description:
      "Check SSL certificates for validity, issuer, subject, SANs, expiration dates, and days remaining.",
    category: "website-security",
  },
  {
    slug: "security-headers-analyzer",
    name: "Security Headers Analyzer API",
    description:
      "Analyze website security headers, score header coverage, and get missing header recommendations.",
    category: "website-security",
  },
  {
    slug: "url-safety-checker",
    name: "URL Safety Checker API",
    description:
      "Check URL redirects, final URL, homograph risk, status code, threat indicators, and safety status.",
    category: "website-security",
  },
  {
    slug: "cors-checker",
    name: "CORS Checker API",
    description:
      "Check CORS response headers, allowed origins, credentials, methods, exposed headers, and risk level.",
    category: "website-security",
  },

  // --- SEO ---
  {
    slug: "seo-site-audit",
    name: "SEO Site Audit API",
    description:
      "Run one combined website audit covering URL safety, security headers, robots.txt, sitemap, CORS, SSL, DNS, and SEO meta tags.",
    category: "seo",
  },
  {
    slug: "seo-meta-tags-api",
    name: "SEO Meta Tags API",
    description:
      "Generate SEO titles, meta descriptions, and keyword sets from page content with a single JSON endpoint.",
    category: "seo",
    plan: "pro",
  },
  {
    slug: "robots-txt-analyzer",
    name: "Robots.txt Analyzer API",
    description: "Analyze robots.txt status, directives, sitemap URLs, user agents, and warnings.",
    category: "seo",
  },
  {
    slug: "sitemap-validator",
    name: "Sitemap Validator API",
    description: "Validate XML sitemaps, sitemap indexes, status codes, URL counts, and warnings.",
    category: "seo",
  },

  // --- QR codes ---
  {
    slug: "qr-code-generator-api",
    name: "QR Code Generator API",
    description:
      "Generate QR codes as PNG or SVG for URLs, text, WiFi, vCards, email links, and SMS, with branded colors.",
    category: "qr-codes",
  },
  {
    slug: "qr-code-api-with-logo",
    name: "QR Code API with Logo",
    description:
      "Generate branded QR codes with a centered logo overlay, custom colors, sizing, and error correction.",
    category: "qr-codes",
  },
  {
    slug: "wifi-qr-code-api",
    name: "WiFi QR Code API",
    description:
      "Generate scannable WiFi QR codes for guest networks, venues, offices, events, and customer onboarding.",
    category: "qr-codes",
  },

  // --- AI content ---
  {
    slug: "ai-content-generator-api",
    name: "AI Content Generator API",
    description:
      "Generate summaries, rewrites, SEO meta tags, blog outlines, product descriptions, social captions, headlines, and FAQs.",
    category: "ai-content",
    plan: "pro",
  },

  // --- Developer utilities ---
  {
    slug: "regex-generator",
    name: "Regex Generator API",
    description:
      "Generate regular expressions from plain English descriptions, with explanations and test cases.",
    category: "developer-utilities",
    plan: "pro",
  },
  {
    slug: "regex-explainer",
    name: "Regex Explainer API",
    description: "Explain regular expressions in plain English with token-by-token breakdowns.",
    category: "developer-utilities",
    plan: "pro",
  },
  {
    slug: "stacktrace-analyzer",
    name: "Stacktrace Analyzer API",
    description:
      "Analyze stacktraces, identify root causes, suggest fixes, and return relevant documentation links.",
    category: "developer-utilities",
    plan: "pro",
  },
  {
    slug: "readme-generator",
    name: "README Generator API",
    description: "Generate professional README.md content from repository metadata.",
    category: "developer-utilities",
    plan: "pro",
  },
  {
    slug: "changelog-generator",
    name: "Changelog Generator API",
    description: "Generate categorized changelogs from raw git logs or diffs.",
    category: "developer-utilities",
    plan: "pro",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter API",
    description: "Validate, format, minify, and optionally sort JSON.",
    category: "developer-utilities",
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encode and Decode API",
    description:
      "Encode UTF-8 text as Base64 or decode it back, with optional URL-safe alphabet support.",
    category: "developer-utilities",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator API",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512, and BLAKE2 hashes for strings.",
    category: "developer-utilities",
  },
  {
    slug: "id-generator",
    name: "UUID and ULID Generator API",
    description: "Generate UUIDv4, UUIDv1, or ULID-compatible identifiers.",
    category: "developer-utilities",
  },
  {
    slug: "url-parser",
    name: "URL Parser API",
    description:
      "Parse URLs into scheme, host, port, path, query parameters, fragment, and normalized URL.",
    category: "developer-utilities",
  },
];

/** Public docs URL for an endpoint. Pages live under /apis/** but are served at
 *  /api/** (see the rewrite in next.config.js). */
export function docsHref(slug: string): string {
  return `/api/${slug}`;
}

/** Endpoint pages, not counting the collection hubs that only link to them. */
export const liveEndpointCount = endpoints.filter((e) => !e.isCollection).length;

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
/* API families                                                                */
/* -------------------------------------------------------------------------- */

/** API families, as shown on the homepage, in the order we lead with. One
 *  ApiMask key covers every family the plan includes; these are groupings for
 *  reading, not separate subscriptions.
 *
 *  `count` is the number of gateway routes in the family, which is not the same
 *  as the number of docs pages under pages/apis/: several routes share a page,
 *  and a few appear in more than one family. Verify against
 *  apimask-platform/internal/gateway/catalog.go when a family gains a route. */
export const productFamilies = [
  {
    icon: "MX",
    count: 8,
    title: "Email & Domain Validation API",
    copy: "Validate signup emails against 10,000+ disposable domains, suggest fixes for typos like gmail.con, and check DNS, SSL, URL safety, security headers, robots.txt, sitemaps, and CORS.",
    tags: ["Disposable", "Typos", "MX", "DMARC"],
    docs: docsHref("email-domain-validation"),
    plan: "free",
  },
  {
    icon: "@",
    count: 5,
    title: "Bulk Email Verification API",
    copy: "Validate JSON batches and CSV uploads of up to 500 addresses, flag disposable and role-account emails, and check MX, SPF, and DMARC readiness.",
    tags: ["CSV", "MX", "SPF", "DMARC"],
    docs: docsHref("bulk-email-verification"),
    plan: "free",
  },
  {
    icon: "SEO",
    count: 9,
    title: "SEO Website Audit API",
    copy: "Run one combined website audit, validate sitemaps and robots.txt, and check SSL, DNS, security headers, URL safety, and CORS.",
    tags: ["Audit", "Sitemap", "Robots", "SSL"],
    docs: docsHref("seo-website-audit"),
    plan: "free",
  },
  {
    icon: "{}",
    count: 12,
    title: "Developer Utilities API",
    copy: "JSON, Base64, hashing, IDs, and URL parsing on every plan; regex generation and explanation, stacktrace analysis, and README and changelog generation on Pro.",
    tags: ["JSON", "Hash", "UUID", "Regex"],
    docs: docsHref("developer-utilities"),
    plan: "free",
  },
  {
    icon: "QR",
    count: 6,
    title: "QR Code Generator API",
    copy: "PNG/SVG QR codes for URLs, WiFi, vCards, email, and SMS, with branded colors and optional logo overlay.",
    tags: ["Logo", "WiFi", "vCard", "SVG"],
    docs: docsHref("qr-code-generator-api"),
    plan: "free",
  },
  {
    icon: "AI",
    count: 8,
    title: "AI Content Generator API",
    copy: "Summaries, rewrites, SEO meta tags, blog outlines, product descriptions, social captions, headlines, and FAQs.",
    tags: ["SEO", "Rewrite", "Captions", "FAQ"],
    docs: docsHref("ai-content-generator-api"),
    plan: "pro",
  },
] as const;

export const productFamilyCount = productFamilies.length;
