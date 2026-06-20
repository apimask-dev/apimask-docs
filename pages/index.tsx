import Head from "next/head";
import Link from "next/link";

const popularApis = [
  ["Email Validation", "Verify syntax, MX records, disposable domains, and role accounts."],
  ["Regex Generator", "Turn plain English descriptions into usable regular expressions."],
  ["JSON Formatter", "Validate, format, minify, and sort JSON for developer tools."],
  ["DNS Analyzer", "Inspect A, AAAA, MX, TXT, NS, CNAME, SPF, and DMARC records."],
  ["SSL Checker", "Check certificate validity, issuer, SANs, and expiration windows."],
  ["Security Headers", "Score browser security headers and surface missing protections."],
];

const useCases = [
  "Signup validation",
  "CI/CD automation",
  "Website audits",
  "Internal developer tools",
  "SEO operations",
  "Security checks",
];

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>ApiMask - Developer and Website Utility APIs</title>
        <meta
          name="description"
          content="ApiMask provides production-ready developer utility, email validation, DNS, SSL, security header, sitemap, and website audit APIs through RapidAPI."
        />
        <meta property="og:title" content="ApiMask - Developer and Website Utility APIs" />
        <meta
          property="og:description"
          content="Focused APIs for developers, SaaS teams, SEO tools, and website audit workflows. Available through RapidAPI."
        />
        <meta property="og:url" content="https://apimask.dev" />
        <meta property="og:type" content="website" />
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
            <a href="https://rapidapi.com/search/ApiMask">RapidAPI</a>
          </div>
        </nav>

        <section className="hero">
          <div className="heroCopy">
            <div className="heroBadges" aria-label="ApiMask launch details">
              <span>Available through RapidAPI</span>
              <span>20 live endpoint docs</span>
            </div>
            <h1>
              Practical APIs for <span>developer tools</span> and website intelligence.
            </h1>
            <p className="lead">
              ApiMask gives teams focused JSON APIs for email validation, regex generation,
              stacktrace analysis, DNS checks, SSL checks, security headers, sitemap
              validation, CORS checks, and everyday developer utilities.
            </p>
            <div className="actions">
              <a className="primaryAction" href="https://rapidapi.com/search/ApiMask">
                Find ApiMask on RapidAPI
              </a>
              <Link className="secondaryAction" href="/api">
                Explore API docs
              </Link>
            </div>
            <p className="integrationNote">
              RapidAPI handles keys, billing, quotas, and usage. ApiMask focuses on fast,
              focused endpoints with clear docs.
            </p>
            <div className="metrics" aria-label="ApiMask launch metrics">
              <span>
                <strong>20</strong>
                live endpoint docs
              </span>
              <span>
                <strong>2</strong>
                product groups
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
          <div>
            <p className="eyebrow">Product groups</p>
            <h2>Built for marketplace discovery and direct developer intent.</h2>
          </div>
          <div className="productGrid">
            <Link href="/api/developer-utilities" className="productCard">
              <span>Developer Utilities API</span>
              <p>
                Regex, stacktrace, README, changelog, JSON, Base64, hashes, IDs, and URL parsing.
              </p>
            </Link>
            <Link href="/api/email-domain-validation" className="productCard">
              <span>Email, Domain, and Website Utilities</span>
              <p>
                Email validation, DNS analysis, SSL checks, URL safety, security headers,
                robots.txt, sitemap, and CORS checks.
              </p>
            </Link>
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
            <a className="primaryAction" href="https://rapidapi.com/search/ApiMask">
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

        .secondaryAction:after {
          margin-left: 8px;
          content: "->";
          font-family: var(--apimask-mono);
          font-size: 13px;
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
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 34px;
          align-items: start;
          border-top: 1px solid #e2e5dd;
          border-bottom: 1px solid #e2e5dd;
        }

        .productGrid {
          grid-template-columns: 1fr;
        }

        .productCard {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        .productCard span {
          display: block;
          margin-bottom: 8px;
          font-size: 18px;
          font-weight: 760;
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

          .apiGrid {
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
