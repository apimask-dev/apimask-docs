import { useState } from "react";
import styles from "./CodeTabs.module.css";
import { cx } from "./cx";

const HOST = "apimask-email-domain-validation-api.p.rapidapi.com";
const PATH = "/v1/utility/dns/analyze";

const snippets = {
  curl: {
    label: "cURL",
    code: `curl --request POST \\
  --url https://${HOST}${PATH} \\
  --header "Content-Type: application/json" \\
  --header "X-RapidAPI-Key: $RAPIDAPI_KEY" \\
  --header "X-RapidAPI-Host: ${HOST}" \\
  --data '{"domain":"example.com"}'`,
  },
  js: {
    label: "JavaScript",
    code: `const res = await fetch("https://${HOST}${PATH}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "${HOST}",
  },
  body: JSON.stringify({ domain: "example.com" }),
});

const data = await res.json();`,
  },
  python: {
    label: "Python",
    code: `import os, requests

res = requests.post(
    "https://${HOST}${PATH}",
    headers={
        "Content-Type": "application/json",
        "X-RapidAPI-Key": os.environ["RAPIDAPI_KEY"],
        "X-RapidAPI-Host": "${HOST}",
    },
    json={"domain": "example.com"},
)

data = res.json()`,
  },
} as const;

type Lang = keyof typeof snippets;

export function CodeTabs() {
  const [active, setActive] = useState<Lang>("curl");

  return (
    <div className={styles.terminal} aria-label="Example ApiMask API request and response">
      <div className={styles.top}>
        <div className={styles.meta}>
          <span className={styles.dot} />
          <span>POST {PATH}</span>
        </div>
        <span className={styles.status}>200 OK</span>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Request language">
        {(Object.keys(snippets) as Lang[]).map((lang) => (
          <button
            key={lang}
            type="button"
            role="tab"
            aria-selected={active === lang}
            className={cx(styles.tab, active === lang && styles.tabActive)}
            onClick={() => setActive(lang)}
          >
            {snippets[lang].label}
          </button>
        ))}
      </div>

      <pre className={styles.pre} aria-label={`Example request in ${snippets[active].label}`}>
        <code>{snippets[active].code}</code>
      </pre>

      <div className={styles.divider} />

      <pre className={styles.responsePre} aria-label="Example JSON response">
        <code>
          <span className={styles.punct}>{"{"}</span>
          {"\n  "}
          <span className={styles.key}>&quot;success&quot;</span>
          <span className={styles.punct}>: </span>
          <span className={styles.bool}>true</span>
          <span className={styles.punct}>,</span>
          {"\n  "}
          <span className={styles.key}>&quot;data&quot;</span>
          <span className={styles.punct}>: {"{"}</span>
          {"\n    "}
          <span className={styles.key}>&quot;domain&quot;</span>
          <span className={styles.punct}>: </span>
          <span className={styles.string}>&quot;example.com&quot;</span>
          <span className={styles.punct}>,</span>
          {"\n    "}
          <span className={styles.key}>&quot;mx_records&quot;</span>
          <span className={styles.punct}>: []</span>
          <span className={styles.punct}>,</span>
          {"\n    "}
          <span className={styles.key}>&quot;spf&quot;</span>
          <span className={styles.punct}>: </span>
          <span className={styles.null}>null</span>
          <span className={styles.punct}>,</span>
          {"\n    "}
          <span className={styles.key}>&quot;dmarc&quot;</span>
          <span className={styles.punct}>: </span>
          <span className={styles.null}>null</span>
          {"\n  "}
          <span className={styles.punct}>{"}"}</span>
          <span className={styles.punct}>,</span>
          {"\n  "}
          <span className={styles.key}>&quot;error&quot;</span>
          <span className={styles.punct}>: </span>
          <span className={styles.null}>null</span>
          <span className={styles.punct}>,</span>
          {"\n  "}
          <span className={styles.key}>&quot;meta&quot;</span>
          <span className={styles.punct}>: {"{}"}</span>
          {"\n"}
          <span className={styles.punct}>{"}"}</span>
        </code>
      </pre>

      <div className={styles.footer}>
        <span>DNS + SSL + Headers</span>
        <span>
          <strong>92ms</strong> cached response
        </span>
      </div>
    </div>
  );
}
