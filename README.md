# apimask-docs

Public documentation site for [ApiMask](https://apimask.dev) — quickstart guides,
authentication, error and rate-limit references, pricing, changelog, and full API
reference.

> **Status:** Phase 0 — scaffolding. API reference pages are placeholders.

## Stack

- **Framework:** Next.js 14 (App Router compatible)
- **Docs engine:** Nextra + nextra-theme-docs
- **Hosting:** Vercel

## Development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

## Structure

```
pages/            # MDX content
  index.mdx       # Overview
  quickstart.mdx  # Getting started
  authentication.mdx
  errors.mdx
  rate-limits.mdx
  pricing.mdx
  changelog.mdx
  api/            # Per-category endpoint reference
theme.config.tsx  # Nextra theme config
next.config.js
```

## License

MIT © 2026 ApiMask
