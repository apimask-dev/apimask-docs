import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  blogCategories,
  blogPosts,
  featuredPost,
  formatDate,
  postHref,
} from "../../components/blog-posts";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNav } from "../../components/SiteNav";
import { ArrowIcon } from "../../components/ui/ArrowIcon";
import styles from "../../components/blog/BlogIndex.module.css";

const SITE_URL = "https://apimask.dev";
const TITLE = "ApiMask Blog — API Guides, SEO Automation, and Developer Workflows";
const DESCRIPTION =
  "Practical guides on email validation, DNS, security headers, CORS, regex, QR codes, SEO automation, social data, and website audit workflows.";

const ALL = "all";

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
    copy: "Turn technical website checks into repeatable workflows that run inside dashboards, audits, and client reports.",
    links: ["Sitemaps", "Robots.txt", "SEO metadata"],
  },
];

export default function BlogPage() {
  const [active, setActive] = useState<string>(ALL);
  const categories = useMemo(() => blogCategories(), []);

  // The featured card is pinned; the grid holds everything else, filtered.
  const listed = useMemo(
    () =>
      blogPosts.filter(
        (post) =>
          post.slug !== featuredPost.slug && (active === ALL || post.categorySlug === active),
      ),
    [active],
  );

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="prefetch" href={postHref(featuredPost.slug)} as="document" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": `${SITE_URL}/blog#blog`,
              name: "ApiMask Blog",
              url: `${SITE_URL}/blog`,
              description: DESCRIPTION,
              publisher: { "@type": "Organization", name: "ApiMask", url: SITE_URL },
              blogPost: blogPosts.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                url: `${SITE_URL}${postHref(post.slug)}`,
                datePublished: post.date,
                dateModified: post.updated ?? post.date,
              })),
            }),
          }}
        />
      </Head>

      <SiteNav />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>ApiMask Blog</p>
            <h1>API guides that turn messy web problems into clean workflows.</h1>
            <p className={styles.lead}>
              Practical writing for developers, founders, SEO operators, and SaaS teams who need
              to understand the problem before automating it.
            </p>
            <p className={styles.count}>{blogPosts.length} guides</p>
          </div>
        </section>

        <section className={styles.body} aria-label="Articles">
          <div className={styles.bodyInner}>
            <Link href={postHref(featuredPost.slug)} className={styles.featured} prefetch>
              <div className={styles.featuredMeta}>
                <span className={styles.tag}>Featured</span>
                <span>{featuredPost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(featuredPost.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.description}</p>
              <span className={styles.readCta}>
                Read the guide <ArrowIcon className={styles.icon} />
              </span>
            </Link>

            <div className={styles.filterRow} role="group" aria-label="Filter by category">
              <button
                type="button"
                className={active === ALL ? `${styles.chip} ${styles.chipActive}` : styles.chip}
                aria-pressed={active === ALL}
                onClick={() => setActive(ALL)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  className={
                    active === category.slug ? `${styles.chip} ${styles.chipActive}` : styles.chip
                  }
                  aria-pressed={active === category.slug}
                  onClick={() => setActive(category.slug)}
                >
                  {category.name} <span>{category.count}</span>
                </button>
              ))}
            </div>

            {listed.length === 0 ? (
              <p className={styles.empty}>
                The only guide in this category is the featured one above.
              </p>
            ) : (
              <div className={styles.grid}>
                {listed.map((post) => (
                  <Link
                    key={post.slug}
                    href={postHref(post.slug)}
                    className={styles.card}
                    prefetch={false}
                  >
                    <div className={styles.cardMeta}>
                      <span className={styles.cardCategory}>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <span className={styles.cardDate}>{formatDate(post.date)}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className={styles.paths} aria-label="Reading paths">
          <div className={styles.bodyInner}>
            <p className={styles.eyebrow}>Reading paths</p>
            <h2 className={styles.pathsTitle}>Pick the problem you are trying to solve.</h2>
            <div className={styles.pathGrid}>
              {paths.map((path) => (
                <article key={path.title} className={styles.pathCard}>
                  <h3>{path.title}</h3>
                  <p>{path.copy}</p>
                  <div className={styles.chipRow}>
                    {path.links.map((link) => (
                      <span key={link}>{link}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-label="Build with ApiMask">
          <div className={styles.ctaInner}>
            <div>
              <h2>Use the APIs behind the guides.</h2>
              <p>
                The blog teaches the concepts. ApiMask gives you focused endpoints for email
                validation, DNS, SSL, CORS, security headers, QR generation, SEO metadata,
                developer utilities, and public social data.
              </p>
            </div>
            <Link href="/api" className={styles.ctaButton} prefetch={false}>
              Browse the API catalog
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
