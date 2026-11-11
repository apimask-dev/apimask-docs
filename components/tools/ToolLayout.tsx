import Head from "next/head";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { errorText } from "../../lib/account";
import { SIGNUP_HREF } from "../../lib/products";
import { TOOLS, toolHref, type ToolSlug } from "../../lib/tools";
import { Turnstile, TURNSTILE_SITE_KEY } from "../dashboard/Turnstile";
import { SiteFooter } from "../SiteFooter";
import { SiteNav } from "../SiteNav";
import { highlightCode, highlightJson } from "../ui/highlight";
import styles from "./Tool.module.css";

const SITE_URL = "https://www.apimask.dev";

interface LayoutProps {
  slug: ToolSlug | null;
  title: string;
  description: string;
  h1: string;
  lead: ReactNode;
  /** The interactive checker, shown under the lead. */
  tool?: ReactNode;
  /** Explanatory content below the tool. */
  children: ReactNode;
  faq?: { q: string; a: string }[];
}

/** Page shell for /tools and each checker: metadata, nav, hero, content, other tools. */
export function ToolLayout({ slug, title, description, h1, lead, tool, children, faq }: LayoutProps) {
  const url = slug ? `${SITE_URL}${toolHref(slug)}` : `${SITE_URL}/tools`;
  const schema: Record<string, unknown>[] = [];
  if (slug) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: TOOLS.find((t) => t.slug === slug)?.name,
      url,
      description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "ApiMask", url: SITE_URL },
    });
  }
  if (faq?.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const others = TOOLS.filter((t) => t.slug !== slug);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        {schema.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
      </Head>

      <SiteNav />

      <main>
        <section className={styles.hero}>
          <div className={`${styles.inner} ${styles.heroInner}`}>
            <p className={styles.eyebrow}>
              {slug ? <Link href="/tools">Free tools</Link> : "Free tools"}
            </p>
            <h1>{h1}</h1>
            <div className={styles.lead}>{lead}</div>
            {tool}
          </div>
        </section>

        <section className={`${styles.inner} ${styles.content}`}>
          <div className={styles.prose}>
            {children}
            {faq?.length ? (
              <>
                <h2>Questions</h2>
                {faq.map((f) => (
                  <div key={f.q}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </section>

        {others.length > 0 && (
          <section className={styles.others} aria-label="Other free tools">
            <div className={styles.inner}>
              <h2>{slug ? "Other free tools" : "Tools"}</h2>
              <div className={styles.grid}>
                {others.map((t) => (
                  <Link key={t.slug} href={toolHref(t.slug)} className={styles.card} prefetch={false}>
                    <h3>{t.name}</h3>
                    <p>{t.short}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

interface CheckerProps {
  label: string;
  placeholder: string;
  inputMode?: "email" | "url";
  examples: string[];
  submitLabel: string;
  /** Runs the check; throw an ApiError to show its message. */
  onCheck: (value: string, token: string) => Promise<void>;
}

/** The input, Turnstile widget and submit button shared by every checker. */
export function Checker({ label, placeholder, inputMode, examples, submitLabel, onCheck }: CheckerProps) {
  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(v: string) {
    if (!v.trim() || !token) return;
    setError(null);
    setBusy(true);
    try {
      await onCheck(v.trim(), token);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
      // A Turnstile token is single use; every check needs a fresh one.
      setResetKey((k) => k + 1);
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    void run(value);
  }

  if (!TURNSTILE_SITE_KEY) {
    return (
      <div className={styles.alert} role="status">
        The free checker is not switched on yet. The same check is available with a{" "}
        <Link href={SIGNUP_HREF}>free API key</Link>.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label htmlFor="tool-input" className={styles.srOnly}>
        {label}
      </label>
      <div className={styles.inputRow}>
        <input
          id="tool-input"
          className={styles.input}
          type="text"
          inputMode={inputMode}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={320}
        />
        <button className={styles.button} type="submit" disabled={busy || !token || !value.trim()}>
          {busy ? "Checking…" : submitLabel}
        </button>
      </div>
      <div className={styles.examples}>
        <span>Try:</span>
        {examples.map((ex) => (
          <button key={ex} type="button" className={styles.example} onClick={() => setValue(ex)}>
            {ex}
          </button>
        ))}
      </div>
      <div className={styles.turnstile}>
        <Turnstile onToken={setToken} resetKey={resetKey} />
      </div>
      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

export type Level = "good" | "warn" | "bad" | "info";

export interface Row {
  level: Level;
  title: ReactNode;
  detail?: ReactNode;
}

interface ResultProps {
  heading: string;
  verdict: Row;
  record?: string | null;
  rows: Row[];
  raw: unknown;
}

/** One result card: verdict, optional raw record, explained rows, raw API response. */
export function Result({ heading, verdict, record, rows, raw }: ResultProps) {
  return (
    <div className={styles.result} aria-live="polite">
      <div className={styles.resultHead}>
        <h2>{heading}</h2>
        <p className={styles.verdict}>
          <span className={`${styles.dot} ${styles[verdict.level]}`} aria-hidden="true" />
          <span>
            <strong>{verdict.title}</strong>
            {verdict.detail ? <> {verdict.detail}</> : null}
          </span>
        </p>
      </div>
      {record ? <pre className={styles.record}>{record}</pre> : null}
      <ul className={styles.rows}>
        {rows.map((r, i) => (
          <li key={i} className={styles.row}>
            <span className={`${styles.dot} ${styles[r.level]}`} aria-label={r.level} />
            <div>
              <strong>{r.title}</strong>
              {r.detail ? <p>{r.detail}</p> : null}
            </div>
          </li>
        ))}
      </ul>
      <details className={styles.raw}>
        <summary>Raw API response</summary>
        <pre className={styles.code}>
          <code>{highlightJson(JSON.stringify(raw, null, 2))}</code>
        </pre>
      </details>
    </div>
  );
}

interface CtaProps {
  heading: string;
  text: string;
  curl: string;
}

/** "Do this in your own code" box, with the curl pre-filled with the checked value. */
export function ApiCta({ heading, text, curl }: CtaProps) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.cta}>
      <div className={styles.ctaText}>
        <div>
          <h2>{heading}</h2>
          <p>{text}</p>
        </div>
        <Link href={SIGNUP_HREF} className={styles.ctaButton} prefetch={false}>
          Get a free API key
        </Link>
      </div>
      <div className={styles.ctaCode}>
        <button
          type="button"
          className={styles.copy}
          onClick={() => {
            void navigator.clipboard?.writeText(curl).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className={styles.code}>
          <code>{highlightCode(curl)}</code>
        </pre>
      </div>
    </div>
  );
}
