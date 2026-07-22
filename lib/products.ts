// Single source of truth for product/category data shown on the homepage
// (and consumed by its JSON-LD ItemList). Replaces the old duplicated
// `popularApis` + `productGroups` arrays that listed overlapping products
// with inconsistent shapes (some linkable, some not).

// Published RapidAPI marketplace listings (live on https://rapidapi.com/user/aftaab).
// Counts/tags/links are curated from each product's docs and OpenAPI surface.
export const flagshipProducts = [
  {
    icon: "IG",
    count: 9,
    title: "Instagram API Collection",
    copy: "Profiles, posts, reels, comments, hashtag search, and AI insights in normalized JSON.",
    tags: ["Profiles", "Reels", "Hashtags", "AI"],
    docs: "/api/instagram",
    rapidapi: "https://rapidapi.com/aftaab/api/instagram-api",
  },
  {
    icon: "X",
    count: 10,
    title: "Twitter/X Data API",
    copy: "Profiles, tweets, search, replies, threads, and deterministic social intelligence endpoints.",
    tags: ["Search", "Threads", "Insights", "Mentions"],
    docs: "/api/twitter",
    rapidapi: "https://rapidapi.com/aftaab/api/twitter-x-api",
  },
  {
    icon: "in",
    count: 5,
    title: "LinkedIn API Collection",
    copy: "Profile and company lookup, employee search, people search, and LinkedIn jobs search.",
    tags: ["Profiles", "Companies", "Jobs", "Search"],
    docs: "/api/linkedin",
    rapidapi: "https://rapidapi.com/aftaab/api/linkedin-api",
  },
  {
    icon: "SEO",
    count: 9,
    title: "SEO Website Audit API",
    copy: "Full site audits plus sitemap, robots.txt, SSL, DNS, security headers, CORS, and meta tags.",
    tags: ["Audit", "Sitemap", "SSL", "Headers"],
    docs: "/api/email-domain-validation",
    rapidapi: "https://rapidapi.com/aftaab/api/seo-website-audit-api",
  },
  {
    icon: "QR",
    count: 6,
    title: "QR Code Generator API with Logo",
    copy: "PNG/SVG QR codes for URLs, WiFi, vCards, email, and SMS, with branded colors and optional logo overlay.",
    tags: ["Logo", "WiFi", "vCard", "SVG"],
    docs: "/api/qr-code-generator-api",
    rapidapi: "https://rapidapi.com/aftaab/api/qr-code-generator-api-with-logo",
  },
  {
    icon: "AI",
    count: 8,
    title: "AI Content Generator API",
    copy: "Summaries, rewrites, SEO meta tags, blog outlines, product descriptions, social captions, headlines, and FAQs.",
    tags: ["SEO", "Rewrite", "Captions", "FAQ"],
    docs: "/api/ai-content-generator-api",
    rapidapi: "https://rapidapi.com/aftaab/api/ai-content-generator-api",
  },
  {
    icon: "@",
    count: 5,
    title: "Bulk Email Verification API",
    copy: "Validate JSON batches and CSV uploads, flag disposable and role-account emails, and check MX, SPF, and DMARC readiness.",
    tags: ["CSV", "MX", "SPF", "DMARC"],
    docs: "/api/bulk-email-verification",
    rapidapi: "https://rapidapi.com/aftaab/api/bulk-email-verification-api",
  },
  {
    icon: "DNS",
    count: 8,
    title: "Email & Domain Validation API",
    copy: "Email validation, DNS, SSL, URL safety, security headers, robots.txt, sitemaps, and CORS checks.",
    tags: ["Email", "DNS", "SSL", "CORS"],
    docs: "/api/email-domain-validation",
    rapidapi: "https://rapidapi.com/aftaab/api/email-domain-validation-api",
  },
  {
    icon: "DEV",
    count: 12,
    title: "ApiMask Developer Utilities API",
    copy: "Regex, stacktrace analysis, README/changelog generation, JSON, Base64, hashing, IDs, and URL parsing.",
    tags: ["Regex", "JSON", "Hash", "IDs"],
    docs: "/api/developer-utilities",
    rapidapi: "https://rapidapi.com/aftaab/api/apimask-developer-utilities-api",
  },
] as const;

// Quick tools: real, documented endpoints that don't have their own
// standalone RapidAPI listing (they're reached via the general ApiMask
// RapidAPI profile instead), so no rapidapi link is fabricated here —
// only a real docs link, sourced from pages/apis/_meta.ts.
export const quickTools = [
  {
    title: "Email Validation",
    copy: "Verify syntax, MX records, disposable domains, and role accounts.",
    docs: "/api/email-validation",
  },
  {
    title: "Regex Generator",
    copy: "Turn plain English descriptions into usable regular expressions, with a companion explainer endpoint.",
    docs: "/api/regex-generator",
  },
  {
    title: "DNS Analyzer",
    copy: "Inspect A, AAAA, MX, TXT, NS, CNAME, SPF, and DMARC records — part of the wider SSL and security-header toolset.",
    docs: "/api/dns-analyzer",
  },
] as const;

// Forward-looking category map. "Live" groups are shippable today; the rest
// are on the public roadmap as ApiMask expands across categories. Kept
// honest with explicit status so we capture category search intent without
// overpromising.
export const categories = [
  { name: "Developer utilities", status: "Live", note: "Regex, JSON, Base64, hashing, IDs, URL parsing" },
  { name: "AI content", status: "Live", note: "SEO meta tags, summaries, rewrites, descriptions" },
  { name: "Email & domain", status: "Live", note: "Validation, bulk lists, MX/DNS, deliverability" },
  { name: "Website & security", status: "Live", note: "SSL, security headers, robots.txt, sitemap, CORS" },
  { name: "QR codes", status: "Live", note: "URL, WiFi, vCard, branded logo QR codes" },
  { name: "SEO", status: "Live", note: "Meta tags, site audits, structured data checks" },
  { name: "Social & app intelligence", status: "Live", note: "Twitter/X, Instagram, and LinkedIn profile and content data" },
  { name: "OCR & PDF", status: "Soon", note: "PDF-to-Markdown, table & field extraction, OCR cleanup" },
  { name: "Resume & ATS", status: "Soon", note: "ATS scoring, keyword gaps, resume rewrite" },
  { name: "App Store / ASO", status: "Soon", note: "Metadata, keywords, release notes, review sentiment" },
  { name: "Data enrichment", status: "Soon", note: "Company, email, and domain enrichment" },
  { name: "Security & threat intel", status: "Soon", note: "URL safety, breach checks, header hardening" },
  { name: "AI agents & workflows", status: "Soon", note: "Tool endpoints and structured extraction for agents" },
] as const;

// Real count of documented, live endpoint pages in pages/apis/_meta.ts,
// excluding the catalog index itself and the roadmap-only groupings
// (resume, appstore, pdf, ocr, content). Update this alongside _meta.ts
// rather than letting the two drift, as they had before this file existed.
export const liveEndpointCount = 28;

// Live RapidAPI marketplace listings shown on the homepage product grid.
export const publishedCollectionCount = flagshipProducts.length;

export const liveCategoryCount = categories.filter((c) => c.status === "Live").length;
