import Link from "next/link";
import styles from "./SiteFooter.module.css";

const RAPIDAPI_URL = "https://rapidapi.com/user/aftaab";
const GITHUB_URL = "https://github.com/apimask-dev";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "APIs", href: "/api" },
      { label: "Pricing", href: "/pricing" },
      { label: "Quickstart", href: "/quickstart" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Authentication", href: "/authentication" },
      { label: "Rate limits", href: "/rate-limits" },
      { label: "Errors", href: "/errors" },
      { label: "Blog", href: "/blog" },
    ],
  },
] as const;

const EXTERNAL = [
  { label: "RapidAPI", href: RAPIDAPI_URL },
  { label: "GitHub", href: GITHUB_URL },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand} aria-label="ApiMask home" prefetch={false}>
            <img className={styles.brandMark} src="/apimask-logo.png" alt="" aria-hidden="true" />
            <span>ApiMask</span>
          </Link>
          <p className={styles.tagline}>
            Import-ready RapidAPI collections for developer utilities, SEO, security, and social
            data. RapidAPI handles keys, billing, and quotas — we ship fast, focused endpoints.
          </p>
        </div>

        <nav className={styles.linkCols} aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.heading} className={styles.col}>
              <p className={styles.colHeading}>{col.heading}</p>
              {col.links.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className={styles.col}>
            <p className={styles.colHeading}>Elsewhere</p>
            {EXTERNAL.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} ApiMask</span>
        <span>Available through RapidAPI</span>
      </div>
    </footer>
  );
}
