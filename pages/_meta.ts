export default {
  quickstart: "Quickstart",
  authentication: "Authentication",
  pricing: "Pricing",
  errors: "Errors",
  "rate-limits": "Limits on RapidAPI",
  changelog: "Changelog",
  apis: "API Catalog",
  // Blog uses its own layout (not the docs shell). Keep routes, hide from docs nav.
  blog: {
    title: "Blog",
    display: "hidden",
    theme: {
      layout: "raw",
      navbar: false,
      footer: false,
      sidebar: false,
      toc: false,
      pagination: false,
      timestamp: false,
      breadcrumb: false,
    },
  },
};
