import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  formatDate,
  getAdjacentPosts,
  getBlogPost,
  getRelatedPosts,
  postHref,
} from "./blog-posts";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { ArrowIcon } from "./ui/ArrowIcon";
import styles from "./blog/BlogPost.module.css";

const SITE_URL = "https://www.apimask.dev";

type Heading = { id: string; text: string };

/**
 * Reads the rendered article's own h2 elements after mount.
 *
 * The posts are plain MDX rendered through this layout, so there's no compiled
 * heading list to pass in the way Nextra provides one for docs. Walking the DOM
 * keeps the TOC in sync with the body automatically — nothing to maintain per
 * post — at the cost of the TOC being client-only, which is fine for a
 * navigation aid that adds nothing to the indexed content.
 */
function useHeadings(articleRef: React.RefObject<HTMLElement>) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const nodes = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2"));
    nodes.forEach((node, index) => {
      if (!node.id) node.id = `section-${index + 1}`;
    });
    setHeadings(nodes.map((node) => ({ id: node.id, text: node.textContent ?? "" })));
    if (nodes.length === 0) return;

    // The topmost heading that has scrolled past the header wins.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [articleRef]);

  return { headings, activeId };
}

/** Reading-progress bar. Kept from the previous layout — it's the one piece of
 *  blog chrome that earned its place. */
function useProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

export default function BlogPostLayout({ slug, children }: { slug: string; children: ReactNode }) {
  const post = getBlogPost(slug);
  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);
  const articleRef = useRef<HTMLElement>(null);
  const { headings, activeId } = useHeadings(articleRef);
  const progress = useProgress();

  const url = `${SITE_URL}${postHref(slug)}`;

  return (
    <>
      <Head>
        {post && (
          <>
            <title>{`${post.title} | ApiMask`}</title>
            <meta name="description" content={post.description} />
            <link rel="canonical" href={url} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="article" />
            <meta property="article:published_time" content={post.date} />
            <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "BlogPosting",
                      headline: post.title,
                      description: post.description,
                      mainEntityOfPage: url,
                      url,
                      datePublished: post.date,
                      dateModified: post.updated ?? post.date,
                      articleSection: post.category,
                      keywords: post.keywords.join(", "),
                      author: { "@type": "Organization", name: "ApiMask", url: SITE_URL },
                      publisher: {
                        "@type": "Organization",
                        name: "ApiMask",
                        url: SITE_URL,
                        logo: `${SITE_URL}/apimask-logo.png`,
                      },
                    },
                    {
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                        {
                          "@type": "ListItem",
                          position: 2,
                          name: "Blog",
                          item: `${SITE_URL}/blog`,
                        },
                        { "@type": "ListItem", position: 3, name: post.title, item: url },
                      ],
                    },
                  ],
                }),
              }}
            />
          </>
        )}
        {prev && <link rel="prefetch" href={postHref(prev.slug)} as="document" />}
        {next && <link rel="prefetch" href={postHref(next.slug)} as="document" />}
      </Head>

      <div
        className={styles.progress}
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <SiteNav />

      <main className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/blog" prefetch={false}>
                Blog
              </Link>
              {post && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{post.category}</span>
                </>
              )}
            </nav>

            {post && (
              <p className={styles.meta}>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>
            )}

            <article ref={articleRef} className={`${styles.article} prose`}>
              {children}
            </article>

            <footer className={styles.footer}>
              {post && (
                <div className={styles.apiCta}>
                  <p className={styles.ctaEyebrow}>The API behind this guide</p>
                  <p className={styles.ctaCopy}>
                    Everything above is a documented endpoint you can call with a free API key.
                  </p>
                  <Link href={post.api} className={styles.ctaLink} prefetch={false}>
                    Read the {post.category} docs <ArrowIcon className={styles.icon} />
                  </Link>
                </div>
              )}

              {related.length > 0 && post && (
                <section className={styles.related} aria-label={`More in ${post.category}`}>
                  <h2>More in {post.category}</h2>
                  <div className={styles.relatedGrid}>
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        href={postHref(item.slug)}
                        className={styles.relatedCard}
                        prefetch={false}
                      >
                        <h3>{item.title}</h3>
                        <span>{item.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <nav className={styles.adjacent} aria-label="More guides">
                {prev ? (
                  <Link href={postHref(prev.slug)} className={styles.adjacentLink} prefetch={false}>
                    <span>Newer</span>
                    <strong>{prev.title}</strong>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={postHref(next.slug)}
                    className={`${styles.adjacentLink} ${styles.next}`}
                    prefetch={false}
                  >
                    <span>Older</span>
                    <strong>{next.title}</strong>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            </footer>
          </div>

          {/* Mirrors the docs TOC, which is what makes a guide and a docs page
              feel like the same site rather than two templates. */}
          <aside className={styles.toc} aria-label="On this page">
            {headings.length > 0 && (
              <>
                <p className={styles.tocTitle}>On this page</p>
                <ul>
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        aria-current={activeId === heading.id ? "true" : undefined}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
