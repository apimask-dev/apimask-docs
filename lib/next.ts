/**
 * Where to go after sign-in. The emailed link carries only the token, so the
 * page the visitor came from is remembered in this browser between the login
 * request and the verify page. Opening the link elsewhere lands on /dashboard.
 */

const KEY = "apimask_next";

/** Only same-site paths, so a crafted value cannot bounce the user elsewhere. */
function safe(next: unknown): string | null {
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
    ? next
    : null;
}

export function rememberNext(next: unknown): void {
  try {
    const path = safe(next);
    if (path) localStorage.setItem(KEY, path);
    else localStorage.removeItem(KEY);
  } catch {
    // Storage unavailable: fall back to /dashboard.
  }
}

export function takeNext(): string {
  try {
    const path = safe(localStorage.getItem(KEY));
    localStorage.removeItem(KEY);
    return path ?? "/dashboard";
  } catch {
    return "/dashboard";
  }
}
