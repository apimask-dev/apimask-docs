import Link from "next/link";
import { useState } from "react";
import { ApiCta, Checker, Result, ToolLayout, type Row } from "../../components/tools/ToolLayout";
import { curlFor, tools, type EmailResult, type Envelope } from "../../lib/tools";

const FAQ = [
  {
    q: "How do you know a domain is disposable?",
    a: "It is on the community-maintained disposable-email-domains list, which has more than 10,000 domains and is refreshed weekly. Subdomains count too: inbox.mailinator.com is flagged like mailinator.com.",
  },
  {
    q: "Does a clean result mean the mailbox exists?",
    a: "No. The checker looks at the domain: whether it is disposable, whether it has mail servers, and whether it looks like a typo. It does not connect to the mail server to ask whether the mailbox exists. A sign-in or confirmation email is still the only proof.",
  },
  {
    q: "Is the address I type stored?",
    a: "The check is sent to the ApiMask API and the address is not kept after the response. Request counts are recorded for the free tool's quota, without the address.",
  },
  {
    q: "How many checks can I run?",
    a: "About 30 an hour from one IP address. To check addresses from your own code, a free API key includes 1,000 checks a month.",
  },
];

/** Accepts an address or a bare domain; a domain is checked as check@domain. */
function toAddress(input: string): { address: string; domainOnly: boolean } {
  const v = input.trim();
  if (v.includes("@")) return { address: v, domainOnly: false };
  return { address: `check@${v.replace(/^https?:\/\//i, "").replace(/\/.*$/, "")}`, domainOnly: true };
}

function explain(d: EmailResult, domainOnly: boolean): { verdict: Row; rows: Row[] } {
  if (!d.is_valid) {
    return {
      verdict: { level: "bad", title: "Not a valid email address.", detail: d.reason ?? undefined },
      rows: [],
    };
  }
  const rows: Row[] = [];
  rows.push(
    d.is_disposable
      ? {
          level: "bad",
          title: `${d.domain} is a disposable email service.`,
          detail: "Inboxes there are public or expire, so they are used to skip email verification and claim free trials more than once.",
        }
      : {
          level: "good",
          title: "Not on the disposable list.",
          detail: "The list has 10,000+ known throwaway domains. New ones appear every day, so this is a strong signal, not a guarantee.",
        },
  );
  rows.push(
    d.has_mx_records
      ? {
          level: "good",
          title: `${d.domain} has mail servers (MX records).`,
          detail: "The domain is set up to receive email. Whether this particular mailbox exists is not checked.",
        }
      : {
          level: "bad",
          title: `${d.domain} has no mail servers.`,
          detail: "Without MX records the domain can't receive email, so a confirmation email would bounce.",
        },
  );
  if (d.did_you_mean) {
    rows.push({
      level: "warn",
      title: `Possible typo: did you mean ${domainOnly ? d.did_you_mean.split("@")[1] : d.did_you_mean}?`,
      detail: "In a signup form, ask the user to confirm rather than changing the address for them.",
    });
  }
  if (!domainOnly) {
    rows.push(
      d.is_role_account
        ? {
            level: "info",
            title: `${d.local_part}@ is a role address.`,
            detail: "Shared inboxes like support@ or info@ are normal for business tools and worth a second look for free trials.",
          }
        : { level: "good", title: "Not a role address." },
    );
  }

  let verdict: Row;
  if (d.is_disposable) {
    verdict = { level: "bad", title: "Disposable.", detail: "Block it, or flag the account for review." };
  } else if (d.did_you_mean) {
    verdict = { level: "warn", title: "Probably a typo.", detail: "Ask the user to check the address." };
  } else if (!d.has_mx_records) {
    verdict = { level: "bad", title: "This domain can't receive email." };
  } else {
    verdict = {
      level: "good",
      title: "No problems found.",
      detail: "Not disposable, not a known typo, and the domain receives mail.",
    };
  }
  return { verdict, rows };
}

export default function DisposableEmailChecker() {
  const [result, setResult] = useState<{ input: string; domainOnly: boolean; doc: Envelope<EmailResult> } | null>(
    null,
  );

  const tool = (
    <>
      <Checker
        label="Email address or domain"
        placeholder="jane@mailinator.com or mailinator.com"
        inputMode="email"
        examples={["sam@mailinator.com", "jane@gmail.con", "guerrillamail.com", "dev@outlook.com"]}
        submitLabel="Check"
        onCheck={async (value, token) => {
          const { address, domainOnly } = toAddress(value);
          const doc = await tools.email(address, token);
          setResult({ input: value, domainOnly, doc });
        }}
      />
      {result?.doc.data && (
        <>
          <Result
            heading={result.domainOnly ? (result.doc.data.domain ?? result.input) : result.input}
            raw={result.doc}
            {...explain(result.doc.data, result.domainOnly)}
          />
          <ApiCta
            heading="Run this check in your signup form"
            text="Same API, same answer. 1,000 free checks a month, no card."
            curl={curlFor("/v1/utility/email/validate", { email: toAddress(result.input).address })}
          />
        </>
      )}
    </>
  );

  return (
    <ToolLayout
      slug="disposable-email-checker"
      title="Disposable Email Checker: Is This a Throwaway Address? | ApiMask"
      description="Free disposable email checker. Paste an address or domain to see if it is a throwaway inbox, a typo like gmail.con, or a domain with no mail servers. 10,000+ domains, updated weekly."
      h1="Disposable email checker"
      lead={
        <p>
          Paste an email address or a domain. See whether it is a throwaway inbox, a typo of a common provider, or a
          domain that can't receive mail. This page runs the same check as the{" "}
          <Link href="/api/email-validation">Email Validation API</Link>.
        </p>
      }
      tool={tool}
      faq={FAQ}
    >
      <h2>What it checks</h2>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>How</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Disposable domain</td>
            <td>
              Matched against the{" "}
              <a href="https://github.com/disposable-email-domains/disposable-email-domains" rel="noreferrer">
                disposable-email-domains
              </a>{" "}
              list (10,000+ domains, refreshed weekly), including subdomains.
            </td>
          </tr>
          <tr>
            <td>Mail servers</td>
            <td>A live DNS lookup for the domain's MX records.</td>
          </tr>
          <tr>
            <td>Typos</td>
            <td>
              One-character mistakes in about 25 common providers, such as <code>gmail.con</code>,{" "}
              <code>yaho.com</code> and <code>outlok.com</code>. Real providers that look similar, like{" "}
              <code>mail.com</code>, are never "corrected".
            </td>
          </tr>
          <tr>
            <td>Syntax and role addresses</td>
            <td>
              Whether the address is well formed, and whether it is a shared inbox like <code>support@</code>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>What it doesn't check</h2>
      <p>
        It doesn't connect to the mail server to ask whether the mailbox exists. That's what makes it fast enough to
        run while someone is typing a signup form, and it means a clean result is not proof that the address is
        real. For signup forms, combine it with a confirmation email. For cleaning an old mailing list where bounces
        are the main worry, a service that verifies mailboxes is a better fit.
      </p>

      <h2>Blocking disposable emails at signup</h2>
      <p>
        Call the API from your server when the form is submitted, then reject disposable domains and ask the user
        to confirm likely typos. The <Link href="/blog/validate-emails-before-signup">signup validation guide</Link>{" "}
        has a complete policy, and <Link href="/api/bulk-email-verification">bulk verification</Link> checks up to
        500 addresses per call when you want to clean up existing accounts.
      </p>
    </ToolLayout>
  );
}
