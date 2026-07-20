import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import { getAdjacentPosts, getBlogPost } from "./blog-posts";
import { SiteNav } from "./SiteNav";
import { ArrowIcon } from "./ui/ArrowIcon";

type BlogPostLayoutProps = {
  slug: string;
  children: ReactNode;
};

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

      <SiteNav variant="blogPost" />

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
                {post.category} docs <ArrowIcon className="blogLinkIcon" />
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
