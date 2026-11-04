import Link from "next/link";
import { SIGNUP_HREF } from "../../lib/products";
import { ThemeToggle } from "../ui/ThemeToggle";
import styles from "./Nav.module.css";

/** Trailing controls: theme toggle, a ghost link into the catalog, and the one
 *  conversion CTA: sign-in, which creates the account on first use. */
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
      <Link href={SIGNUP_HREF} className={styles.cta} prefetch={false}>
        Get an API key
      </Link>
    </div>
  );
}
