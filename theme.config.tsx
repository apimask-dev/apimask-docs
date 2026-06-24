import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
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
      <a
        href="https://rapidapi.com/search/ApiMask"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          borderRadius: "7px",
          background: "#11140f",
          color: "#ffffff",
          padding: "7px 13px",
          fontSize: "13px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Subscribe on RapidAPI
      </a>
    ),
  },
  footer: {
    content:
      "ApiMask — Developer, email, domain, and website utility APIs available through RapidAPI.",
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#32126a" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <meta name="application-name" content="ApiMask" />
      <meta name="apple-mobile-web-app-title" content="ApiMask" />
      <meta name="robots" content="index,follow" />
      <meta
        name="keywords"
        content="ApiMask, RapidAPI, developer utilities API, email validation API, DNS analyzer API, SSL checker API, security headers API, JSON formatter API"
      />
      <meta
        name="description"
        content="ApiMask provides production-ready developer utility, email validation, domain analysis, and website audit APIs through RapidAPI."
      />
      <link rel="canonical" href="https://apimask.dev" />
      <meta property="og:title" content="ApiMask API Documentation" />
      <meta
        property="og:description"
        content="Developer utility, email validation, domain analysis, and website audit APIs with detailed docs and RapidAPI examples."
      />
      <meta property="og:url" content="https://apimask.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ApiMask" />
      <meta property="og:image" content="https://apimask.dev/apimask-logo.png" />
      <meta property="og:image:alt" content="ApiMask logo" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ApiMask API Documentation" />
      <meta
        name="twitter:description"
        content="Developer utility, email validation, domain analysis, and website audit APIs with detailed docs and RapidAPI examples."
      />
      <meta name="twitter:image" content="https://apimask.dev/apimask-logo.png" />
    </>
  ),
};

export default config;
