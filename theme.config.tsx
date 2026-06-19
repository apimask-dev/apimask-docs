import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>ApiMask</span>,
  project: {
    link: "https://github.com/apimask-dev",
  },
  docsRepositoryBase: "https://github.com/apimask-dev/apimask-docs/tree/main",
  footer: {
    content:
      "ApiMask — Developer, email, domain, and website utility APIs available through RapidAPI.",
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="ApiMask provides production-ready developer utility, email validation, domain analysis, and website audit APIs through RapidAPI."
      />
      <meta property="og:title" content="ApiMask API Documentation" />
      <meta
        property="og:description"
        content="Developer utility, email validation, domain analysis, and website audit APIs with detailed docs and RapidAPI examples."
      />
      <meta property="og:url" content="https://apimask.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ApiMask" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  ),
};

export default config;
