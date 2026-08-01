import React from "react";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { DocsNavExtras } from "./components/nav/DocsNavExtras";
import { SiteFooter } from "./components/SiteFooter";

const SITE_URL = "https://apimask.dev";
const SITE_NAME = "ApiMask";
const DEFAULT_TITLE = "ApiMask - Developer, AI, Email, Domain & Website APIs";
const DEFAULT_DESCRIPTION =
  "ApiMask is a growing platform of production-ready APIs: developer utilities, AI content, bulk email verification, domain validation, SEO, security, and website intelligence. Available through RapidAPI with clean JSON responses and copy-paste examples.";
// A 1200x630 card, the ratio Open Graph and Twitter crop to. Previously this
// pointed at the 200px logo file, which social clients letterboxed on a
// background of their own choosing.
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const LOGO = `${SITE_URL}/apimask-logo.png`;

// Site-wide structured data. Organization + WebSite (with a SearchAction) help
// search engines understand the brand and can enable a sitelinks search box.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO,
  description: DEFAULT_DESCRIPTION,
  sameAs: ["https://rapidapi.com/user/aftaab", "https://github.com/apimask-dev"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/api?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

function useSeoHead() {
  const router = useRouter();
  const { frontMatter, title: pageTitle } = useConfig();

  // Canonical URL is the live path, minus query/hash. Pages live under /apis/**
  // but the public URL is /api/** (the /apis/* form 301-redirects to it), so we
  // normalize to /api/** to avoid pointing canonicals at a redirect.
  const rawPath = (router.asPath || "/").split("?")[0].split("#")[0];
  const path = rawPath.replace(/^\/apis(\/|$)/, "/api$1");
  const cleanPath = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const canonical =
    (frontMatter.canonical as string) ||
    (cleanPath === "/" ? SITE_URL : `${SITE_URL}${cleanPath}`);

  // Per-page title from frontmatter, with the brand as a suffix. Fall back to
  // the site default only when a page provides no title at all.
  const title = pageTitle ? `${pageTitle} - ${SITE_NAME}` : DEFAULT_TITLE;
  const description = (frontMatter.description as string) || DEFAULT_DESCRIPTION;
  const image = (frontMatter.image as string) || OG_IMAGE;

  return (
    <>
      {/* Per-page SEO (restores what Nextra's default head provides) */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      {/* Only the shared card has known dimensions; a page that supplies its
          own image in frontmatter would make these a lie. */}
      {image === OG_IMAGE && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta property="og:image:alt" content="ApiMask logo" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Global, page-independent tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow" />
      <meta
        name="keywords"
        content="ApiMask, RapidAPI, developer utilities API, AI content API, bulk email verification API, email validation API, domain analysis API, DNS analyzer API, SSL checker API, security headers API, SEO meta tags API, QR code API, JSON formatter API"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#6c47ff" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
    </>
  );
}

const config: DocsThemeConfig = {
  logo: (
    <span className="apimask-logo">
      <span className="apimask-logo-mark" aria-hidden="true">
        <img src="/logo.png" alt="" width={24} height={24} />
      </span>
      <span>ApiMask</span>
    </span>
  ),
  project: {
    link: "https://github.com/apimask-dev",
  },
  docsRepositoryBase: "https://github.com/apimask-dev/apimask-docs/tree/main",
  // Nextra's navbar is kept (its hamburger owns the mobile sidebar) but is
  // re-dressed to match SiteNav: the shared links and CTA come in here, and
  // styles/nextra-overrides.css reorders the row so they sit beside the logo.
  navbar: {
    extraContent: <DocsNavExtras />,
  },
  // Same footer as the marketing pages, so every route ends identically.
  footer: {
    content: <SiteFooter />,
  },
  // The docs content column opts into the shared article typography, which is
  // what makes a docs page and a blog post read as the same site.
  main: ({ children }) => <div className="prose">{children}</div>,
  // `head` is rendered inside a React component, so a function head can use
  // hooks (useConfig/useRouter) to emit per-page SEO. Returning a static node
  // here would replace Nextra's default head and strip every page of its
  // unique title/description/canonical.
  head: useSeoHead,
};

export default config;
