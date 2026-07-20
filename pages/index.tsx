import Head from "next/head";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { ArrowIcon } from "../components/ui/ArrowIcon";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { CodeTabs } from "../components/ui/CodeTabs";
import { FlagshipProductCard, QuickToolCard } from "../components/ProductCard";
import {
  flagshipProducts,
  quickTools,
  categories,
  liveEndpointCount,
  publishedCollectionCount,
} from "../lib/products";

const RAPIDAPI_URL = "https://rapidapi.com/user/aftaab";

// How the RapidAPI-centric flow actually works, shown as a 3-step band.
const steps = [
  {
    title: "Subscribe on RapidAPI",
    copy: "One key on RapidAPI. It handles billing, quotas, and usage — no custom account setup.",
  },
  {
    title: "Import the collection",
    copy: "Grab the import-ready Postman / RapidAPI collection and start from working requests.",
  },
  {
    title: "Call the endpoints",
    copy: "Hit versioned /v1 endpoints that return predictable JSON, documented right here.",
  },
] as const;

// Real platform selling points (see apimask-platform/README.md).
const features = [
  {
    title: "Standard response envelope",
    copy: "Every endpoint returns { success, data, error, meta } — parse once, reuse everywhere.",
  },
  {
    title: "Versioned endpoints",
    copy: "Stable /v1 paths so your integrations don't break as collections grow.",
  },
  {
    title: "Rate limited by design",
    copy: "Redis sliding-window limits per key keep responses fast and predictable.",
  },
  {
    title: "Secure API keys",
    copy: "Keys are SHA-256 hashed at rest; RapidAPI manages issuance and rotation.",
  },
  {
    title: "Cost & token tracking",
    copy: "Per-request accounting on AI endpoints, so usage is transparent.",
  },
  {
    title: "JSON-first responses",
    copy: "Typed, consistent JSON with clear schemas and examples in the docs.",
  },
] as const;

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>ApiMask - Published RapidAPI Collections for Developers</title>
        <link rel="canonical" href="https://apimask.dev" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="application-name" content="ApiMask" />
        <meta name="apple-mobile-web-app-title" content="ApiMask" />
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="ApiMask, RapidAPI APIs, Postman collections, developer utilities API, SEO website audit API, Twitter API, Instagram API, bulk email verification API, email validation API, DNS analyzer API, SSL checker API"
        />
        <meta
          name="description"
          content="ApiMask publishes production-ready RapidAPI collections for developer utilities, SEO website audits, Twitter/X data, Instagram data, AI content, email verification, and website intelligence."
        />
        <meta property="og:title" content="ApiMask - Published RapidAPI Collections for Developers" />
        <meta
          property="og:description"
          content="Published API collections for developers, SaaS teams, SEO tools, and social data workflows. Available through RapidAPI."
        />
        <meta property="og:url" content="https://apimask.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ApiMask" />
        <meta property="og:image" content="https://apimask.dev/apimask-logo.png" />
        <meta property="og:image:alt" content="ApiMask logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ApiMask - Published RapidAPI Collections" />
        <meta
          name="twitter:description"
          content="Published API collections for developers, SaaS teams, SEO tools, and social data workflows. Available through RapidAPI."
        />
        <meta name="twitter:image" content="https://apimask.dev/apimask-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://apimask.dev/#organization",
                  name: "ApiMask",
                  url: "https://apimask.dev",
                  logo: "https://apimask.dev/apimask-logo.png",
                  description:
                    "ApiMask publishes production-ready RapidAPI collections for developers, startups, SEO tools, social data workflows, and AI-powered apps.",
                  sameAs: [
                    "https://rapidapi.com/user/aftaab",
                    "https://github.com/apimask-dev",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://apimask.dev/#website",
                  name: "ApiMask",
                  url: "https://apimask.dev",
                  publisher: { "@id": "https://apimask.dev/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://apimask.dev/api?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "ItemList",
              name: "ApiMask published API collections",
                  itemListElement: flagshipProducts.map((group, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "SoftwareApplication",
                      name: group.title,
                      applicationCategory: "DeveloperApplication",
                      operatingSystem: "Any",
                      url: `https://apimask.dev${group.docs}`,
                      description: group.copy,
                      offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                        url: group.rapidapi,
                      },
                    },
                  })),
                },
              ],
            }),
          }}
        />
      </Head>

      <main className="marketing">
        <SiteNav variant="landing" />

        <section className="hero">
          <div className="heroBg" aria-hidden="true" />
          <div className="heroInner">
            <div className="heroCopy">
              <div className="heroBadges" aria-label="ApiMask launch details">
                <span className="badgeDot">Available through RapidAPI</span>
                <span>{publishedCollectionCount} published collections</span>
                <span>{liveEndpointCount} live endpoints</span>
              </div>
              <h1>
                Published API collections for <span>developer tools</span>, SEO, and social data.
              </h1>
              <p className="lead">
                Import-ready RapidAPI collections for developer utilities, SEO website audits,
                Twitter/X and Instagram data, AI content, QR codes, bulk email verification, and
                DNS, SSL, and security tooling.
              </p>
              <div className="actions">
                <Button href={RAPIDAPI_URL} variant="primary" external>
                  Find ApiMask on RapidAPI
                </Button>
                <Button href="/api" variant="secondary" icon={<ArrowIcon />}>
                  Explore API docs
                </Button>
              </div>
              <div className="metrics" aria-label="ApiMask launch metrics">
                <span>
                  <strong>{liveEndpointCount}</strong>
                  live endpoints
                </span>
                <span>
                  <strong>{publishedCollectionCount}</strong>
                  collections
                </span>
                <span>
                  <strong>JSON</strong>
                  first responses
                </span>
              </div>
            </div>

            <div className="heroVisualWrap">
              <CodeTabs />
            </div>
          </div>
        </section>

        <section className="band bandAlt">
          <div className="container">
            <div className="sectionHeader center">
              <p className="eyebrow">How it works</p>
              <h2>From RapidAPI key to live response in three steps.</h2>
            </div>
            <ol className="steps">
              {steps.map((step, i) => (
                <li className="step" key={step.title}>
                  <span className="stepNum">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="sectionHeader">
              <p className="eyebrow">Products</p>
              <h2>Start with the collections that are published now.</h2>
              <p>
                These cards mirror the current import-ready Postman collections and their RapidAPI
                products, so the site stays aligned with what developers can use today.
              </p>
            </div>

            <div className="productGrid">
              {flagshipProducts.map((group) => (
                <FlagshipProductCard key={group.title} {...group} />
              ))}
            </div>

            <p className="subLabel">Popular endpoints inside the collections</p>
            <div className="toolGrid">
              {quickTools.map((tool) => (
                <QuickToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>
        </section>

        <section className="band bandAlt">
          <div className="container">
            <div className="sectionHeader">
              <p className="eyebrow">Built for developers</p>
              <h2>Consistent, versioned, production-ready APIs.</h2>
              <p>
                Every ApiMask endpoint shares the same conventions, so once you integrate one, the
                rest feel familiar.
              </p>
            </div>
            <div className="featureGrid">
              {features.map((feature) => (
                <div className="feature" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="sectionHeader">
              <p className="eyebrow">What&apos;s next</p>
              <h2>One API key. A platform that keeps expanding.</h2>
              <p>
                ApiMask is a modular API ecosystem. Published collections cover developer utilities,
                AI content, email and domain validation, SEO, security, and social data — and it is
                expanding into OCR, PDF, resume and ATS, app store intelligence, data enrichment,
                and AI agent tooling.
              </p>
            </div>

            <div className="categoryList">
              {categories.map((category) => (
                <div className="categoryRow" key={category.name}>
                  <span className="categoryName">{category.name}</span>
                  <span className="categoryNote">{category.note}</span>
                  <Badge tone={category.status === "Live" ? "green" : "soon"}>
                    {category.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container">
            <div className="ctaCard">
              <p className="eyebrow onDark">No custom billing setup</p>
              <h2>Subscribe on RapidAPI. Build with the docs here.</h2>
              <p>
                RapidAPI handles subscriptions, keys, limits, payments, and usage. ApiMask.dev gives
                you the product overview, schemas, examples, and endpoint behavior.
              </p>
              <div className="actions compact">
                <Button href={RAPIDAPI_URL} variant="primary" external>
                  Open RapidAPI
                </Button>
                <Button href="/quickstart" variant="secondary">
                  Read quickstart
                </Button>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>

      <style jsx>{`
        .marketing {
          min-height: 100vh;
          font-family: var(--apimask-sans);
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        /* ---------- Hero ---------- */
        .hero {
          position: relative;
          overflow: hidden;
          background: var(--am-surface);
        }

        :global(html.dark) .hero {
          background:
            radial-gradient(ellipse 55% 55% at 72% -8%, rgba(124, 58, 237, 0.16), transparent 70%),
            var(--am-surface);
        }

        .heroBg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: radial-gradient(
            color-mix(in srgb, var(--am-accent) 24%, transparent) 1px,
            transparent 1.4px
          );
          background-size: 24px 24px;
          -webkit-mask-image: radial-gradient(
            ellipse 90% 62% at 50% -6%,
            #000 38%,
            transparent 76%
          );
          mask-image: radial-gradient(ellipse 90% 62% at 50% -6%, #000 38%, transparent 76%);
          opacity: 0.9;
        }

        .heroInner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(480px, 1.05fr);
          gap: 56px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 28px 88px;
          align-items: center;
        }

        .heroCopy {
          max-width: 560px;
        }

        .heroBadges {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .heroBadges span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 30px;
          border: 1px solid var(--am-line);
          border-radius: 999px;
          background: var(--am-card);
          padding: 0 12px;
          color: var(--am-muted);
          font-size: 12px;
          font-weight: 560;
          box-shadow: var(--am-shadow-sm);
        }

        .heroBadges .badgeDot::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
        }

        .eyebrow {
          margin: 0 0 12px;
          color: var(--am-accent);
          font-size: 13px;
          font-weight: 680;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        h1 {
          max-width: 600px;
          margin-bottom: 22px;
          font-size: clamp(42px, 4.6vw, 62px);
          line-height: 1.04;
          letter-spacing: -0.025em;
          font-family: var(--apimask-display);
        }

        h1 span {
          color: var(--am-accent);
        }

        h2 {
          margin-bottom: 14px;
          font-size: clamp(28px, 3.4vw, 40px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-family: var(--apimask-display);
        }

        .lead,
        .sectionHeader p {
          color: var(--am-muted);
          line-height: 1.65;
        }

        .lead {
          max-width: 560px;
          margin-bottom: 30px;
          font-size: 18px;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .metrics {
          display: flex;
          align-items: stretch;
          gap: 28px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .metrics span {
          display: flex;
          flex-direction: column;
          min-width: 120px;
          border-left: 2px solid var(--am-line);
          padding-left: 16px;
          color: var(--am-muted);
          font-size: 13px;
        }

        .metrics strong {
          margin-bottom: 2px;
          color: var(--am-ink);
          font-size: 24px;
          font-weight: 720;
          font-family: var(--apimask-display);
          letter-spacing: -0.02em;
        }

        .heroVisualWrap {
          position: relative;
          display: grid;
          align-items: center;
        }

        /* ---------- Section bands ---------- */
        .band {
          background: var(--am-surface);
          border-top: 1px solid var(--am-line);
        }

        .bandAlt {
          background: var(--am-surface-2);
        }

        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 96px 28px;
        }

        .sectionHeader {
          max-width: 680px;
          margin-bottom: 40px;
        }

        .sectionHeader.center {
          margin-right: auto;
          margin-left: auto;
          text-align: center;
        }

        /* ---------- How it works ---------- */
        .steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin: 0;
          padding: 0;
          list-style: none;
          counter-reset: step;
        }

        .step {
          border: 1px solid var(--am-line);
          border-radius: var(--radius-lg);
          background: var(--am-card);
          padding: 28px 24px;
          box-shadow: var(--am-shadow-sm);
        }

        .stepNum {
          display: inline-grid;
          place-items: center;
          width: 34px;
          height: 34px;
          margin-bottom: 16px;
          border-radius: 999px;
          background: var(--am-accent-soft);
          color: var(--am-accent);
          font-family: var(--apimask-display);
          font-size: 15px;
          font-weight: 720;
        }

        .step h3 {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .step p {
          margin: 0;
          color: var(--am-muted);
          font-size: 14px;
          line-height: 1.6;
        }

        /* ---------- Products ---------- */
        .productGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .subLabel {
          margin: 48px 0 16px;
          color: var(--am-muted);
          font-size: 12px;
          font-weight: 680;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .toolGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        /* ---------- Features ---------- */
        .featureGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .feature {
          border: 1px solid var(--am-line);
          border-radius: var(--radius-lg);
          background: var(--am-card);
          padding: 24px;
          box-shadow: var(--am-shadow-sm);
        }

        .feature h3 {
          margin: 0 0 8px;
          padding-left: 14px;
          border-left: 2px solid var(--am-accent);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .feature p {
          margin: 0;
          color: var(--am-muted);
          font-size: 14px;
          line-height: 1.6;
        }

        /* ---------- Categories ---------- */
        .categoryList {
          border-top: 1px solid var(--am-line);
        }

        .categoryRow {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 4px;
          border-bottom: 1px solid var(--am-line);
          transition: background 150ms ease;
        }

        .categoryRow:hover {
          background: var(--am-surface-2);
        }

        .categoryName {
          flex: 0 0 220px;
          font-weight: 650;
          font-size: 15px;
          letter-spacing: -0.01em;
        }

        .categoryNote {
          flex: 1;
          color: var(--am-muted);
          font-size: 14px;
        }

        /* ---------- CTA ---------- */
        .ctaCard {
          --am-primary: #ffffff;
          --am-on-primary: #4c1d95;
          --am-primary-hover: #f3efff;
          --am-primary-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
          --am-line: rgba(255, 255, 255, 0.32);
          --am-card: rgba(255, 255, 255, 0.1);
          --am-ink: #ffffff;
          --am-muted: rgba(255, 255, 255, 0.82);
          --am-accent: #ffffff;
          --am-ring: rgba(255, 255, 255, 0.7);
          --am-shadow-sm: none;
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%);
          padding: 64px 40px;
          text-align: center;
          color: #ffffff;
        }

        .ctaCard h2 {
          margin-bottom: 14px;
        }

        .ctaCard p {
          max-width: 640px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.65;
        }

        .compact {
          justify-content: center;
          margin-top: 28px;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .heroInner {
            grid-template-columns: 1fr;
            gap: 40px;
            padding-top: 48px;
            padding-bottom: 64px;
          }

          .container {
            padding: 72px 24px;
          }

          .steps,
          .featureGrid,
          .productGrid,
          .toolGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .categoryRow {
            flex-wrap: wrap;
          }

          .categoryName {
            flex-basis: 100%;
          }
        }

        @media (max-width: 620px) {
          .heroInner,
          .container {
            padding-right: 18px;
            padding-left: 18px;
          }

          .lead {
            font-size: 16.5px;
          }

          .steps,
          .featureGrid,
          .productGrid,
          .toolGrid {
            grid-template-columns: 1fr;
          }

          .ctaCard {
            padding: 44px 22px;
          }
        }
      `}</style>
    </>
  );
}
