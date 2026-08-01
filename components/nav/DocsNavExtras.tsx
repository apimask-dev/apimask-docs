import { NavActions } from "./NavActions";
import { NavLinks } from "./NavLinks";
import styles from "./DocsNavExtras.module.css";

/**
 * Injected into Nextra's navbar via `navbar.extraContent` (theme.config.tsx),
 * giving docs pages the same links and CTA as SiteNav.
 *
 * Nextra renders its navbar children in a fixed DOM order (logo → page items →
 * search → project link → extraContent → hamburger). `display: contents` on
 * the wrapper dissolves it so these two groups become direct flex children of
 * that row and can be re-ordered individually by
 * styles/nextra-overrides.css — which is what lets the links sit beside the
 * logo instead of at the far right.
 *
 * The theme toggle is suppressed here: nextra-theme-docs already renders one in
 * its sidebar footer, and two toggles on the same page is confusing.
 */
export function DocsNavExtras() {
  return (
    <span className={styles.contents}>
      <NavLinks className={styles.docsLinks} />
      <NavActions className={styles.docsActions} showThemeToggle={false} />
    </span>
  );
}
