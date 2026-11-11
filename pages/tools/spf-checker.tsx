import Link from "next/link";
import { useState } from "react";
import { ApiCta, Checker, Result, ToolLayout, type Row } from "../../components/tools/ToolLayout";
import { analyzeDmarc, analyzeSpf, spfRecordsOf } from "../../lib/mailpolicy";
import { curlFor, noDns, toolHref, tools, type DnsResult, type Envelope } from "../../lib/tools";

const FAQ = [
  {
    q: "Should I use ~all or -all?",
    a: "Both are fine once DMARC is enforced, because DMARC decides what happens to failing mail. ~all (soft fail) is the more common choice and is less likely to cause bounces when forwarding is involved. Never use +all.",
  },
  {
    q: "What is the 10 lookup limit?",
    a: "Evaluating SPF may trigger at most 10 DNS lookups, counting include, a, mx, ptr, exists and redirect, including those inside every nested include. Over 10, receivers return permerror and SPF fails. This checker counts the top-level terms only; each include can add more.",
  },
  {
    q: "Can a domain have two SPF records?",
    a: "No. With more than one v=spf1 record, SPF fails with permerror for all mail. Merge them into a single record.",
  },
  {
    q: "How many checks can I run?",
    a: "About 30 an hour from one IP address. To check domains from your own code, a free API key includes 1,000 checks a month.",
  },
];

function explain(d: DnsResult): { verdict: Row; record: string | null; rows: Row[] } {
  const records = spfRecordsOf(d.txt_records);
  const spf = analyzeSpf(records);
  const rows: Row[] = [];
  let verdict: Row;
  if (noDns(d)) {
    return {
      verdict: {
        level: "warn",
        title: `No DNS records found for ${d.domain}.`,
        detail: "Check the spelling. If the domain exists, the lookup may have timed out; run the check again.",
      },
      record: null,
      rows: [],
    };
  }
  if (!spf && d.txt_records.length === 0) {
    // The API returns an empty list both when there are no TXT records and
    // when the lookup failed, so don't claim the record is missing.
    verdict = {
      level: "warn",
      title: `No TXT records came back for ${d.domain}.`,
      detail: "Either the domain publishes no SPF record, or the lookup timed out. Run the check again to be sure.",
    };
  } else if (!spf) {
    verdict = {
      level: "bad",
      title: `No SPF record on ${d.domain}.`,
      detail:
        d.mx_records.length > 0
          ? "Receivers can't tell which servers may send mail as this domain."
          : "If the domain never sends mail, publish v=spf1 -all so nobody can send as it.",
    };
  } else {
    verdict = { level: spf.verdict.level, title: spf.verdict.text };
    rows.push(...spf.findings.map((f) => ({ level: f.level, title: f.text })));
    if (spf.includes.length > 0) {
      rows.push({
        level: "info",
        title: `Includes ${spf.includes.length === 1 ? "one sender" : `${spf.includes.length} senders`}:`,
        detail: spf.includes.join(", "),
      });
    }
    const ips = spf.terms.filter((t) => t.name === "ip4" || t.name === "ip6");
    if (ips.length > 0) {
      rows.push({ level: "info", title: `${ips.length} IP range${ips.length === 1 ? "" : "s"}:`, detail: ips.map((t) => t.value).join(", ") });
    }
  }

  const dmarc = analyzeDmarc(d.dmarc?.raw);
  rows.push(
    dmarc
      ? {
          level: dmarc.verdict.level,
          title: "DMARC: " + dmarc.verdict.text,
          detail: <Link href={toolHref("dmarc-checker")}>Check the DMARC record in detail</Link>,
        }
      : {
          level: "warn",
          title: "DMARC: no record.",
          detail: "SPF on its own doesn't stop spoofing of the From address people see; DMARC does.",
        },
  );
  return { verdict, record: records.length > 1 ? records.join("\n") : (spf?.raw ?? null), rows };
}

export default function SpfChecker() {
  const [doc, setDoc] = useState<Envelope<DnsResult> | null>(null);

  const tool = (
    <>
      <Checker
        label="Domain"
        placeholder="example.com"
        inputMode="url"
        examples={["github.com", "fastmail.com", "mailinator.com"]}
        submitLabel="Check SPF"
        onCheck={async (value, token) => setDoc(await tools.domain(value, token))}
      />
      {doc?.data && (
        <>
          <Result heading={doc.data.domain} raw={doc} {...explain(doc.data)} />
          <ApiCta
            heading="Check SPF and DMARC from your own code"
            text="The DNS Analyzer API returns the TXT, SPF, DMARC and MX records as JSON. 1,000 free checks a month, no card."
            curl={curlFor("/v1/utility/dns/analyze", { domain: doc.data.domain })}
          />
        </>
      )}
    </>
  );

  return (
    <ToolLayout
      slug="spf-checker"
      title="SPF Checker: Look Up and Validate a Domain's SPF Record | ApiMask"
      description="Free SPF record checker. See which servers may send mail as a domain, whether the record ends in -all or ~all, duplicate records, and DNS lookup count."
      h1="SPF record checker"
      lead={
        <p>
          Enter a domain to look up its SPF record and see what it allows: which services may send as the domain,
          what happens to everything else, and the mistakes that make SPF fail. The lookup runs live through the{" "}
          <Link href="/api/dns-analyzer">DNS Analyzer API</Link>.
        </p>
      }
      tool={tool}
      faq={FAQ}
    >
      <h2>Reading an SPF record</h2>
      <p>
        SPF is a TXT record on the domain itself, starting with <code>v=spf1</code>. Receivers read it from left to
        right and stop at the first term that matches the sending server.
      </p>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>include:_spf.google.com</code>
            </td>
            <td>Also allow every server that domain's SPF record allows. Costs at least one DNS lookup.</td>
          </tr>
          <tr>
            <td>
              <code>ip4:</code>, <code>ip6:</code>
            </td>
            <td>Allow a specific address or range. No DNS lookup.</td>
          </tr>
          <tr>
            <td>
              <code>a</code>, <code>mx</code>
            </td>
            <td>Allow the domain's own web or mail server addresses. One lookup each.</td>
          </tr>
          <tr>
            <td>
              <code>-all</code>, <code>~all</code>
            </td>
            <td>Everything else fails (<code>-</code>) or soft-fails (<code>~</code>). Put it last.</td>
          </tr>
          <tr>
            <td>
              <code>redirect=</code>
            </td>
            <td>Use another domain's SPF record instead of this one.</td>
          </tr>
        </tbody>
      </table>

      <h2>What this checker doesn't do</h2>
      <p>
        It reads the record on the domain you enter. It doesn't follow each <code>include</code>, so the lookup
        count covers the top level only, and it doesn't test whether a specific server's IP would pass.
      </p>
      <p>
        <Link href="/blog/mx-spf-dkim-dmarc-explained">MX, SPF, DKIM and DMARC explained</Link> covers how SPF fits
        with DKIM and DMARC.
      </p>
    </ToolLayout>
  );
}
