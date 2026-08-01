import { useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./CodeTabs.module.css";
import { cx } from "./cx";
import { highlightCode, highlightJson } from "./highlight";

// Must match the host documented on pages/apis/instagram.mdx — this block was
// previously advertising "instagram-api-collection.p.rapidapi.com", which is
// not a real RapidAPI host and would have failed if copy-pasted.
const HOST = "instagram-api.p.rapidapi.com";
const PATH = "/v1/instagram/profile?username=nasawebb";

const snippets = {
  curl: {
    label: "cURL",
    code: `HOST="${HOST}"

curl --request GET \\
  --url "https://$HOST${PATH}" \\
  --header "X-RapidAPI-Key: $RAPIDAPI_KEY" \\
  --header "X-RapidAPI-Host: $HOST"`,
  },
  js: {
    label: "JavaScript",
    code: `const host = "${HOST}";
const endpoint = "/v1/instagram/profile";
const url = new URL("https://" + host + endpoint);
url.searchParams.set("username", "nasawebb");

const res = await fetch(url, {
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": host,
  },
});

const data = await res.json();`,
  },
  python: {
    label: "Python",
    code: `import os, requests

host = "${HOST}"
res = requests.get(
    f"https://{host}${PATH}",
    headers={
        "X-RapidAPI-Key": os.environ["RAPIDAPI_KEY"],
        "X-RapidAPI-Host": host,
    },
)

data = res.json()`,
  },
} as const;

const representativeResponse = `{
  "success": true,
  "data": {
    "id": "549313808",
    "username": "nasawebb",
    "full_name": "NASA Webb Telescope",
    "is_verified": true,
    "followers_count": 3547801,
    "following_count": 35,
    "media_count": 1302,
    "source": "apify",
    "fetched_at": "2026-07-20T10:10:24.746979+00:00"
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
    <div className={styles.terminal} aria-label="Instagram API request and representative response">
      <div className={styles.top}>
        <div className={styles.meta}>
          <span className={styles.method}>GET</span>
          <span>{PATH}</span>
        </div>
        <span className={styles.collection}>instagram.profile</span>
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
        <span>$RAPIDAPI_KEY</span>
      </div>
    </div>
  );
}
