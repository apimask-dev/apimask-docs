import Head from "next/head";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg className="linkIcon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 3.5 9.5 8 5 12.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9.5 8H2.75" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

const popularApis = [
  ["QR Code Generator", "Create PNG/SVG QR codes for URLs, WiFi, and vCards with optional logo overlay."],
  ["AI Content Generator", "Generate SEO meta tags, summaries, rewrites, and product descriptions."],
  ["Bulk Email Verification", "Validate CSVs and lead lists with disposable, role-account, MX, SPF, and DMARC checks."],
  ["Email Validation", "Verify syntax, MX records, disposable domains, and role accounts."],
  ["Regex Generator", "Turn plain English descriptions into usable regular expressions."],
  ["DNS Analyzer", "Inspect A, AAAA, MX, TXT, NS, CNAME, SPF, and DMARC records."],
];

const useCases = [
  "Signup validation",
  "CI/CD automation",
  "Website audits",
  "Internal developer tools",
  "SEO operations",
  "Security checks",
];

// Forward-looking category map. "Live" groups are shippable today; the rest are
// on the public roadmap as ApiMask expands across categories. Kept honest with
// explicit status so we capture category search intent without overpromising.
const categories = [
  { name: "Developer utilities", status: "Live", note: "Regex, JSON, Base64, hashing, IDs, URL parsing" },
  { name: "AI content", status: "Live", note: "SEO meta tags, summaries, rewrites, descriptions" },
  { name: "Email & domain", status: "Live", note: "Validation, bulk lists, MX/DNS, deliverability" },
  { name: "Website & security", status: "Live", note: "SSL, security headers, robots.txt, sitemap, CORS" },
  { name: "QR codes", status: "Live", note: "URL, WiFi, vCard, branded logo QR codes" },
  { name: "SEO", status: "Live", note: "Meta tags, site audits, structured data checks" },
  { name: "OCR & PDF", status: "Soon", note: "PDF-to-Markdown, table & field extraction, OCR cleanup" },
  { name: "Resume & ATS", status: "Soon", note: "ATS scoring, keyword gaps, resume rewrite" },
  { name: "App Store / ASO", status: "Soon", note: "Metadata, keywords, release notes, review sentiment" },
  { name: "Data enrichment", status: "Soon", note: "Company, email, and domain enrichment" },
  { name: "Security & threat intel", status: "Soon", note: "URL safety, breach checks, header hardening" },
  { name: "AI agents & workflows", status: "Soon", note: "Tool endpoints and structured extraction for agents" },
];

