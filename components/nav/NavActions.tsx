import Link from "next/link";
import { RAPIDAPI_PROFILE_URL } from "../../lib/products";
import { ThemeToggle } from "../ui/ThemeToggle";
import styles from "./Nav.module.css";

/** Trailing controls: theme toggle, a ghost link into the catalog, and the one
 *  conversion CTA. ApiMask has no signup of its own — RapidAPI owns keys,
 *  plans, and billing — so this is the site's only "get started" action. */
export function NavActions({
  className,
  showThemeToggle = true,
}: {
  className?: string;
  showThemeToggle?: boolean;
}) {
  return (
    <div className={className ? `${styles.actions} ${className}` : styles.actions}>
      {showThemeToggle && <ThemeToggle />}
      <Link href="/api" className={styles.ghostLink} prefetch={false}>
        Browse APIs
      </Link>
      <a href={RAPIDAPI_PROFILE_URL} className={styles.cta} target="_blank" rel="noreferrer">
        View on RapidAPI
      </a>
    </div>
  );
}
