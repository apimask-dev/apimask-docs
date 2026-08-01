import Link from "next/link";
import { RAPIDAPI_PROFILE_URL, docsHref, liveCategories } from "../lib/products";
import styles from "./SiteFooter.module.css";

const GITHUB_URL = "https://github.com/apimask-dev";

// One representative endpoint per live category, so the footer's category
// column links somewhere real instead of to an anchor.
const CATEGORY_ENTRY: Record<string, string> = {
  "developer-utilities": "developer-utilities",
  "ai-content": "ai-content-generator-api",
  "email-domain": "email-validation",
  "website-security": "ssl-checker",
  "qr-codes": "qr-code-generator-api",
  seo: "seo-website-audit",
  "social-app": "instagram",
};

const gettingStarted = [
  { label: "Quickstart", href: "/quickstart" },
  { label: "Authentication", href: "/authentication" },
  { label: "Pricing", href: "/pricing" },
  { label: "Rate limits", href: "/rate-limits" },
  { label: "Errors", href: "/errors" },
];

const company = [
  { label: "API catalog", href: "/api" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
];

/** Shared footer. Rendered on the marketing pages directly and on docs pages
 *  through Nextra's `footer.component`, so every route on the site ends the
 *  same way. Previously docs ended with a one-line string and the marketing
 *  pages had no footer at all. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <span className="apimask-logo">
            <span className="apimask-logo-mark" aria-hidden="true">
              <img src="/logo.png" alt="" width={24} height={24} />
            </span>
            <span>ApiMask</span>
          </span>
          <p className={styles.blurb}>
            Production-ready REST APIs for developer utilities, AI content, email and domain
            validation, website and SEO checks, QR codes, and public social data. Distributed
            through RapidAPI.
          </p>
          <div className={styles.social}>
            <a href={RAPIDAPI_PROFILE_URL} target="_blank" rel="noreferrer">
              RapidAPI
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <nav className={styles.linkCol} aria-label="Getting started">
          <h2>Getting started</h2>
          {gettingStarted.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className={styles.linkCol} aria-label="API categories">
          <h2>API categories</h2>
          {liveCategories.map((category) => (
            <Link
              key={category.slug}
              href={docsHref(CATEGORY_ENTRY[category.slug] ?? "")}
              prefetch={false}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <nav className={styles.linkCol} aria-label="Company">
          <h2>Company</h2>
          {company.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} ApiMask. All rights reserved.</p>
        <p>Keys, plans, and billing are handled by RapidAPI.</p>
      </div>
    </footer>
  );
}
