import Head from "next/head";
import { Audience } from "../components/home/Audience";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { DistributionStrip } from "../components/home/DistributionStrip";
import { DocsQuality } from "../components/home/DocsQuality";
import { FlagshipProducts } from "../components/home/FlagshipProducts";
import { Hero } from "../components/home/Hero";
import { Reliability } from "../components/home/Reliability";
import { Security } from "../components/home/Security";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { liveCategories, liveEndpointCount } from "../lib/products";

const SITE_URL = "https://www.apimask.dev";
const TITLE = `${liveEndpointCount} Production-Ready APIs on RapidAPI | ApiMask`;
const DESCRIPTION =
  "Developer utility, AI content, email and domain validation, website and SEO, QR code, and public social data APIs. Clean JSON, documented endpoints, distributed through RapidAPI.";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="canonical" href={SITE_URL} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6c47ff" />
        <meta name="application-name" content="ApiMask" />
        <meta name="apple-mobile-web-app-title" content="ApiMask" />
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="REST API platform, developer utilities API, AI content API, email validation API, domain intelligence API, SEO audit API, QR code API, social data API, RapidAPI"
        />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ApiMask" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="ApiMask logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "ApiMask",
                  url: SITE_URL,
                  logo: `${SITE_URL}/apimask-logo.png`,
                  description: DESCRIPTION,
                  sameAs: ["https://rapidapi.com/user/aftaab", "https://github.com/apimask-dev"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "ApiMask",
                  url: SITE_URL,
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
                // Surfaces the live category set to search engines, matching
                // what the CategoryGrid section renders.
                {
                  "@type": "ItemList",
                  "@id": `${SITE_URL}/#categories`,
                  name: "ApiMask API categories",
                  itemListElement: liveCategories.map((category, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: category.name,
                    description: category.note,
                  })),
                },
              ],
            }),
          }}
        />
      </Head>

      <SiteNav />
      <main>
        <Hero />
        <DistributionStrip />
        <DocsQuality />
        <CategoryGrid />
        <FlagshipProducts />
        <Reliability />
        <Security />
        <Audience />
      </main>
      <SiteFooter />
    </>
  );
}
