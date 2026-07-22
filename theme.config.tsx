import React from "react";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { Button } from "./components/ui/Button";

const SITE_URL = "https://apimask.dev";
const SITE_NAME = "ApiMask";
const DEFAULT_TITLE = "ApiMask - Published RapidAPI Collections for Developers";
const DEFAULT_DESCRIPTION =
  "ApiMask publishes production-ready RapidAPI collections for developer utilities, SEO website audits, Twitter/X data, Instagram data, AI content, email verification, and website intelligence.";
const OG_IMAGE = `${SITE_URL}/apimask-logo.png`;

// Site-wide structured data. Organization + WebSite (with a SearchAction) help
// search engines understand the brand and can enable a sitelinks search box.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: OG_IMAGE,
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
        content="ApiMask, RapidAPI, Postman collections, developer utilities API, SEO website audit API, Twitter API, Instagram API, AI content API, bulk email verification API, email validation API, DNS analyzer API, SSL checker API, security headers API, QR code API"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#7c3aed" />
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
  // Tint the Nextra docs accent (links, active nav, focus) violet so the docs
  // shell matches the marketing site and blog. Violet ~= hsl(262, 70%, 52%).
  color: {
    hue: 262,
    saturation: 70,
    lightness: { dark: 78, light: 52 },
  },
  logo: (
    <span className="apimask-logo">
      <img src="/apimask-logo.png" alt="" aria-hidden="true" />
      <span>ApiMask</span>
    </span>
  ),
  project: {
    link: "https://github.com/apimask-dev",
  },
  docsRepositoryBase: "https://github.com/apimask-dev/apimask-docs/tree/main",
  navbar: {
    extraContent: (
      <Button href="https://rapidapi.com/user/aftaab" variant="rapidapi" size="sm" external>
        Subscribe on RapidAPI
      </Button>
    ),
  },
  footer: {
    content:
      "ApiMask - developer utility, AI content, email, domain, security, SEO, and website intelligence APIs available through RapidAPI.",
  },
  // `head` is rendered inside a React component, so a function head can use
  // hooks (useConfig/useRouter) to emit per-page SEO. Returning a static node
  // here would replace Nextra's default head and strip every page of its
  // unique title/description/canonical.
  head: useSeoHead,
};

export default config;
