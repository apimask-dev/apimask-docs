import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ui/ThemeToggle";
import { cx } from "./ui/cx";
import styles from "./SiteNav.module.css";

const NAV_ITEMS = [
  { label: "APIs", href: "/api" },
  { label: "Docs", href: "/quickstart" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
] as const;

const RAPIDAPI_URL = "https://rapidapi.com/user/aftaab";

type Variant = "landing" | "blogIndex" | "blogPost";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SiteNav({ variant }: { variant: Variant }) {
  const router = useRouter();
  const pathname = (router.pathname || "/").replace(/^\/apis(\/|$)/, "/api$1");
  const [open, setOpen] = useState(false);

  return (
    <nav className={cx(styles.nav, styles[variant])} aria-label="Main navigation">
      <div className={styles.navRow}>
        <Link href="/" className={styles.brand} aria-label="ApiMask home" prefetch={false}>
          <img className={styles.brandMark} src="/apimask-logo.png" alt="" aria-hidden="true" />
          <span>ApiMask</span>
        </Link>

        <div className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.right}>
          <ThemeToggle />
          <Button href={RAPIDAPI_URL} variant="rapidapi" size="sm" external>
            Subscribe on RapidAPI
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="site-nav-mobile"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div id="site-nav-mobile" className={cx(styles.mobilePanel, open && styles.open)}>
        <div className={styles.mobileLinks}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
