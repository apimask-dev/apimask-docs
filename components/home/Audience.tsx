import Link from "next/link";
import { docsHref } from "../../lib/products";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

// Doubles as an internal-linking surface: each column points at one docs page
// and one guide, which is the kind of contextual link that actually helps the
// blog rank rather than sitting in a footer link dump.
const audiences = [
  {
    title: "For developers",
    copy: "Stop rewriting the same utilities in every project. Regex, hashing, IDs, JSON, URL parsing, CORS, and stacktrace analysis behind one key.",
    links: [
      { label: "Developer Utilities API", href: docsHref("developer-utilities") },
      { label: "Guide: CORS errors explained", href: "/blog/cors-errors-explained" },
    ],
  },
  {
    title: "For SaaS and growth teams",
    copy: "Keep junk out of the funnel. Validate emails at signup, clean CRM imports in bulk, and qualify domains before they reach analytics.",
    links: [
      { label: "Email Validation API", href: docsHref("email-validation") },
      { label: "Guide: validate emails before signup", href: "/blog/validate-emails-before-signup" },
    ],
  },
  {
    title: "For SEO and agencies",
    copy: "Turn one-off technical checks into repeatable audits: SSL, security headers, robots.txt, sitemaps, and generated metadata.",
    links: [
      { label: "SEO Meta Tags API", href: docsHref("seo-meta-tags-api") },
      { label: "Guide: website audit checklist", href: "/blog/website-audit-api-checklist" },
    ],
  },
];

export function Audience() {
  return (
    <Section label="Who it's for">
      <SectionHead eyebrow="Use cases" title="Pick the problem you're solving." />
      <div className={styles.audienceGrid}>
        {audiences.map((audience) => (
          <div key={audience.title} className={styles.audience}>
            <h3>{audience.title}</h3>
            <p>{audience.copy}</p>
            <div className={styles.audienceLinks}>
              {audience.links.map((link) => (
                <Link key={link.href} href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
