import Link from "next/link";
import { SIGNUP_HREF, liveEndpointCount } from "../../lib/products";
import { CodeTabs } from "../ui/CodeTabs";
import styles from "./Home.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <div>
          <p className={styles.heroBadge}>
            <b>Free</b>
            1,000 units a month, no card
          </p>
          <h1 id="hero-heading">Stop fake signups before they reach your database.</h1>
          <p className={styles.heroLead}>
            Email validation that knows 10,000+ disposable domains and catches typos like
            gmail.con, plus {liveEndpointCount - 1} more domain, website, SEO, QR, and developer
            APIs, all returning the same predictable JSON.
          </p>
          <div className={styles.heroActions}>
            <Link href={SIGNUP_HREF} className={styles.primaryAction} prefetch={false}>
              Get a free API key
            </Link>
            <Link href="/api" className={styles.secondaryAction} prefetch={false}>
              Browse all APIs
            </Link>
          </div>
          <p className={styles.heroNote}>
            Sign in with your email to get a key. Paid plans start at $9 a month.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <CodeTabs />
        </div>
      </div>
    </section>
  );
}
