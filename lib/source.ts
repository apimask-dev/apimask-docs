/**
 * First-touch acquisition source for the funnel report (apimask-platform
 * db/queries/funnel.sql). Saved on the visitor's first landing and sent with
 * their sign-in request; the gateway normalizes it.
 *
 * Priority: ?utm_source, then ?ref, then the free tool the visitor landed on
 * (tool-<slug>, so the tool experiment can be measured in the funnel), then
 * the external referrer's hostname.
 * Kept in localStorage only; nothing leaves the browser until sign-in.
 */

const KEY = "apimask_source";

export function captureSource(): void {
  try {
    if (localStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    let source = params.get("utm_source") || params.get("ref") || "";
    const tool = window.location.pathname.match(/^\/tools\/([a-z0-9-]+)/);
    if (!source && tool) source = `tool-${tool[1]}`;
    if (!source && document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && !host.endsWith("apimask.dev")) source = host.replace(/^www\./, "");
    }
    localStorage.setItem(KEY, (source || "direct").slice(0, 64));
  } catch {
    // Storage blocked (private mode, disabled cookies): the org stays "unknown".
  }
}

export function storedSource(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
