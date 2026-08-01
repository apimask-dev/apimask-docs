import Link from "next/link";
import { RAPIDAPI_PROFILE_URL, liveCategories, liveEndpointCount } from "../../lib/products";
import { CodeTabs } from "../ui/CodeTabs";
import styles from "./Home.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <div>
          <p className={styles.heroBadge}>
            <b>New</b>
            {liveCategories.length} live API categories on RapidAPI
          </p>
          <h1 id="hero-heading">Ship faster with {liveEndpointCount} production-ready APIs.</h1>
          <p className={styles.heroLead}>
            Developer utilities, AI content, email and domain validation, website and SEO checks,
            QR codes, and public social data — all returning clean, predictable JSON. Skip the
            scrapers, the proxy pools, and the weeks of glue code.
          </p>
          <div className={styles.heroActions}>
            <a
              href={RAPIDAPI_PROFILE_URL}
              className={styles.primaryAction}
              target="_blank"
              rel="noreferrer"
            >
              View on RapidAPI
            </a>
            <Link href="/api" className={styles.secondaryAction} prefetch={false}>
              Browse all APIs
            </Link>
          </div>
          {/* ApiMask has no account system of its own; being explicit about that
              up front is the honest equivalent of a "free API key" CTA. */}
          <p className={styles.heroNote}>
            Keys, plans, and billing are handled by RapidAPI — no separate ApiMask account.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <CodeTabs />
        </div>
      </div>
    </section>
  );
}
