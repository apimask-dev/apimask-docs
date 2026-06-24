import type { GetServerSideProps } from "next";

const routes = [
  "",
  "quickstart",
  "authentication",
  "pricing",
  "errors",
  "rate-limits",
  "changelog",
  "api",
  "api/developer-utilities",
  "api/qr-code-generator-api",
  "api/qr-code-api-with-logo",
  "api/wifi-qr-code-api",
  "api/ai-content-generator-api",
  "api/seo-meta-tags-api",
  "api/email-domain-validation",
  "api/email-validation",
  "api/regex-generator",
  "api/regex-explainer",
  "api/stacktrace-analyzer",
  "api/readme-generator",
  "api/changelog-generator",
  "api/json-formatter",
  "api/base64-encoder-decoder",
  "api/hash-generator",
  "api/id-generator",
  "api/url-parser",
  "api/ssl-checker",
  "api/dns-analyzer",
  "api/url-safety-checker",
  "api/security-headers-analyzer",
  "api/robots-txt-analyzer",
  "api/sitemap-validator",
  "api/cors-checker",
];

function generateSitemap() {
  const baseUrl = "https://apimask.dev";
  const lastmod = new Date().toISOString();
  const urls = routes
    .map((route) => {
      const loc = route ? `${baseUrl}/${route}` : baseUrl;
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap());
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
