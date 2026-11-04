import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SIGNUP_HREF } from "../lib/products";
import { NavActions } from "./nav/NavActions";
import { NavLinks } from "./nav/NavLinks";
import { NAV_ITEMS, isActive } from "./nav/nav-config";
import styles from "./SiteNav.module.css";

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

/**
 * Header for the pages that sit outside the Nextra shell (home and blog).
 * Docs pages get the same links and actions through DocsNavExtras, which
 * injects the shared NavLinks/NavActions into Nextra's own navbar — replacing
 * that navbar outright would drop the hamburger that opens the mobile sidebar,
 * since the menu context it needs isn't exported by Nextra.
 */
export function SiteNav() {
  const router = useRouter();
  const pathname = router.pathname || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar is transparent-bordered at the top of the page and gains a hairline
  // once content passes underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on navigation, otherwise it stays open over the new
  // page (the route changes without this component unmounting).
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.navRow} aria-label="Main navigation">
        <div className={styles.left}>
          <Link href="/" className="apimask-logo" aria-label="ApiMask home" prefetch={false}>
            <span className="apimask-logo-mark" aria-hidden="true">
              <img src="/logo.png" alt="" width={24} height={24} />
            </span>
            <span>ApiMask</span>
          </Link>
          <NavLinks />
        </div>

        <div className={styles.right}>
          <NavActions />
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
      </nav>

      <div id="site-nav-mobile" className={styles.mobilePanel} hidden={!open}>
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
        <Link
          href={SIGNUP_HREF}
          className={styles.mobileCta}
          prefetch={false}
          onClick={() => setOpen(false)}
        >
          Get an API key
        </Link>
      </div>
    </header>
  );
}
