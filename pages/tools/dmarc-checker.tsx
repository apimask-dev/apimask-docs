import Link from "next/link";
import { useState } from "react";
import { ApiCta, Checker, Result, ToolLayout, type Row } from "../../components/tools/ToolLayout";
import { analyzeDmarc, analyzeSpf, parentDomain, spfRecordsOf } from "../../lib/mailpolicy";
import { curlFor, noDns, toolHref, tools, type DnsResult, type Envelope } from "../../lib/tools";

const FAQ = [
  {
    q: "What does p=none mean?",
    a: "The domain publishes DMARC but asks receivers to take no action on mail that fails, so spoofed mail is still delivered. It is the right first step while you read the reports, and should move to quarantine or reject once legitimate senders pass.",
  },
  {
    q: "My subdomain shows no DMARC record. Is it unprotected?",
    a: "Not necessarily. When a subdomain has no record, receivers apply the record of its organizational domain, using the sp= policy if one is set. Check the parent domain as well.",
  },
  {
    q: "Does this check DKIM?",
    a: "No. DKIM keys are published under a selector chosen by each sending service (for example google._domainkey), and the selector can't be discovered from DNS alone, so a checker can't list them reliably.",
  },
  {
    q: "How many checks can I run?",
    a: "About 30 an hour from one IP address. To check domains from your own code, a free API key includes 1,000 checks a month.",
  },
];

function explain(d: DnsResult): { verdict: Row; record: string | null; rows: Row[] } {
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
  const dmarc = analyzeDmarc(d.dmarc?.raw);
  const rows: Row[] = [];
  let verdict: Row;
  if (!dmarc) {
    const parent = parentDomain(d.domain);
    verdict = {
      level: "bad",
      title: `No DMARC record at _dmarc.${d.domain}.`,
      detail: parent
        ? `If this is a subdomain, receivers use the record of its parent domain, so check ${parent} too.`
        : "Anyone can send mail that claims to be from this domain, and receivers have no policy to apply.",
    };
    rows.push({
      level: "info",
      title: "A minimal record to start with:",
      detail: (
        <code>
          _dmarc.{d.domain} TXT "v=DMARC1; p=none; rua=mailto:dmarc@{d.domain}"
        </code>
      ),
    });
  } else {
    verdict = { level: dmarc.verdict.level, title: dmarc.verdict.text };
    rows.push(...dmarc.findings.map((f) => ({ level: f.level, title: f.text })));
  }

  const spf = analyzeSpf(spfRecordsOf(d.txt_records));
  rows.push(
    spf
      ? {
          level: spf.verdict.level,
          title: "SPF: " + spf.verdict.text,
          detail: <Link href={toolHref("spf-checker")}>Check the SPF record in detail</Link>,
        }
      : d.txt_records.length === 0
        ? {
            level: "warn",
            title: "SPF: no TXT records came back.",
            detail: (
              <>
                Either there is no SPF record or the lookup timed out. The{" "}
                <Link href={toolHref("spf-checker")}>SPF checker</Link> can run it again.
              </>
            ),
          }
        : {
            level: "bad",
            title: "SPF: no record.",
            detail:
              "DMARC passes only when SPF or DKIM passes and aligns, so a missing SPF record leaves DKIM to do all the work.",
          },
  );
  rows.push(
    d.mx_records.length > 0
      ? {
          level: "info",
          title: `Mail servers: ${d.mx_records
            .slice()
            .sort((a, b) => a.priority - b.priority)
            .map((m) => m.host)
            .join(", ")}`,
        }
      : { level: "info", title: "No mail servers (MX records) for this domain." },
  );
  rows.push({
    level: "info",
    title: "DKIM is not checked.",
    detail: "DKIM keys live under selectors chosen by each sending service, which DNS can't list.",
  });
  return { verdict, record: d.dmarc?.raw ?? null, rows };
}

export default function DmarcChecker() {
  const [doc, setDoc] = useState<Envelope<DnsResult> | null>(null);

  const tool = (
    <>
      <Checker
        label="Domain"
        placeholder="example.com"
        inputMode="url"
        examples={["github.com", "fastmail.com", "hey.com"]}
        submitLabel="Check DMARC"
        onCheck={async (value, token) => setDoc(await tools.domain(value, token))}
      />
      {doc?.data && (
        <>
          <Result heading={doc.data.domain} raw={doc} {...explain(doc.data)} />
          <ApiCta
            heading="Check DMARC and SPF from your own code"
            text="The DNS Analyzer API returns these records as JSON. 1,000 free checks a month, no card."
            curl={curlFor("/v1/utility/dns/analyze", { domain: doc.data.domain })}
          />
        </>
      )}
    </>
  );

  return (
    <ToolLayout
      slug="dmarc-checker"
      title="DMARC Checker: Look Up and Explain a Domain's DMARC Record | ApiMask"
      description="Free DMARC checker. Look up a domain's DMARC record, see whether the policy actually blocks spoofed mail, where reports go, and whether SPF is set up."
      h1="DMARC checker"
      lead={
        <p>
          Enter a domain to look up its DMARC record and see, in plain words, whether it blocks spoofed mail. The
          lookup runs live through the <Link href="/api/dns-analyzer">DNS Analyzer API</Link>. You can paste a URL
          or an email address too.
        </p>
      }
      tool={tool}
      faq={FAQ}
    >
      <h2>Reading a DMARC record</h2>
      <p>
        DMARC is a TXT record at <code>_dmarc.</code> plus your domain. It tells receivers what to do with mail that
        claims to come from your domain but fails both SPF and DKIM alignment, and where to send reports about it.
      </p>
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>p</code>
            </td>
            <td>
              The policy: <code>none</code> (report only), <code>quarantine</code> (send to spam) or{" "}
              <code>reject</code>. Required.
            </td>
          </tr>
          <tr>
            <td>
              <code>sp</code>
            </td>
            <td>The policy for subdomains. Defaults to <code>p</code>.</td>
          </tr>
          <tr>
            <td>
              <code>pct</code>
            </td>
            <td>The share of failing mail the policy applies to. Defaults to 100.</td>
          </tr>
          <tr>
            <td>
              <code>rua</code>
            </td>
            <td>Where receivers send daily aggregate reports. Without it, you can't see who sends as you.</td>
          </tr>
          <tr>
            <td>
              <code>adkim</code>, <code>aspf</code>
            </td>
            <td>
              Alignment mode for DKIM and SPF: <code>r</code> (relaxed, the default) or <code>s</code> (strict).
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Getting to an enforced policy</h2>
      <ol>
        <li>
          Publish <code>p=none</code> with a <code>rua</code> address and read the reports for a few weeks.
        </li>
        <li>Fix SPF and DKIM for every service that legitimately sends as your domain.</li>
        <li>
          Move to <code>p=quarantine</code>, optionally with a lower <code>pct</code> at first, then to{" "}
          <code>p=reject</code>.
        </li>
      </ol>
      <p>
        <Link href="/blog/mx-spf-dkim-dmarc-explained">MX, SPF, DKIM and DMARC explained</Link> covers how the four
        records work together.
      </p>
    </ToolLayout>
  );
}
