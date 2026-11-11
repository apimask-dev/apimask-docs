/**
 * Reads SPF and DMARC records returned by POST /v1/utility/dns/analyze for
 * the free checkers on /tools. The API returns the raw records; these
 * functions explain them. They only look at the record text, so anything
 * that needs more DNS lookups (nested SPF includes, DKIM selectors) is out of
 * scope and the pages say so.
 *
 * No imports, so `node --test lib/mailpolicy.test.ts` runs it directly.
 */

export type Level = "good" | "warn" | "bad";

export interface Finding {
  level: Level;
  text: string;
}

// --- DMARC (RFC 7489) --------------------------------------------------------

export interface Dmarc {
  tags: Record<string, string>;
  policy: string | null;
  subdomainPolicy: string | null;
  pct: number;
  reportsTo: string[];
  findings: Finding[];
  verdict: Finding;
}

export function parseTags(raw: string): Record<string, string> {
  const tags: Record<string, string> = {};
  for (const part of raw.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const key = part.slice(0, eq).trim().toLowerCase();
    if (key && !(key in tags)) tags[key] = part.slice(eq + 1).trim();
  }
  return tags;
}

export function analyzeDmarc(raw: string | null | undefined): Dmarc | null {
  if (!raw) return null;
  const tags = parseTags(raw);
  const policy = tags.p ? tags.p.toLowerCase() : null;
  const subdomainPolicy = tags.sp ? tags.sp.toLowerCase() : null;
  const pctRaw = tags.pct === undefined ? 100 : Number(tags.pct);
  const pct = Number.isFinite(pctRaw) ? Math.min(100, Math.max(0, Math.round(pctRaw))) : 100;
  const reportsTo = (tags.rua ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const findings: Finding[] = [];

  let verdict: Finding;
  switch (policy) {
    case "reject":
      verdict = { level: "good", text: "Enforced: mail that fails DMARC is rejected." };
      break;
    case "quarantine":
      verdict = { level: "good", text: "Enforced: mail that fails DMARC goes to spam." };
      break;
    case "none":
      verdict = {
        level: "warn",
        text: "Monitoring only (p=none): mail that fails DMARC is still delivered, so spoofing is not blocked.",
      };
      break;
    default:
      verdict = {
        level: "bad",
        text: policy
          ? `The policy p=${policy} is not valid; it must be none, quarantine or reject.`
          : "The record has no p= tag, so receivers ignore it.",
      };
  }

  if ((policy === "reject" || policy === "quarantine") && pct < 100) {
    findings.push({
      level: "warn",
      text: `pct=${pct}: the policy applies to only ${pct}% of failing mail.`,
    });
  }
  if (subdomainPolicy && subdomainPolicy !== policy) {
    findings.push({
      level: subdomainPolicy === "none" ? "warn" : "good",
      text: `Subdomains use sp=${subdomainPolicy}.`,
    });
  }
  if (reportsTo.length > 0) {
    findings.push({ level: "good", text: `Aggregate reports go to ${reportsTo.join(", ")}.` });
  } else {
    findings.push({
      level: "warn",
      text: "No rua= address, so nobody receives reports about mail sent as this domain.",
    });
  }
  for (const [tag, name] of [
    ["adkim", "DKIM"],
    ["aspf", "SPF"],
  ] as const) {
    if (tags[tag]?.toLowerCase() === "s") {
      findings.push({ level: "good", text: `Strict ${name} alignment (${tag}=s).` });
    }
  }
  return { tags, policy, subdomainPolicy, pct, reportsTo, findings, verdict };
}

// --- SPF (RFC 7208) ----------------------------------------------------------

/** Mechanisms and modifiers that cost a DNS lookup (RFC 7208 §4.6.4). */
const LOOKUP_TERMS = new Set(["include", "a", "mx", "ptr", "exists", "redirect"]);

export interface Term {
  qualifier: "+" | "-" | "~" | "?";
  name: string;
  value: string;
  text: string;
}

export interface Spf {
  raw: string;
  terms: Term[];
  includes: string[];
  lookups: number;
  all: Term | null;
  findings: Finding[];
  verdict: Finding;
}

export function parseSpfTerms(raw: string): Term[] {
  const terms: Term[] = [];
  for (const text of raw.trim().split(/\s+/).slice(1)) {
    if (!text) continue;
    let qualifier: Term["qualifier"] = "+";
    let rest = text;
    if ("+-~?".includes(rest[0])) {
      qualifier = rest[0] as Term["qualifier"];
      rest = rest.slice(1);
    }
    const sep = rest.search(/[:=/]/);
    const name = (sep < 0 ? rest : rest.slice(0, sep)).toLowerCase();
    const value = sep < 0 ? "" : rest.slice(sep + 1);
    terms.push({ qualifier, name, value, text });
  }
  return terms;
}

/**
 * spfRecords are every TXT record on the domain that starts with v=spf1.
 * More than one is itself an error (RFC 7208 §4.5).
 */
export function analyzeSpf(spfRecords: string[]): Spf | null {
  if (spfRecords.length === 0) return null;
  const raw = spfRecords[0];
  const terms = parseSpfTerms(raw);
  const includes = terms.filter((t) => t.name === "include").map((t) => t.value);
  const lookups = terms.filter((t) => LOOKUP_TERMS.has(t.name)).length;
  const all = terms.find((t) => t.name === "all") ?? null;
  const redirect = terms.find((t) => t.name === "redirect");
  const findings: Finding[] = [];

  let verdict: Finding;
  if (spfRecords.length > 1) {
    verdict = {
      level: "bad",
      text: `${spfRecords.length} SPF records found. A domain must have exactly one; with more, SPF fails for all mail (permerror).`,
    };
  } else if (all?.qualifier === "-") {
    verdict = { level: "good", text: "Strict: servers not listed fail SPF (-all)." };
  } else if (all?.qualifier === "~") {
    verdict = {
      level: "good",
      text: "Soft fail (~all): servers not listed are marked suspicious. Common, and fine once DMARC is enforced.",
    };
  } else if (all?.qualifier === "+") {
    verdict = {
      level: "bad",
      text: "+all lets any server on the internet pass SPF for this domain. Replace it with ~all or -all.",
    };
  } else if (all?.qualifier === "?") {
    verdict = { level: "warn", text: "Neutral (?all): SPF makes no claim about servers not listed." };
  } else if (redirect) {
    verdict = { level: "good", text: `The policy is delegated to ${redirect.value} (redirect=).` };
  } else {
    verdict = {
      level: "warn",
      text: "No all mechanism, so servers not listed get a neutral result. End the record with ~all or -all.",
    };
  }

  if (lookups > 10) {
    findings.push({
      level: "bad",
      text: `${lookups} DNS lookups in this record alone. SPF allows 10, so receivers return permerror.`,
    });
  } else if (lookups > 0) {
    findings.push({
      level: lookups >= 8 ? "warn" : "good",
      text: `${lookups} of 10 DNS lookups used by this record. Each include can use more of the 10; those are not counted here.`,
    });
  }
  if (terms.some((t) => t.name === "ptr")) {
    findings.push({ level: "warn", text: "ptr is deprecated and slow; replace it with ip4, ip6 or include." });
  }
  if (all && terms.indexOf(all) !== terms.length - 1) {
    findings.push({ level: "warn", text: "Terms after all are never evaluated." });
  }
  return { raw, terms, includes, lookups, all, findings, verdict };
}

export function spfRecordsOf(txtRecords: string[] | undefined): string[] {
  return (txtRecords ?? []).filter((t) => /^v=spf1(\s|$)/i.test(t.trim()));
}

/**
 * The domain one level up, for "check the parent" hints: mail.example.com →
 * example.com. Without the public suffix list this is a guess, so it returns
 * null when the parent looks like a registry suffix such as co.uk or com.au.
 */
export function parentDomain(domain: string): string | null {
  const labels = domain.split(".");
  if (labels.length <= 2) return null;
  const parent = labels.slice(1);
  if (parent.length === 2 && parent[0].length <= 3 && parent[1].length === 2) return null;
  return parent.join(".");
}
