export type BlogPost = {
  title: string;
  href: string;
  slug: string;
  category: string;
  description: string;
  readTime: string;
  api: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "How to Validate Emails Before Users Sign Up",
    href: "/blog/validate-emails-before-signup",
    slug: "validate-emails-before-signup",
    category: "Email Validation",
    description:
      "Protect signup flows from fake accounts, disposable inboxes, bounces, and low-quality lead data before the problem reaches your database.",
    readTime: "10 min read",
    api: "/api/email-validation",
  },
  {
    title: "MX, SPF, DKIM, and DMARC Explained for Developers",
    href: "/blog/mx-spf-dkim-dmarc-explained",
    slug: "mx-spf-dkim-dmarc-explained",
    category: "Domain Intelligence",
    description:
      "Understand the records behind email delivery, domain trust, sender authentication, and onboarding checks without becoming a DNS specialist.",
    readTime: "9 min read",
    api: "/api/dns-analyzer",
  },
  {
    title: "How to Check If a Website Has Proper Security Headers",
    href: "/blog/check-website-security-headers",
    slug: "check-website-security-headers",
    category: "Website Security",
    description:
      "Learn which headers matter first, what they protect, and how to turn security header checks into repeatable website audits.",
    readTime: "9 min read",
    api: "/api/security-headers-analyzer",
  },
  {
    title: "CORS Explained: Common Errors and How to Debug Them",
    href: "/blog/cors-errors-explained",
    slug: "cors-errors-explained",
    category: "API Debugging",
    description:
      "Decode origins, preflight requests, credential rules, and the browser errors that make otherwise working APIs look broken.",
    readTime: "9 min read",
    api: "/api/cors-checker",
  },
  {
    title: "How to Generate QR Codes with Logos Using an API",
    href: "/blog/generate-qr-codes-with-logo-api",
    slug: "generate-qr-codes-with-logo-api",
    category: "QR Code APIs",
    description:
      "Build branded QR generation into apps, events, packaging, WiFi flows, campaigns, and internal tools without manual QR exports.",
    readTime: "8 min read",
    api: "/api/qr-code-generator-api",
  },
  {
    title: "Website Audit API Checklist for SEO, Security, and Technical Health",
    href: "/blog/website-audit-api-checklist",
    slug: "website-audit-api-checklist",
    category: "SEO Automation",
    description:
      "Combine SSL, DNS, security headers, CORS, robots.txt, sitemaps, URL safety, and metadata checks into a real audit product.",
    readTime: "11 min read",
    api: "/api/ssl-checker",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev?: BlogPost;
  next?: BlogPost;
} {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? blogPosts[index - 1] : undefined,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined,
  };
}
