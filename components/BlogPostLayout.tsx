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
      <nav className="blogNav" aria-label="Main navigation">
        <Link href="/" className="blogBrand" aria-label="ApiMask home">
          <img className="blogBrandMark" src="/apimask-logo.png" alt="" aria-hidden="true" />
          <span>ApiMask</span>
        </Link>
        <div className="blogNavLinks">
          <Link href="/api">APIs</Link>
          <Link href="/quickstart">Quickstart</Link>
          <Link href="/blog" aria-current="page">
            Blog
          </Link>
          <Link href="/authentication">Docs</Link>
          <a href="https://rapidapi.com/user/aftaab">RapidAPI</a>
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
              <Link href={post.api} className="blogApiLink">
                {post.category} docs <ArrowIcon />
              </Link>
            </div>
          )}

          <div className="blogAdjacent">
            {prev ? (
              <Link href={prev.href} className="blogAdjacentLink">
                <span>Previous</span>
                <strong>{prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={next.href} className="blogAdjacentLink next">
                <span>Next</span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </footer>
      )}

      <style jsx global>{`
        .blogShell {
          min-height: 100vh;
          background: #f4f5f1;
          color: #12140f;
          font-family: var(--apimask-sans);
        }

        .blogNav,
        .blogHeader,
        .blogArticle,
        .blogFooter {
          max-width: 720px;
          margin: 0 auto;
          padding-right: 28px;
          padding-left: 28px;
        }

        .blogNav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 22px;
          padding-bottom: 22px;
        }

        .blogBrand,
        .blogNavLinks,
        .blogMeta,
        .blogApiLink {
          display: flex;
          align-items: center;
        }

        .blogBrand {
          gap: 10px;
          color: #12140f;
          font-weight: 760;
          font-family: var(--apimask-display);
          text-decoration: none;
        }

        .blogBrandMark {
          width: 34px;
          height: 34px;
          border-radius: 7px;
          background: #ffffff;
          object-fit: cover;
          box-shadow: 0 10px 24px rgba(50, 18, 106, 0.12);
        }

        .blogNavLinks {
          gap: 22px;
          font-size: 14px;
        }

        .blogNavLinks a {
          color: #373b32;
          text-decoration: none;
        }

        .blogNavLinks a[aria-current="page"] {
          color: #12140f;
          font-weight: 700;
        }

        .blogHeader {
          padding-top: 28px;
          padding-bottom: 8px;
          border-bottom: 1px solid #d8ddd2;
        }

        .blogBack {
          display: inline-block;
          margin-bottom: 18px;
          color: #5d6458;
          font-size: 14px;
          font-weight: 650;
          text-decoration: none;
        }

        .blogBack:hover {
          color: #32126a;
        }

        .blogMeta {
          gap: 10px;
          margin-bottom: 20px;
          color: #696f65;
          font-size: 13px;
          font-weight: 650;
        }

        .blogArticle {
          padding-top: 28px;
          padding-bottom: 48px;
        }

        .blogArticle h1 {
          margin: 0 0 24px;
          font-size: clamp(32px, 5vw, 42px);
          line-height: 1.12;
          letter-spacing: 0;
          font-family: var(--apimask-display);
          font-weight: 700;
          color: #12140f;
        }

        .blogArticle h2 {
          margin: 2.25rem 0 0.85rem;
          font-size: 1.4rem;
          line-height: 1.25;
          font-family: var(--apimask-display);
          font-weight: 700;
          color: #12140f;
        }

        .blogArticle h3 {
          margin: 1.75rem 0 0.65rem;
          font-size: 1.1rem;
          line-height: 1.3;
          font-family: var(--apimask-display);
          font-weight: 700;
          color: #12140f;
        }

        .blogArticle p,
        .blogArticle li {
          color: #373b32;
          font-size: 1.05rem;
          line-height: 1.75;
        }

        .blogArticle p {
          margin: 0 0 1.15rem;
        }

        .blogArticle ul,
        .blogArticle ol {
          margin: 0 0 1.25rem;
          padding-left: 1.35rem;
        }

        .blogArticle li {
          margin-bottom: 0.45rem;
        }

        .blogArticle a {
          color: #32126a;
          font-weight: 650;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .blogArticle a:hover {
          color: #1f0a45;
        }

        .blogArticle strong {
          color: #12140f;
          font-weight: 700;
        }

        .blogArticle code {
          font-family: var(--apimask-mono) !important;
          font-size: 0.9em;
        }

        .blogArticle :not(pre) > code {
          border: 1px solid rgba(17, 20, 15, 0.12);
          border-radius: 5px;
          background: rgba(17, 20, 15, 0.05);
          padding: 0.12em 0.35em;
          color: #11140f;
        }

        .blogArticle pre {
          margin: 1.25rem 0 1.5rem;
          border: 1px solid rgba(17, 20, 15, 0.1);
          border-radius: 8px;
          background: #11140f !important;
          padding: 1rem 1.15rem;
          overflow-x: auto;
        }

        .blogArticle pre code {
          background: transparent !important;
          color: #dfe8dc;
          font-size: 0.875rem !important;
          line-height: 1.7 !important;
        }

        .blogArticle blockquote {
          margin: 1.25rem 0;
          border-left: 3px solid #32126a;
          padding: 0.25rem 0 0.25rem 1rem;
          color: #4c5148;
        }

        .blogArticle hr {
          margin: 2rem 0;
          border: 0;
          border-top: 1px solid #d8ddd2;
        }

        .blogFooter {
          padding-bottom: 72px;
        }

        .blogApiCta {
          margin-bottom: 28px;
          border: 1px solid #d8ddd2;
          border-radius: 10px;
          background: #ffffff;
          padding: 20px 22px;
        }

        .blogEyebrow {
          margin: 0 0 8px;
          color: #276749;
          font-size: 12px;
          font-weight: 760;
          text-transform: uppercase;
        }

        .blogApiLink {
          color: #12140f;
          font-size: 16px;
          font-weight: 720;
          font-family: var(--apimask-display);
          text-decoration: none;
        }

        .blogApiLink:hover {
          color: #32126a;
        }

        .blogLinkIcon {
          width: 15px;
          height: 15px;
          margin-left: 7px;
        }

        .blogAdjacent {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          border-top: 1px solid #d8ddd2;
          padding-top: 28px;
        }

        .blogAdjacentLink {
          display: grid;
          gap: 6px;
          color: inherit;
          text-decoration: none;
        }

        .blogAdjacentLink.next {
          text-align: right;
          justify-items: end;
        }

        .blogAdjacentLink span {
          color: #696f65;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .blogAdjacentLink strong {
          color: #12140f;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.35;
          font-family: var(--apimask-display);
        }

        .blogAdjacentLink:hover strong {
          color: #32126a;
        }

        @media (max-width: 720px) {
          .blogNav {
            align-items: flex-start;
            gap: 16px;
            flex-direction: column;
          }

          .blogNavLinks {
            flex-wrap: wrap;
            gap: 12px 18px;
          }

          .blogNav,
          .blogHeader,
          .blogArticle,
          .blogFooter {
            padding-right: 18px;
            padding-left: 18px;
          }

          .blogAdjacent {
            grid-template-columns: 1fr;
          }

          .blogAdjacentLink.next {
            text-align: left;
            justify-items: start;
          }
        }
      `}</style>
    </div>
  );
}