const productGroups = [
  {
    icon: "QR",
    count: 6,
    title: "QR Code Generator API with Logo",
    copy: "PNG/SVG QR codes for URLs, WiFi, vCards, email, and SMS, with branded colors and optional logo overlay.",
    tags: ["Logo", "WiFi", "vCard", "SVG"],
    docs: "/api/qr-code-generator-api",
    rapidapi: "https://rapidapi.com/aftaab/api/qr-code-generator-api-with-logo",
  },
  {
    icon: "AI",
    count: 8,
    title: "AI Content Generator API",
    copy: "Summaries, rewrites, SEO meta tags, blog outlines, product descriptions, social captions, headlines, and FAQs.",
    tags: ["SEO", "Rewrite", "Captions", "FAQ"],
    docs: "/api/ai-content-generator-api",
    rapidapi: "https://rapidapi.com/aftaab/api/ai-content-generator-api",
  },
  {
    icon: "@",
    count: 5,
    title: "Bulk Email Verification API",
    copy: "Validate JSON batches and CSV uploads, flag disposable and role-account emails, and check MX, SPF, and DMARC readiness.",
    tags: ["CSV", "MX", "SPF", "DMARC"],
    docs: "/api/bulk-email-verification",
    rapidapi: "https://rapidapi.com/aftaab/api/bulk-email-verification-api",
  },
];

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
                  itemListElement: productGroups.map((group, index) => ({
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
        <nav className="nav" aria-label="Main navigation">
          <Link href="/" className="brand" aria-label="ApiMask home">
            <img className="brandMark" src="/apimask-logo.png" alt="" aria-hidden="true" />
            <span>ApiMask</span>
          </Link>
          <div className="navLinks">
            <Link href="/api">APIs</Link>
            <Link href="/quickstart">Quickstart</Link>
            <Link href="/authentication">Docs</Link>
            <a href="https://rapidapi.com/user/aftaab">RapidAPI</a>
          </div>
        </nav>

        <section className="hero">
          <div className="heroCopy">
            <div className="heroBadges" aria-label="ApiMask launch details">
              <span>Available through RapidAPI</span>
              <span>5 API products</span>
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
              <a className="primaryAction" href="https://rapidapi.com/user/aftaab">
                Find ApiMask on RapidAPI
              </a>
              <Link className="secondaryAction" href="/api">
                Explore API docs
                <ArrowIcon />
              </Link>
            </div>
            <p className="integrationNote">
              RapidAPI handles keys, billing, quotas, and usage. ApiMask focuses on fast,
              focused endpoints with clear docs.
            </p>
            <div className="metrics" aria-label="ApiMask launch metrics">
              <span>
                <strong>39</strong>
                live endpoints
              </span>
              <span>
                <strong>5</strong>
                API products
              </span>
              <span>
                <strong>JSON</strong>
                first responses
              </span>
            </div>
          </div>

          <div className="heroVisualWrap">
            <div className="heroVisual" aria-label="Example ApiMask API response">
              <div className="terminalTop">
                <div className="terminalMeta">
                  <span className="dot" />
                  <span>POST /v1/utility/dns/analyze</span>
                </div>
                <span className="status">200 OK</span>
              </div>
              <pre aria-label="Example JSON response">
                <code>
                  <span className="punct">{"{"}</span>
                  {"\n  "}
                  <span className="key">"success"</span>
                  <span className="punct">: </span>
                  <span className="bool">true</span>
                  <span className="punct">,</span>
                  {"\n  "}
                  <span className="key">"data"</span>
                  <span className="punct">: {"{"}</span>
                  {"\n    "}
                  <span className="key">"domain"</span>
                  <span className="punct">: </span>
                  <span className="string">"example.com"</span>
                  <span className="punct">,</span>
                  {"\n    "}
                  <span className="key">"mx_records"</span>
                  <span className="punct">: []</span>
                  <span className="punct">,</span>
                  {"\n    "}
                  <span className="key">"spf"</span>
                  <span className="punct">: </span>
                  <span className="null">null</span>
                  <span className="punct">,</span>
                  {"\n    "}
                  <span className="key">"dmarc"</span>
                  <span className="punct">: </span>
                  <span className="null">null</span>
                  {"\n  "}
                  <span className="punct">{"}"}</span>
                  <span className="punct">,</span>
                  {"\n  "}
                  <span className="key">"error"</span>
                  <span className="punct">: </span>
                  <span className="null">null</span>
                  <span className="punct">,</span>
                  {"\n  "}
                  <span className="key">"meta"</span>
                  <span className="punct">: {"{}"}</span>
                  {"\n"}
                  <span className="punct">{"}"}</span>
                </code>
              </pre>
              <div className="terminalFooter">
                <span>DNS + SSL + Headers</span>
                <span>
                  <strong>92ms</strong> cached response
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="strip" aria-label="ApiMask use cases">
          <div className="marqueeTrack">
            {[...useCases, ...useCases, ...useCases].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">
            <p className="eyebrow">Live APIs</p>
            <h2>Start with high-intent utility endpoints.</h2>
            <p>
              The first ApiMask launch focuses on APIs that are easy to test, easy to
              integrate, and useful inside real products.
            </p>
          </div>

          <div className="apiGrid">
            {popularApis.map(([title, copy]) => (
              <article className="apiCard" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="productBand">
          <div className="productBandHeader">
            <div className="productBandIntro">
              <p className="eyebrow">Featured products</p>
              <h2>Start with the collections buyers search for first.</h2>
              <p className="productBandLead">
                These are highlighted collections. The complete API catalog stays one
                click away for teams comparing the full platform.
              </p>
            </div>
            <Link href="/api" className="browseAll">
              Browse all APIs
              <ArrowIcon />
            </Link>
          </div>
          <div className="productGrid">
            {productGroups.map((group) => (
              <article className="productCard" key={group.title}>
                <div className="productTop">
                  <span className="productIcon">{group.icon}</span>
                  <span className="productCount">{group.count} endpoints</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <div className="tagRow">
                  {group.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="cardActions">
                  <Link href={group.docs} className="cardDocs">
                    View docs
                  </Link>
                  <a
                    className="cardRapid"
                    href={group.rapidapi}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Subscribe on RapidAPI
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section categories">
          <div className="sectionHeader">
            <p className="eyebrow">The roadmap</p>
            <h2>One API key. A platform that keeps expanding.</h2>
            <p>
              ApiMask is built as a modular API ecosystem. Today it covers developer
              utilities, AI content, bulk email validation, SEO, security, and
              website intelligence. It is expanding into OCR, PDF, resume and ATS,
              app store intelligence, data enrichment, and AI agent tooling.
            </p>
          </div>

          <div className="categoryGrid">
            {categories.map((category) => (
              <article className="categoryCard" key={category.name}>
                <div className="categoryTop">
                  <h3>{category.name}</h3>
                  <span
                    className={`statusPill ${category.status === "Live" ? "live" : "soon"}`}
                  >
                    {category.status}
                  </span>
                </div>
                <p>{category.note}</p>
              </article>
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
            <a className="primaryAction" href="https://rapidapi.com/user/aftaab">
              Open RapidAPI
            </a>
            <Link className="secondaryAction" href="/quickstart">
              Read quickstart
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        .landing {
          min-height: 100vh;
          background: #f4f5f1;
          color: #12140f;
          font-family: var(--apimask-sans);
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 28px;
        }

        .brand,
        .navLinks,
        .actions,
        .metrics,
        .strip,
        .terminalTop {
          display: flex;
          align-items: center;
        }

        .brand {
          gap: 10px;
          color: #12140f;
          font-weight: 760;
          font-family: var(--apimask-display);
          text-decoration: none;
        }

        .brandMark {
          width: 34px;
          height: 34px;
          border-radius: 7px;
          background: #ffffff;
          object-fit: cover;
          box-shadow: 0 10px 24px rgba(50, 18, 106, 0.12);
        }

        .navLinks {
          gap: 22px;
          font-size: 14px;
        }

        .navLinks a {
          color: #373b32;
          text-decoration: none;
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(500px, 1.08fr);
          gap: 54px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 74px 28px 72px;
          align-items: center;
        }

        .heroCopy {
          max-width: 560px;
        }

        .heroBadges {
          display: flex;
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
          color: #32126a;
          font-size: 12px;
          font-weight: 760;
          text-transform: uppercase;
          box-shadow: 0 8px 26px rgba(50, 18, 106, 0.06);
        }

        .eyebrow {
          margin: 0 0 12px;
          color: #276749;
          font-size: 13px;
          font-weight: 760;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
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
          color: #32126a;
        }

        h2 {
          margin-bottom: 16px;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.04;
          letter-spacing: 0;
          font-family: var(--apimask-display);
        }

        h3 {
          margin-bottom: 10px;
          font-size: 18px;
          letter-spacing: 0;
          font-family: var(--apimask-display);
        }

        .lead,
        .sectionHeader p,
        .cta p,
        .productCard p,
        .apiCard p {
          color: #4c5148;
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

        .primaryAction,
        .secondaryAction {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 720;
          text-decoration: none;
        }

        .primaryAction {
          background: #11140f;
          color: #ffffff;
          box-shadow: 0 14px 28px rgba(17, 20, 15, 0.16);
        }

        .secondaryAction {
          border: 1px solid transparent;
          background: transparent;
          color: #171a14;
        }

        :global(.linkIcon) {
          width: 15px;
          height: 15px;
          margin-left: 7px;
          transition: transform 160ms ease;
        }

        .secondaryAction:hover :global(.linkIcon),
        .browseAll:hover :global(.linkIcon),
        .cardRapid:hover :global(.linkIcon) {
          transform: translateX(3px);
        }

        .integrationNote {
          max-width: 560px;
          margin: 16px 0 0;
          color: #696f65;
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
          border-left: 1px solid #d8ddd2;
          padding-left: 16px;
          color: #62675d;
          font-size: 13px;
        }

        .metrics strong {
          display: block;
          color: #12140f;
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

        .heroVisual {
          position: relative;
          z-index: 1;
          border: 1px solid #20251d;
          border-radius: 10px;
          overflow: hidden;
          background: #11140f;
          box-shadow: 0 34px 90px rgba(17, 20, 15, 0.22);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #8bd6a5;
          box-shadow: 0 0 0 4px rgba(139, 214, 165, 0.18);
        }

        .terminalTop {
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding: 16px 20px;
          color: #d7ddce;
          font-family: var(--apimask-mono);
          font-size: 13px;
        }

        .terminalMeta {
          display: inline-flex;
          min-width: 0;
          align-items: center;
          gap: 10px;
        }

        .terminalMeta span:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .status {
          color: #8bd6a5;
          white-space: nowrap;
        }

        pre {
          margin: 0;
          padding: 34px 42px;
          overflow-x: auto;
          color: #dfe8dc;
          font-family: var(--apimask-mono);
          font-size: 14px;
          line-height: 1.78;
        }

        code {
          font-family: var(--apimask-mono);
        }

        .key {
          color: #8bd6a5;
        }

        .string {
          color: #f2d38b;
        }

        .bool {
          color: #93c5fd;
        }

        .null {
          color: #c4b5fd;
        }

        .punct {
          color: #dfe8dc;
        }

        .terminalFooter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 13px 20px;
          color: #aeb8aa;
          font-size: 13px;
          font-weight: 650;
        }

        .terminalFooter span:first-child {
          color: #f4f7f0;
        }

        .terminalFooter strong {
          color: #8bd6a5;
          font-family: var(--apimask-mono);
          font-size: 14px;
        }

        .strip {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: #070807;
          padding: 16px 0;
          white-space: nowrap;
        }

        .marqueeTrack {
          display: flex;
          width: max-content;
          align-items: center;
          gap: 14px;
          animation: marquee 28s linear infinite;
          will-change: transform;
        }

        .strip span {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          padding: 0 18px;
          color: #f4f7f0;
          font-size: 13px;
          font-weight: 680;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marqueeTrack {
            animation: none;
            transform: none;
          }
        }

        .section,
        .productBand,
        .cta {
          max-width: 1180px;
          margin: 0 auto;
          padding: 78px 28px;
        }

        .sectionHeader {
          max-width: 720px;
          margin-bottom: 34px;
        }

        .apiGrid,
        .productGrid {
          display: grid;
          gap: 16px;
        }

        .apiGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .apiCard,
        .productCard {
          border: 1px solid #d8ddd2;
          border-radius: 8px;
          background: #ffffff;
          padding: 22px;
        }

        .productBand {
          display: block;
          border-top: 1px solid #e2e5dd;
          border-bottom: 1px solid #e2e5dd;
        }

        .productBandHeader {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }

        .productBandIntro h2 {
          max-width: 640px;
          margin-bottom: 16px;
        }

        .productBandLead {
          max-width: 520px;
          margin: 0;
          color: #5c6258;
          font-size: 17px;
          line-height: 1.65;
        }

        .browseAll {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          border: 1px solid #d2d7cc;
          border-radius: 7px;
          background: #ffffff;
          padding: 11px 16px;
          color: #11140f;
          font-size: 14px;
          font-weight: 720;
          text-decoration: none;
          transition:
            border-color 160ms ease,
            transform 160ms ease;
        }

        .browseAll:hover {
          border-color: rgba(50, 18, 106, 0.4);
          transform: translateY(-1px);
        }

        .productGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .productCard {
          display: flex;
          flex-direction: column;
          gap: 14px;
          color: inherit;
          text-decoration: none;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        .productCard:hover {
          border-color: rgba(50, 18, 106, 0.22);
          box-shadow: 0 18px 48px rgba(17, 20, 15, 0.08);
          transform: translateY(-2px);
        }

        .productTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .productIcon {
          display: inline-grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 8px;
          background: #f1edf8;
          color: #32126a;
          font-family: var(--apimask-mono);
          font-size: 15px;
          font-weight: 800;
        }

        .productCount {
          border: 1px solid #e0d8ec;
          border-radius: 999px;
          padding: 6px 10px;
          color: #32126a;
          font-size: 12px;
          font-weight: 740;
        }

        .productCard h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 760;
        }

        .productCard p {
          margin: 0;
        }

        .tagRow {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tagRow span {
          border: 1px solid #dfe4d9;
          border-radius: 999px;
          background: #f8f9f6;
          padding: 5px 9px;
          color: #50564d;
          font-size: 12px;
          font-weight: 650;
        }

        .cardActions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 18px;
          margin-top: auto;
          padding-top: 4px;
        }

        .cardDocs,
        .cardRapid {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          font-weight: 720;
          text-decoration: none;
        }

        .cardDocs {
          color: #4c5148;
        }

        .cardDocs:hover {
          color: #11140f;
        }

        .cardRapid {
          color: #32126a;
        }

        .categories {
          border-top: 1px solid #e2e5dd;
        }

        .categoryGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
          gap: 14px;
        }

        .categoryCard {
          border: 1px solid #d8ddd2;
          border-radius: 8px;
          background: #ffffff;
          padding: 18px 20px;
        }

        .categoryTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .categoryCard h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 760;
        }

        .categoryCard p {
          margin: 0;
          font-size: 14px;
        }

        .statusPill {
          flex-shrink: 0;
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 11px;
          font-weight: 740;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .statusPill.live {
          background: #e6f4ea;
          color: #276749;
        }

        .statusPill.soon {
          background: #f1edf8;
          color: #32126a;
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
          .nav {
            align-items: flex-start;
            gap: 18px;
            flex-direction: column;
          }

          .navLinks {
            width: 100%;
            justify-content: space-between;
            gap: 12px;
            overflow-x: auto;
          }

          .hero,
          .productBand {
            grid-template-columns: 1fr;
          }

          .productIntro {
            position: static;
          }

          .hero {
            padding-top: 48px;
            gap: 36px;
          }

          .heroVisualWrap {
            min-height: auto;
          }

          .heroVisualWrap:before {
            inset: 24px 16px 6px;
          }

          .apiGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .productGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .nav,
          .hero,
          .section,
          .productBand,
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

          .apiGrid,
          .productGrid {
            grid-template-columns: 1fr;
          }

          .heroVisual {
            min-width: 0;
          }

          pre {
            padding: 22px 20px 26px;
            font-size: 13px;
          }

          .terminalTop {
            align-items: flex-start;
            flex-direction: column;
            padding: 14px 16px;
          }

          .terminalFooter {
            align-items: flex-start;
            flex-direction: column;
            padding: 12px 16px;
          }
        }
      `}</style>
    </>
  );
}
