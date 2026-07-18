import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import { getAdjacentPosts, getBlogPost } from "./blog-posts";

type BlogPostLayoutProps = {
  slug: string;
  children: ReactNode;
};

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

export default function BlogPostLayout({ slug, children }: BlogPostLayoutProps) {
  const post = getBlogPost(slug);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="blogShell">
      <Head>
        {/* Prefetch adjacent guides so next/prev navigations feel instant */}
        {prev ? <link rel="prefetch" href={prev.href} as="document" /> : null}
        {next ? <link rel="prefetch" href={next.href} as="document" /> : null}
        {post ? <link rel="prefetch" href={post.api} as="document" /> : null}
      </Head>

      <div className="blogProgress" aria-hidden="true" />

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

      <header className="blogHeader">
        <Link href="/blog" className="blogBack">
          ← All guides
        </Link>
        {post && (
          <div className="blogMeta">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        )}
      </header>

      <article className="blogArticle">{children}</article>

      {(post || prev || next) && (
        <footer className="blogFooter">
          {post && (
            <div className="blogApiCta">
              <p className="blogEyebrow">Related API</p>
              <Link href={post.api} className="blogApiLink" prefetch={false}>
                {post.category} docs <ArrowIcon />
              </Link>
            </div>
          )}

          <div className="blogAdjacent">
            {prev ? (
              <Link href={prev.href} className="blogAdjacentLink" prefetch>
                <span>Previous</span>
                <strong>{prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={next.href} className="blogAdjacentLink next" prefetch>
                <span>Next</span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
