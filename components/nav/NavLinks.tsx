import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_ITEMS, isActive } from "./nav-config";
import styles from "./Nav.module.css";

/** The primary link row. Rendered immediately after the brand mark in both
 *  headers, so navigation reads left-to-right from the logo rather than
 *  floating in the middle of the bar. */
export function NavLinks({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = router.pathname || "/";

  return (
    <div className={className ? `${styles.links} ${className}` : styles.links}>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={styles.link}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          prefetch={false}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
