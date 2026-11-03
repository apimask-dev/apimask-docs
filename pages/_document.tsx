import { Head, Html, Main, NextScript, type DocumentProps } from "next/document";

// Cloudflare Web Analytics: cookieless, so no consent banner is needed. The
// beacon loads only when the Vercel project sets the token, so local and
// preview builds stay untracked unless configured. It is left off the
// sign-in link page, whose URL briefly carries a one-time token.
const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
const UNTRACKED_PAGES = new Set(["/login/verify"]);

export default function Document(props: DocumentProps) {
  const tracked = cfBeaconToken && !UNTRACKED_PAGES.has(props.__NEXT_DATA__.page);
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
        {tracked ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
          />
        ) : null}
      </body>
    </Html>
  );
}
