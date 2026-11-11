/**
 * The free checkers on /tools (apimask-platform internal/tools). Each check
 * is a POST to the gateway's /tools/* route with a fresh Turnstile token; the
 * gateway replays it through the real API and returns the API's own
 * response, so what the page shows is exactly what a customer's call returns.
 */

import { API_BASE, ApiError } from "./account";

export type ToolSlug = "disposable-email-checker" | "dmarc-checker" | "spf-checker";

export interface ToolInfo {
  slug: ToolSlug;
  name: string;
  short: string;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "disposable-email-checker",
    name: "Disposable email checker",
    short: "Is this a throwaway inbox, a typo, or a domain with no mail servers?",
  },
  {
    slug: "dmarc-checker",
    name: "DMARC checker",
    short: "Is the domain protected against spoofing, and who gets the reports?",
  },
  {
    slug: "spf-checker",
    name: "SPF checker",
    short: "Which servers may send mail as the domain, and is the record valid?",
  },
];

export function toolHref(slug: ToolSlug): string {
  return `/tools/${slug}`;
}

export interface EmailResult {
  is_valid: boolean;
  email: string | null;
  local_part: string | null;
  domain: string | null;
  is_disposable: boolean;
  has_mx_records: boolean;
  smtp_verified: boolean;
  is_role_account: boolean;
  reason: string | null;
  did_you_mean: string | null;
}

export interface DnsResult {
  domain: string;
  a_records: string[];
  aaaa_records: string[];
  mx_records: { host: string; priority: number }[];
  txt_records: string[];
  ns_records: string[];
  cname_records: string[];
  spf: { raw: string; valid: boolean } | null;
  dmarc: { raw: string; valid: boolean } | null;
}

/** The full API envelope, shown as "raw response" under each result. */
export interface Envelope<T> {
  success: boolean;
  data: T | null;
  error: { code: string; message: string; fields?: { field: string; message: string }[] } | null;
  meta: { request_id?: string };
}

async function check<T>(path: string, body: Record<string, string>): Promise<Envelope<T>> {
  let res: Response;
  try {
    res = await fetch(API_BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Could not reach ApiMask. Check your connection and try again.");
  }
  let doc: Envelope<T>;
  try {
    doc = await res.json();
  } catch {
    throw new ApiError(res.status, "BAD_RESPONSE", "ApiMask returned an unexpected response.");
  }
  if (!res.ok || !doc.success) {
    throw new ApiError(
      res.status,
      doc.error?.code ?? "UNKNOWN",
      doc.error?.message ?? "Something went wrong.",
      doc.error?.fields,
    );
  }
  return doc;
}

export const tools = {
  email: (email: string, token: string) =>
    check<EmailResult>("/tools/email", { email, turnstile_token: token }),
  domain: (domain: string, token: string) =>
    check<DnsResult>("/tools/domain", { domain, turnstile_token: token }),
};

/** True when the lookup returned nothing at all: a typo, or a domain that doesn't exist. */
export function noDns(d: DnsResult): boolean {
  return (
    d.a_records.length + d.aaaa_records.length + d.mx_records.length + d.ns_records.length + d.txt_records.length ===
    0
  );
}

/** Shell-quote a JSON body for the curl snippet. */
export function curlFor(path: string, body: Record<string, string>): string {
  const json = JSON.stringify(body).replace(/'/g, "'\\''");
  return [
    "curl --request POST \\",
    `  --url https://api.apimask.dev${path} \\`,
    '  --header "Authorization: Bearer $APIMASK_API_KEY" \\',
    '  --header "Content-Type: application/json" \\',
    `  --data '${json}'`,
  ].join("\n");
}
