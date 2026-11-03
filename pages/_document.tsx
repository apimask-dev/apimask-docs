import { Head, Html, Main, NextScript } from "next/document";

// Cloudflare Web Analytics: cookieless, so no consent banner is needed. The
// beacon loads only when the Vercel project sets the token, so local and
// preview builds stay untracked unless configured.
const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
        {cfBeaconToken ? (
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
