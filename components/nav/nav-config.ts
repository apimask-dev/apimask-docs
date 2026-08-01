// One definition of the site's primary navigation, shared by SiteNav (marketing
// pages) and DocsNavExtras (injected into Nextra's navbar). Previously the two
// headers had unrelated link sets, which is part of why docs felt like a
// different site.

export const NAV_ITEMS = [
  { label: "APIs", href: "/api" },
  { label: "Docs", href: "/quickstart" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
] as const;

/** Docs pages live under /apis/** but are served at /api/** (see the rewrite in
 *  next.config.js), so the router pathname must be normalised before it can be
 *  compared against the hrefs above. */
export function normalizePath(pathname: string): string {
  return (pathname || "/").replace(/^\/apis(\/|$)/, "/api$1");
}

export function isActive(pathname: string, href: string): boolean {
  const path = normalizePath(pathname);
  if (href === "/") return path === "/";
  // /quickstart is the "Docs" entry point, but every other docs page should
  // light it up too — except the ones that have their own top-level nav item.
  if (href === "/quickstart") {
    if (path === "/" || path.startsWith("/api") || path.startsWith("/blog")) return false;
    if (path.startsWith("/pricing")) return false;
    return true;
  }
  return path === href || path.startsWith(`${href}/`);
}
