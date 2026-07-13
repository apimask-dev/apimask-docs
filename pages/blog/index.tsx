import Head from "next/head";
import Link from "next/link";
import { blogPosts as posts } from "../../components/blog-posts";

const paths = [
  {
    title: "For SaaS teams",
    copy: "Validate emails, qualify domains, and keep activation flows clean before bad data reaches product analytics.",
    links: ["Email validation", "Bulk verification", "Domain DNS checks"],
  },
  {
    title: "For builders",
    copy: "Debug the boring but costly edges of web apps: CORS, SSL, headers, URLs, JSON, regex, and internal utilities.",
    links: ["CORS debugging", "Security headers", "Developer utilities"],
  },
  {
    title: "For SEO and ops",
    copy: "Turn technical website checks into repeatable workflows that can run inside dashboards, audits, and client reports.",
    links: ["Sitemaps", "Robots.txt", "SEO metadata"],
  },
];

function ArrowIcon() {
  return (
    <svg className="linkIcon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 3.5 9.5 8 5 12.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9.5 8H2.75" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Head>
        <title>ApiMask Blog - API Guides, SEO Automation, and Developer Workflows</title>
        <meta
          name="description"
          content="Read practical ApiMask guides about email validation, DNS, security headers, CORS, QR code APIs, SEO automation, and website audit workflows."
        />
        <link rel="canonical" href="https://apimask.dev/blog" />
        <meta property="og:title" content="ApiMask Blog - API Guides and Developer Workflows" />
        <meta
          property="og:description"
          content="Long-form guides for developers, SaaS teams, SEO teams, and founders who want to automate validation, website checks, QR generation, and API workflows."
        />
        <meta property="og:url" content="https://apimask.dev/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://apimask.dev/apimask-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="blogPage">
        <nav className="nav" aria-label="Main navigation">
          <Link href="/" className="brand" aria-label="ApiMask home">
            <img className="brandMark" src="/apimask-logo.png" alt="" aria-hidden="true" />
            <span>ApiMask</span>
          </Link>
          <div className="navLinks">
            <Link href="/api">APIs</Link>
            <Link href="/quickstart">Quickstart</Link>
            <Link href="/blog" aria-current="page">Blog</Link>
            <Link href="/authentication">Docs</Link>
            <a href="https://rapidapi.com/user/aftaab">RapidAPI</a>
          </div>
        </nav>

        <section className="hero">
          <p className="eyebrow">ApiMask Blog</p>
          <h1>API guides that turn messy web problems into clean workflows.</h1>
          <p className="lead">
            Practical writing for developers, founders, SEO operators, and SaaS teams who need to understand the problem before automating it.
          </p>
          <div className="heroActions">
            <Link className="primaryAction" href="#latest">
              Start reading
            </Link>
            <Link className="secondaryAction" href="/api">
              Browse APIs <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="featured" aria-label="Featured article">
          <Link href={featured.href} className="featuredLink">
            <div className="featuredMeta">
              <span>Featured</span>
              <span>{featured.category}</span>
              <span>{featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <span className="readCta">
              Read the article <ArrowIcon />
            </span>
          </Link>
        </section>

        <section id="latest" className="latest">
          <div className="sectionHead">
            <p className="eyebrow">Latest guides</p>
            <h2>Deep dives, not filler posts.</h2>
            <p className="sectionLead">
              Built to answer developer questions, support SEO, and make the ApiMask product surface easier to understand.
            </p>
          </div>

          <div className="postList">
            {rest.map((post) => (
              <Link key={post.href} href={post.href} className="postRow">
                <div className="postMain">
                  <div className="postMeta">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <span className="readCta">
                  Read <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="paths" aria-label="Reading paths">
          <div className="sectionHead">
            <p className="eyebrow">Reading paths</p>
            <h2>Pick the problem you are trying to solve.</h2>
          </div>
          <div className="pathGrid">
            {paths.map((path) => (
              <article key={path.title} className="pathCard">
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <div className="chipRow">
                  {path.links.map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="apiRail" aria-label="ApiMask APIs">
          <div>
            <p className="eyebrow">Build with ApiMask</p>
            <h2>Use the APIs behind the guides.</h2>
            <p>
              The blog teaches the concepts. ApiMask gives you focused endpoints for email validation, DNS checks, SSL, CORS, security headers, QR generation, SEO metadata, and developer utilities.
            </p>
          </div>
          <div className="apiLinks">
            {posts.map((post) => (
              <Link key={post.api} href={post.api}>
                {post.category} <ArrowIcon />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .blogPage {
          min-height: 100vh;
          background: #f4f5f1;
          color: #12140f;
          font-family: var(--apimask-sans);
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 860px;
          margin: 0 auto;
          padding: 22px 28px;
        }

        .brand,
        .navLinks,
        .heroActions,
        .featuredMeta,
        .postMeta,
        .readCta,
        .apiLinks a {
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

        .navLinks a[aria-current="page"] {
          color: #12140f;
          font-weight: 700;
        }

        .hero,
        .featured,
        .latest,
        .paths,
        .apiRail {
          max-width: 860px;
          margin: 0 auto;
          padding-right: 28px;
          padding-left: 28px;
        }

        .hero {
          padding-top: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid #d8ddd2;
        }

        .eyebrow {
          margin: 0 0 12px;
          color: #276749;
          font-size: 13px;
          font-weight: 760;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          max-width: 720px;
          margin-bottom: 18px;
          font-size: clamp(36px, 5vw, 52px);
          line-height: 1.05;
          font-family: var(--apimask-display);
        }

        h2 {
          margin-bottom: 12px;
          font-size: clamp(26px, 3.5vw, 34px);
          line-height: 1.12;
          font-family: var(--apimask-display);
        }

        h3 {
          margin-bottom: 8px;
          font-size: 20px;
          line-height: 1.25;
          font-family: var(--apimask-display);
        }

        .lead {
          max-width: 620px;
          margin-bottom: 24px;
          color: #4c5148;
          font-size: 17px;
          line-height: 1.65;
        }

        .heroActions {
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
          color: #171a14;
        }

        .featured {
          padding-top: 36px;
          padding-bottom: 8px;
        }

        .featuredLink {
          display: block;
          padding: 8px 0 36px;
          border-bottom: 1px solid #d8ddd2;
          color: inherit;
          text-decoration: none;
        }

        .featuredLink:hover h2,
        .postRow:hover h3 {
          color: #32126a;
        }

        .featuredMeta,
        .postMeta {
          gap: 10px;
          margin-bottom: 12px;
          color: #696f65;
          font-size: 13px;
          font-weight: 650;
          flex-wrap: wrap;
        }

        .featuredMeta span:first-child {
          color: #276749;
          font-weight: 760;
          text-transform: uppercase;
        }

        .featuredLink h2 {
          max-width: 720px;
          margin-bottom: 12px;
          font-size: clamp(28px, 4vw, 36px);
        }

        .featuredLink p,
        .postMain p,
        .pathCard p,
        .apiRail p,
        .sectionLead {
          color: #4c5148;
          line-height: 1.65;
        }

        .featuredLink p {
          max-width: 640px;
          margin-bottom: 18px;
          font-size: 16px;
        }

        .readCta {
          color: #32126a;
          font-size: 14px;
          font-weight: 720;
          white-space: nowrap;
        }

        .latest,
        .paths {
          padding-top: 56px;
        }

        .sectionHead {
          max-width: 640px;
          margin-bottom: 8px;
        }

        .sectionLead {
          margin-bottom: 8px;
          font-size: 16px;
        }

        .postList {
          border-top: 1px solid #d8ddd2;
        }

        .postRow {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: start;
          padding: 28px 0;
          border-bottom: 1px solid #d8ddd2;
          color: inherit;
          text-decoration: none;
        }

        .postMain h3 {
          max-width: 640px;
          margin-bottom: 8px;
          font-size: 22px;
        }

        .postMain p {
          max-width: 620px;
          margin-bottom: 0;
          font-size: 15px;
        }

        .postRow .readCta {
          padding-top: 28px;
        }

        .pathGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .pathCard {
          border: 1px solid #d8ddd2;
          border-radius: 10px;
          background: #ffffff;
          padding: 22px;
        }

        .pathCard p {
          margin-bottom: 0;
          font-size: 14px;
        }

        .chipRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .chipRow span {
          border: 1px solid #d8ddd2;
          border-radius: 999px;
          background: #f8f9f6;
          padding: 5px 10px;
          color: #373b32;
          font-size: 12px;
          font-weight: 650;
        }

        .apiRail {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(240px, 0.7fr);
          gap: 28px;
          align-items: start;
          margin-top: 56px;
          margin-bottom: 72px;
          border: 1px solid #d8ddd2;
          border-radius: 10px;
          background: #ffffff;
          padding: 28px;
        }

        .apiRail p {
          margin-bottom: 0;
          font-size: 15px;
        }

        .apiLinks {
          display: grid;
          gap: 8px;
        }

        .apiLinks a {
          justify-content: space-between;
          border: 1px solid #d8ddd2;
          border-radius: 7px;
          background: #f8f9f6;
          padding: 12px 14px;
          color: #11140f;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
        }

        .apiLinks a:hover {
          border-color: rgba(50, 18, 106, 0.28);
          background: #ffffff;
        }

        :global(.linkIcon) {
          width: 15px;
          height: 15px;
          margin-left: 7px;
          flex-shrink: 0;
          transition: transform 160ms ease;
        }

        .featuredLink:hover :global(.linkIcon),
        .postRow:hover :global(.linkIcon),
        .apiLinks a:hover :global(.linkIcon),
        .secondaryAction:hover :global(.linkIcon) {
          transform: translateX(3px);
        }

        @media (max-width: 800px) {
          .nav {
            align-items: flex-start;
            gap: 16px;
            flex-direction: column;
          }

          .navLinks {
            flex-wrap: wrap;
            gap: 12px 18px;
          }

          .postRow {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .postRow .readCta {
            padding-top: 0;
          }

          .pathGrid,
          .apiRail {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .nav,
          .hero,
          .featured,
          .latest,
          .paths,
          .apiRail {
            padding-right: 18px;
            padding-left: 18px;
          }

          h1 {
            font-size: 34px;
          }

          .lead {
            font-size: 16px;
          }

          .apiRail {
            padding: 22px 18px;
          }
        }
      `}</style>
    </>
  );
}
