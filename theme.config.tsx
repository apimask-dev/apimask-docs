import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>ApiMask</span>,
  project: {
    link: "https://github.com/apimask-dev",
  },
  docsRepositoryBase: "https://github.com/apimask-dev/apimask-docs/tree/main",
  footer: {
    content: "ApiMask — Production-ready APIs for developers and AI applications.",
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ApiMask Documentation" />
      <meta
        property="og:description"
        content="Production-ready APIs for developers, startups, and AI-powered applications."
      />
    </>
  ),
};

export default config;
