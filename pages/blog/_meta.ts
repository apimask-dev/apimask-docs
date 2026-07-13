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

// Note: blog/index.tsx is a custom page (not MDX) and must not be listed here —
// Nextra only maps markdown pages into _meta keys.
export default {
  "validate-emails-before-signup": {
    title: "Validate Emails Before Signup",
    theme: rawBlogTheme,
  },
  "mx-spf-dkim-dmarc-explained": {
    title: "MX, SPF, DKIM, and DMARC",
    theme: rawBlogTheme,
  },
  "check-website-security-headers": {
    title: "Website Security Headers",
    theme: rawBlogTheme,
  },
  "cors-errors-explained": {
    title: "CORS Errors Explained",
    theme: rawBlogTheme,
  },
  "generate-qr-codes-with-logo-api": {
    title: "QR Codes With Logo API",
    theme: rawBlogTheme,
  },
  "website-audit-api-checklist": {
    title: "Website Audit API Checklist",
    theme: rawBlogTheme,
  },
};
