import Link from "next/link";
import { ArrowIcon } from "../ui/ArrowIcon";
import { highlightCode, highlightJson } from "../ui/highlight";
import { Section, SectionHead } from "./Section";
import styles from "./Home.module.css";

const claims = [
  {
    title: "A real request and a real response on every page",
    copy: "Every endpoint page shows the exact call and the exact JSON it returns — not a schema you have to mentally render.",
  },
  {
    title: "Copy-paste snippets in cURL, JavaScript, and Python",
    copy: "Correct hosts, correct headers, correct body. Paste it into a terminal and it works.",
  },
  {
    title: "Every parameter and response field documented",
    copy: "Types, whether it's required, what it does, and what it can be null. No guessing from example payloads.",
  },
];

// Verbatim from pages/apis/email-validation.mdx — the docs are the source of
// truth for this snippet, so the homepage can never drift from the real shape.
const REQUEST = `curl --request POST \\
  --url https://api.apimask.dev/v1/utility/email/validate \\
  --header "Authorization: Bearer $APIMASK_API_KEY" \\
  --header "Content-Type: application/json" \\
  --data '{"email":"jane@gmail.con"}'`;

const RESPONSE = `{
  "success": true,
  "data": {
    "is_valid": true,
    "email": "jane@gmail.con",
    "local_part": "jane",
    "domain": "gmail.con",
    "is_disposable": false,
    "has_mx_records": false,
    "smtp_verified": false,
    "is_role_account": false,
    "reason": null,
    "did_you_mean": "jane@gmail.com"
  },
  "error": null,
  "meta": { "request_id": "req_example" }
}`;

export function DocsQuality() {
  return (
    <Section tint label="Documentation">
      <SectionHead
        eyebrow="Documentation"
        title="Docs you can actually build from."
        lead="Most of the time lost integrating an API goes into working out what it really returns. Every ApiMask endpoint is documented with the call, the response, and every field it contains."
      />
      <div className={styles.split}>
        <ul className={styles.featureList}>
          {claims.map((claim) => (
            <li key={claim.title}>
              <h3>{claim.title}</h3>
              <p>{claim.copy}</p>
            </li>
          ))}
          <li>
            <Link href="/quickstart" className={styles.moreLink} prefetch={false}>
              Read the quickstart
              <ArrowIcon />
            </Link>
          </li>
        </ul>

        <div className={styles.samplePanel}>
          <div className={styles.sampleBar}>
            <span>
              <b>POST</b> /v1/utility/email/validate
            </span>
            <span>email-validation</span>
          </div>
          <pre>
            <code>{highlightCode(REQUEST)}</code>
          </pre>
          <div className={styles.sampleDivider} />
          <div className={styles.sampleBar}>
            <span>200 OK</span>
            <span>application/json</span>
          </div>
          <pre>
            <code>{highlightJson(RESPONSE)}</code>
          </pre>
        </div>
      </div>
    </Section>
  );
}
