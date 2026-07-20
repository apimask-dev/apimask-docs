import Head from "next/head";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
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
  liveCategoryCount,
} from "../lib/products";

const RAPIDAPI_URL = "https://rapidapi.com/user/aftaab";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>ApiMask - Developer, AI, Email, Domain &amp; Website APIs</title>
        <link rel="canonical" href="https://apimask.dev" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#32126a" />
        <meta name="application-name" content="ApiMask" />
        <meta name="apple-mobile-web-app-title" content="ApiMask" />
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="ApiMask, RapidAPI APIs, developer utilities API, bulk email verification API, email validation API, DNS analyzer API, SSL checker API, security headers analyzer API, JSON formatter API"
        />
        <meta
          name="description"
          content="ApiMask is a growing platform of production-ready APIs: developer utilities, AI content, bulk email verification, domain validation, SEO, security, and website intelligence. Clean JSON responses, available through RapidAPI."
        />
        <meta property="og:title" content="ApiMask - Developer, AI, Email, Domain & Website APIs" />
        <meta
          property="og:description"
          content="Focused APIs for developers, SaaS teams, SEO tools, and website audit workflows. Available through RapidAPI."
        />
        <meta property="og:url" content="https://apimask.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ApiMask" />
        <meta property="og:image" content="https://apimask.dev/apimask-logo.png" />
        <meta property="og:image:alt" content="ApiMask logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ApiMask - Developer and Website Utility APIs" />
        <meta
          name="twitter:description"
          content="Focused APIs for developers, SaaS teams, SEO tools, and website audit workflows. Available through RapidAPI."
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
                    "ApiMask is a growing platform of production-ready APIs for developers, startups, and AI-powered apps.",
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
                  name: "ApiMask APIs",
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

      <main className="landing">
        <SiteNav variant="landing" />

        <section className="hero">
          <div className="heroCopy">
            <div className="heroBadges" aria-label="ApiMask launch details">
              <span>Available through RapidAPI</span>
              <span>{liveEndpointCount} live endpoints</span>
            </div>
            <h1>
              Practical APIs for <span>developer tools</span> and website intelligence.
            </h1>
            <p className="lead">
              ApiMask gives teams focused JSON APIs for QR code generation, AI content,
              bulk email verification, regex generation, DNS and SSL checks, security
              headers, and everyday developer utilities. All available through RapidAPI.
            </p>
            <div className="actions">
              <Button href={RAPIDAPI_URL} variant="primary" external>
                Find ApiMask on RapidAPI
              </Button>
              <Button href="/api" variant="secondary" icon={<ArrowIcon />}>
                Explore API docs
              </Button>
            </div>
            <p className="integrationNote">
              RapidAPI handles keys, billing, quotas, and usage. ApiMask focuses on fast,
              focused endpoints with clear docs.
            </p>
            <div className="metrics" aria-label="ApiMask launch metrics">
              <span>
                <strong>{liveEndpointCount}</strong>
                live endpoints
              </span>
              <span>
                <strong>{liveCategoryCount}</strong>
                categories
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
        </section>

        <section className="trustStrip" aria-label="ApiMask at a glance">
          <Badge tone="neutral">{liveEndpointCount} live endpoints</Badge>
          <Badge tone="neutral">{flagshipProducts.length + quickTools.length} API tools</Badge>
          <Badge tone="neutral">Available through RapidAPI</Badge>
        </section>

        <section className="section">
          <div className="sectionHeader">
            <p className="eyebrow">Products</p>
            <h2>Start with high-intent utility endpoints.</h2>
            <p>
              The first ApiMask launch focuses on APIs that are easy to test, easy to
              integrate, and useful inside real products.
            </p>
          </div>

          <div className="productGrid">
            {flagshipProducts.map((group) => (
              <FlagshipProductCard key={group.title} {...group} />
            ))}
          </div>

          <p className="subLabel">More utilities</p>
          <div className="toolGrid">
            {quickTools.map((tool) => (
              <QuickToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </section>

        <section className="section categories">
          <div className="sectionHeader">
            <p className="eyebrow">What&apos;s next</p>
            <h2>One API key. A platform that keeps expanding.</h2>
            <p>
              ApiMask is built as a modular API ecosystem. Today it covers developer
              utilities, AI content, email and domain validation, SEO, security, website
              intelligence, and social/app data. It is expanding into OCR, PDF, resume and
              ATS, app store intelligence, data enrichment, and AI agent tooling.
            </p>
          </div>

          <div className="categoryList">
            {categories.map((category) => (
              <div className="categoryRow" key={category.name}>
                <span className="categoryName">{category.name}</span>
                <span className="categoryNote">{category.note}</span>
                <Badge tone={category.status === "Live" ? "green" : "soon"}>{category.status}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <p className="eyebrow">No custom billing setup</p>
          <h2>Subscribe on RapidAPI. Build with the docs here.</h2>
          <p>
            RapidAPI handles subscriptions, keys, limits, payments, and usage. ApiMask.dev
            gives you the product overview, schemas, examples, and endpoint behavior.
          </p>
          <div className="actions compact">
            <Button href={RAPIDAPI_URL} variant="primary" external>
              Open RapidAPI
            </Button>
            <Button href="/quickstart" variant="secondary">
              Read quickstart
            </Button>
          </div>
        </section>
      </main>

      <style jsx>{`
        .landing {
          min-height: 100vh;
          background: var(--apimask-surface);
          color: var(--apimask-ink);
          font-family: var(--apimask-sans);
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(500px, 1.08fr);
          gap: 54px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 54px 28px 72px;
          align-items: center;
        }

        .heroCopy {
          max-width: 560px;
        }

        .heroBadges,
        .actions,
        .metrics {
          display: flex;
          align-items: center;
        }

        .heroBadges {
          gap: 10px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .heroBadges span {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          border: 1px solid rgba(50, 18, 106, 0.16);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          padding: 0 13px;
          color: var(--apimask-accent-purple);
          font-size: 12px;
          font-weight: 760;
          text-transform: uppercase;
          box-shadow: 0 8px 26px rgba(50, 18, 106, 0.06);
        }

        html.dark .heroBadges span {
          background: rgba(255, 255, 255, 0.06);
        }

        .eyebrow {
          margin: 0 0 12px;
          color: var(--apimask-accent-green);
          font-size: 13px;
          font-weight: 760;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        h1,
        h2,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 590px;
          margin-bottom: 24px;
          font-size: clamp(52px, 4.5vw, 76px);
          line-height: 0.94;
          letter-spacing: 0;
          font-family: var(--apimask-display);
        }

        h1 span {
          color: var(--apimask-accent-purple);
        }

        h2 {
          margin-bottom: 16px;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.04;
          letter-spacing: 0;
          font-family: var(--apimask-display);
        }

        .lead,
        .sectionHeader p,
        .cta p {
          color: var(--apimask-muted);
          line-height: 1.65;
        }

        .lead {
          max-width: 590px;
          margin-bottom: 28px;
          font-size: 19px;
        }

        .actions {
          gap: 12px;
          flex-wrap: wrap;
        }

        .integrationNote {
          max-width: 560px;
          margin: 16px 0 0;
          color: var(--apimask-muted);
          font-size: 14px;
          line-height: 1.55;
        }

        .metrics {
          gap: 18px;
          margin-top: 34px;
          flex-wrap: wrap;
        }

        .metrics span {
          min-width: 132px;
          border-left: 1px solid var(--apimask-line);
          padding-left: 16px;
          color: var(--apimask-muted);
          font-size: 13px;
        }

        .metrics strong {
          display: block;
          color: var(--apimask-ink);
          font-size: 22px;
          line-height: 1.2;
        }

        .heroVisualWrap {
          position: relative;
          display: grid;
          align-items: center;
          min-height: 500px;
        }

        .heroVisualWrap:before {
          position: absolute;
          inset: 44px 38px 18px 28px;
          border: 1px solid rgba(50, 18, 106, 0.08);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.5);
          content: "";
          transform: rotate(-2deg);
        }

        html.dark .heroVisualWrap:before {
          background: rgba(255, 255, 255, 0.03);
        }

        .trustStrip {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          max-width: 1180px;
          margin: 0 auto;
          border-top: 1px solid var(--apimask-line);
          border-bottom: 1px solid var(--apimask-line);
          padding: 20px 28px;
        }

        .section,
        .cta {
          max-width: 1180px;
          margin: 0 auto;
          padding: 78px 28px;
        }

        .sectionHeader {
          max-width: 720px;
          margin-bottom: 34px;
        }

        .productGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .subLabel {
          margin: 44px 0 16px;
          color: var(--apimask-muted);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .toolGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .categories {
          border-top: 1px solid var(--apimask-line);
        }

        .categoryList {
          border-top: 1px solid var(--apimask-line);
        }

        .categoryRow {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--apimask-line);
        }

        .categoryName {
          flex: 0 0 220px;
          font-weight: 700;
          font-size: 15px;
        }

        .categoryNote {
          flex: 1;
          color: var(--apimask-muted);
          font-size: 14px;
        }

        .cta {
          text-align: center;
        }

        .cta p {
          max-width: 680px;
          margin-right: auto;
          margin-left: auto;
        }

        .compact {
          justify-content: center;
          margin-top: 24px;
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .hero {
            padding-top: 40px;
            gap: 36px;
          }

          .heroVisualWrap {
            min-height: auto;
          }

          .heroVisualWrap:before {
            inset: 24px 16px 6px;
          }

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
          .hero,
          .section,
          .cta {
            padding-right: 18px;
            padding-left: 18px;
          }

          h1 {
            font-size: 44px;
          }

          .lead {
            font-size: 17px;
          }

          .productGrid,
          .toolGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
