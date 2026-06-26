import fs from "fs";
import path from "path";
import type { GetServerSideProps } from "next";

const BASE_URL = "https://apimask.dev";

// Stable per-deploy timestamp. Generating `new Date()` on every request makes
// every page look like it changes constantly, which is a weak crawl signal.
// Captured once at module load so all URLs share one deploy-time lastmod.
const LASTMOD = new Date().toISOString();

// Top-level docs routes (file -> url). The API pages are discovered from the
// filesystem below so the sitemap never drifts from the actual pages.
const TOP_LEVEL = [
  "",
  "quickstart",
  "authentication",
  "pricing",
  "errors",
  "rate-limits",
  "changelog",
];

type SitemapEntry = { loc: string; priority: number; changefreq: string };

function discoverApiRoutes(): string[] {
  // Pages live under pages/apis/** but are served at /api/** via rewrites.
  const apisDir = path.join(process.cwd(), "pages", "apis");
  const routes: string[] = ["api"];

  const walk = (dir: string, prefix: string) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith("_")) continue; // skip _meta.ts etc.
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // A directory maps to /api/<dir> via its index page.
        routes.push(`api/${prefix}${entry.name}`);
        walk(full, `${prefix}${entry.name}/`);
      } else if (/\.mdx?$/.test(entry.name) && entry.name !== "index.mdx") {
        const slug = entry.name.replace(/\.mdx?$/, "");
        routes.push(`api/${prefix}${slug}`);
      }
    }
  };

  walk(apisDir, "");
  return Array.from(new Set(routes));
}

function entryFor(route: string): SitemapEntry {
  const loc = route ? `${BASE_URL}/${route}` : BASE_URL;
  if (route === "") return { loc, priority: 1.0, changefreq: "weekly" };
  if (route === "api") return { loc, priority: 0.9, changefreq: "weekly" };
  if (route.startsWith("api/")) return { loc, priority: 0.8, changefreq: "weekly" };
  if (route === "quickstart" || route === "pricing")
    return { loc, priority: 0.7, changefreq: "monthly" };
  return { loc, priority: 0.6, changefreq: "monthly" };
}

function generateSitemap(): string {
  const routes = [...TOP_LEVEL, ...discoverApiRoutes()];
  const urls = routes
    .map((route) => {
      const { loc, priority, changefreq } = entryFor(route);
      return `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority.toFixed(1)}</priority></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate");
  res.write(generateSitemap());
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
