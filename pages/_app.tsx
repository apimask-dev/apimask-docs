import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
// Order matters: tokens define the custom properties every other sheet reads,
// and nextra-overrides must win over nextra-theme-docs' own bundled CSS.
import "../styles/tokens.css";
import "../styles/global.css";
import "../styles/prose.css";
import "../styles/nextra-overrides.css";
import { fontVariableClassName } from "../lib/fonts";
import { captureSource } from "../lib/source";

// The Nextra docs shell (every route except "/" and "/blog/**") ships its own
// next-themes ThemeProvider inside nextra-theme-docs' Layout, with its own
// toggle in the sidebar footer. Nesting a second, independent provider around
// it is unnecessary and was observed to destabilize hydration of the docs
// shell's sidebar (its active-item highlighting occasionally disagreed
// between server and client render in production). Marketing pages (home,
// blog, tools) and the app pages (sign-in, dashboard) have no other theme
// management, so they still need this provider.
function isMarketingRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/tools") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard")
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // First-touch source for the signup funnel (lib/source.ts).
  useEffect(() => {
    captureSource();
  }, []);
  const content = (
    <div className={`font-root ${fontVariableClassName}`}>
      <Component {...pageProps} />
    </div>
  );

  if (!isMarketingRoute(router.pathname)) {
    return content;
  }

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {content}
    </ThemeProvider>
  );
}
