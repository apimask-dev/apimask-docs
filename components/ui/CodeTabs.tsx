import { useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./CodeTabs.module.css";
import { cx } from "./cx";
import { highlightCode, highlightJson } from "./highlight";

// Must match pages/apis/email-validation.mdx. The response is the one the Go
// gateway returns for this input (apimask-platform/apis/emailvalidation).
const BASE = "https://api.apimask.dev";
const PATH = "/v1/utility/email/validate";
const BODY = `{"email":"sam@mailinator.com"}`;

const snippets = {
  curl: {
    label: "cURL",
    code: `curl --request POST \\
  --url ${BASE}${PATH} \\
  --header "Authorization: Bearer $APIMASK_API_KEY" \\
  --header "Content-Type: application/json" \\
  --data '${BODY}'`,
  },
  js: {
    label: "JavaScript",
    code: `const res = await fetch("${BASE}${PATH}", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.APIMASK_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "sam@mailinator.com" }),
});

const { data } = await res.json();
if (data.is_disposable) rejectSignup();`,
  },
  python: {
    label: "Python",
    code: `import os, requests

res = requests.post(
    "${BASE}${PATH}",
    headers={"Authorization": f"Bearer {os.environ['APIMASK_API_KEY']}"},
    json={"email": "sam@mailinator.com"},
)

data = res.json()["data"]
if data["is_disposable"]:
    reject_signup()`,
  },
} as const;

const representativeResponse = `{
  "success": true,
  "data": {
    "is_valid": true,
    "email": "sam@mailinator.com",
    "local_part": "sam",
    "domain": "mailinator.com",
    "is_disposable": true,
    "has_mx_records": true,
    "smtp_verified": false,
    "is_role_account": false,
    "reason": null,
    "did_you_mean": null
  },
  "error": null,
  "meta": { "request_id": "req_example" }
}`;

type Lang = keyof typeof snippets;

const languages = Object.keys(snippets) as Lang[];

export function CodeTabs() {
  const [active, setActive] = useState<Lang>("curl");

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, lang: Lang) {
    const currentIndex = languages.indexOf(lang);
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % languages.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + languages.length) % languages.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = languages.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextLang = languages[nextIndex];
    setActive(nextLang);
    document.getElementById(`request-tab-${nextLang}`)?.focus();
  }

  return (
    <div className={styles.terminal} aria-label="Email validation request and representative response">
      <div className={styles.top}>
        <div className={styles.meta}>
          <span className={styles.method}>POST</span>
          <span>{PATH}</span>
        </div>
        <span className={styles.collection}>email.validate</span>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Request language">
        {languages.map((lang) => (
          <button
            key={lang}
            id={`request-tab-${lang}`}
            type="button"
            role="tab"
            aria-controls="request-code"
            aria-selected={active === lang}
            tabIndex={active === lang ? 0 : -1}
            className={cx(styles.tab, active === lang && styles.tabActive)}
            onClick={() => setActive(lang)}
            onKeyDown={(event) => handleTabKeyDown(event, lang)}
          >
            {snippets[lang].label}
          </button>
        ))}
      </div>

      <pre
        id="request-code"
        role="tabpanel"
        aria-labelledby={`request-tab-${active}`}
        className={styles.pre}
      >
        <code>{highlightCode(snippets[active].code)}</code>
      </pre>

      <div className={styles.divider} />
      <div className={styles.responseLabel}>Representative response</div>
      <pre className={styles.responsePre} aria-label="Representative JSON response based on the API schema">
        <code>{highlightJson(representativeResponse)}</code>
      </pre>

      <div className={styles.footer}>
        <span>schema-backed example</span>
        <span>$APIMASK_API_KEY</span>
      </div>
    </div>
  );
}
