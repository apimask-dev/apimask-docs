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
            <span className="brandMark">AM</span>
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
            <p className="eyebrow">Available through RapidAPI</p>
            <h1>Practical APIs for developer tools and website intelligence.</h1>
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

          <div className="heroVisual" aria-label="Example ApiMask API response">
            <div className="terminalTop">
              <span>POST /v1/utility/dns/analyze</span>
              <span>200 OK</span>
            </div>
            <pre>{`{
  "success": true,
  "data": {
    "domain": "example.com",
    "mx_records": [],
    "spf": null,
    "dmarc": null
  },
  "error": null,
  "meta": {}
}`}</pre>
          </div>
        </section>

        <section className="strip" aria-label="ApiMask use cases">
          {useCases.map((item) => (
            <span key={item}>{item}</span>
          ))}
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
          background: #f7f8f6;
          color: #12140f;
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
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
          text-decoration: none;
        }

        .brandMark {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 8px;
          background: #12140f;
          color: #f7f8f6;
          font-size: 12px;
          letter-spacing: 0;
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
          grid-template-columns: minmax(0, 1.03fr) minmax(360px, 0.97fr);
          gap: 54px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 82px 28px 64px;
          align-items: center;
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
          max-width: 760px;
          margin-bottom: 22px;
          font-size: clamp(44px, 7vw, 82px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        h2 {
          margin-bottom: 16px;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.04;
          letter-spacing: 0;
        }

        h3 {
          margin-bottom: 10px;
          font-size: 18px;
          letter-spacing: 0;
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
          max-width: 680px;
          margin-bottom: 30px;
          font-size: 19px;
        }

        .actions {
          gap: 12px;
          flex-wrap: wrap;
        }

        .primaryAction,
        .secondaryAction {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 720;
          text-decoration: none;
        }

        .primaryAction {
          background: #11140f;
          color: #ffffff;
        }

        .secondaryAction {
          border: 1px solid #c9cec3;
          background: #ffffff;
          color: #171a14;
        }

        .metrics {
          gap: 24px;
          margin-top: 34px;
          flex-wrap: wrap;
        }

        .metrics span {
          color: #62675d;
          font-size: 13px;
        }

        .metrics strong {
          display: block;
          color: #12140f;
          font-size: 22px;
          line-height: 1.2;
        }

        .heroVisual {
          border: 1px solid #20251d;
          border-radius: 8px;
          overflow: hidden;
          background: #11140f;
          box-shadow: 0 24px 70px rgba(17, 20, 15, 0.24);
        }

        .terminalTop {
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding: 14px 16px;
          color: #d7ddce;
          font-size: 13px;
        }

        .terminalTop span:last-child {
          color: #8bd6a5;
        }

        pre {
          margin: 0;
          padding: 24px;
          overflow-x: auto;
          color: #ecf1e8;
          font-size: 14px;
          line-height: 1.75;
        }

        .strip {
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 28px 60px;
        }

        .strip span {
          border: 1px solid #d8ddd2;
          border-radius: 999px;
          background: #ffffff;
          padding: 8px 13px;
          color: #40463b;
          font-size: 13px;
          font-weight: 650;
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
        }
      `}</style>
    </>
  );
}
