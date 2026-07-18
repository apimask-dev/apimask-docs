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
    <svg className="blogLinkIcon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M5 3.5 9.5 8 5 12.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.5 8H2.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
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
        {/* Prefetch the featured guide and first list items for faster first clicks */}
        <link rel="prefetch" href={featured.href} as="document" />
        {rest.slice(0, 2).map((post) => (
          <link key={post.href} rel="prefetch" href={post.href} as="document" />
        ))}
      </Head>

      <main className="blogPage">
        <nav className="blogNav" aria-label="Main navigation">
          <Link href="/" className="blogBrand" aria-label="ApiMask home" prefetch={false}>
            <img
              className="blogBrandMark"
              src="/apimask-logo.png"
              alt=""
              width={34}
              height={34}
              decoding="async"
              aria-hidden="true"
            />
            <span>ApiMask</span>
          </Link>
          <div className="blogNavLinks">
            <Link href="/api" prefetch={false}>
              APIs
            </Link>
            <Link href="/quickstart" prefetch={false}>
              Quickstart
            </Link>
            <Link href="/blog" aria-current="page">
              Blog
            </Link>
            <Link href="/authentication" prefetch={false}>
              Docs
            </Link>
            <a href="https://rapidapi.com/user/aftaab" rel="noopener noreferrer">
              RapidAPI
            </a>
          </div>
        </nav>

        <section className="blogHero">
          <p className="blogEyebrow">ApiMask Blog</p>
          <h1>API guides that turn messy web problems into clean workflows.</h1>
          <p className="blogLead">
            Practical writing for developers, founders, SEO operators, and SaaS teams who need to understand the problem before automating it.
          </p>
          <div className="blogHeroActions">
            <Link className="blogPrimaryAction" href="#latest">
              Start reading
            </Link>
            <Link className="blogSecondaryAction" href="/api" prefetch={false}>
              Browse APIs <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="blogFeatured" aria-label="Featured article">
          <Link href={featured.href} className="blogFeaturedLink" prefetch>
            <div className="blogFeaturedMeta">
              <span>Featured</span>
              <span>{featured.category}</span>
              <span>{featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <span className="blogReadCta">
              Read the article <ArrowIcon />
            </span>
          </Link>
        </section>

        <section id="latest" className="blogLatest">
          <div className="blogSectionHead">
            <p className="blogEyebrow">Latest guides</p>
            <h2>Deep dives, not filler posts.</h2>
            <p className="blogSectionLead">
              Built to answer developer questions, support SEO, and make the ApiMask product surface easier to understand.
            </p>
          </div>

          <div className="blogPostList">
            {rest.map((post) => (
              <Link key={post.href} href={post.href} className="blogPostRow" prefetch>
                <div className="blogPostMain">
                  <div className="blogPostMeta">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <span className="blogReadCta">
                  Read <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="blogPaths" aria-label="Reading paths">
          <div className="blogSectionHead">
            <p className="blogEyebrow">Reading paths</p>
            <h2>Pick the problem you are trying to solve.</h2>
          </div>
          <div className="blogPathGrid">
            {paths.map((path) => (
              <article key={path.title} className="blogPathCard">
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <div className="blogChipRow">
                  {path.links.map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="blogApiRail" aria-label="ApiMask APIs">
          <div>
            <p className="blogEyebrow">Build with ApiMask</p>
            <h2>Use the APIs behind the guides.</h2>
            <p>
              The blog teaches the concepts. ApiMask gives you focused endpoints for email validation, DNS checks, SSL, CORS, security headers, QR generation, SEO metadata, and developer utilities.
            </p>
          </div>
          <div className="blogApiLinks">
            {posts.map((post) => (
              <Link key={post.api} href={post.api} prefetch={false}>
                {post.category} <ArrowIcon />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
