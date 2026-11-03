/**
 * Client for the gateway's account API (apimask-platform docs/account-api.md).
 *
 * The session is an HttpOnly cookie on api.apimask.dev, so every call sends
 * credentials and JavaScript never sees the session itself.
 */

export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "https://api.apimask.dev").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public fields: { field: string; message: string }[] = [],
  ) {
    super(message);
  }
}

async function call<T>(path: string, method: "GET" | "POST" = "GET", body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API_BASE + path, {
      method,
      credentials: "include",
      // The API requires a JSON body on every POST (its CSRF rule).
      headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
      body: method === "POST" ? JSON.stringify(body ?? {}) : undefined,
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Could not reach ApiMask. Check your connection and try again.");
  }
  let doc: { success?: boolean; data?: T; error?: { code?: string; message?: string; fields?: { field: string; message: string }[] } };
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
  return doc.data as T;
}

/** The first field message for validation errors, else the error message. */
export function errorText(err: unknown): string {
  if (err instanceof ApiError) {
    return err.fields[0]?.message ? capitalize(err.fields[0].message) : err.message;
  }
  return "Something went wrong.";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface Plan {
  id: string;
  status: string;
  monthly_quota_units: number;
  rps: number;
  period_start: string;
  period_end: string;
}

export interface Me {
  user_id: string;
  email: string;
  org_id: string;
  plan?: Plan;
}

export interface ApiKey {
  id: string;
  name: string;
  env: "live" | "test";
  display: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
}

export interface CreatedKey {
  id: string;
  key: string;
  env: "live" | "test";
  warning: string;
}

export interface UsagePeriod {
  env: "live" | "test";
  period_start: string;
  quota_units: number;
  reserved: number;
  consumed: number;
}

export interface UsageDay {
  day: string;
  env: "live" | "test";
  endpoint: string;
  requests: number;
  units: number;
  errors_4xx: number;
  errors_5xx: number;
}

export const account = {
  login: (email: string, turnstileToken: string, source: string | null) =>
    call<{ sent: boolean; expires_in_seconds: number }>("/account/login", "POST", {
      email,
      turnstile_token: turnstileToken,
      source: source ?? "",
    }),
  verify: (token: string) =>
    call<{ user_id: string; org_id: string; email: string; new_account: boolean }>("/account/verify", "POST", { token }),
  logout: () => call<{ signed_out: boolean }>("/account/logout", "POST"),
  me: () => call<Me>("/account/me"),
  keys: () => call<{ keys: ApiKey[] }>("/account/keys").then((d) => d.keys),
  createKey: (name: string, env: "live" | "test") => call<CreatedKey>("/account/keys", "POST", { name, env }),
  revokeKey: (id: string) => call<{ id: string; revoked: boolean }>(`/account/keys/${encodeURIComponent(id)}/revoke`, "POST"),
  rotateKey: (id: string) =>
    call<CreatedKey & { replaces: string; old_key_expires_at: string }>(
      `/account/keys/${encodeURIComponent(id)}/rotate`,
      "POST",
    ),
  usage: () => call<{ periods: UsagePeriod[]; daily: UsageDay[] }>("/account/usage"),
  billing: () => call<BillingStatus>("/account/billing"),
  checkout: (plan: string) => call<{ url: string }>("/account/billing/checkout", "POST", { plan }),
  portal: () => call<{ url: string }>("/account/billing/portal", "POST"),
};

export interface BillingStatus {
  /** Plans that can be bought now (a Lemon Squeezy variant is configured). */
  purchasable: string[];
  subscription: {
    plan_id: string;
    status: string;
    renews_at: string | null;
    ends_at: string | null;
    grace_until: string | null;
    /** True while the subscription can still be changed or resumed in the portal. */
    holds_plan: boolean;
  } | null;
}

/** The usage total for env in the plan's current period, if any calls were made. */
export function currentPeriod(periods: UsagePeriod[], env: "live" | "test", me: Me): UsagePeriod | undefined {
  const start = me.plan?.period_start?.slice(0, 10);
  return periods.find((p) => p.env === env && (!start || p.period_start.slice(0, 10) === start));
}
