import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import "../styles/global.css";
import "../styles/blog.css";
import { fontVariableClassName } from "../lib/fonts";

// The Nextra docs shell (every route except "/" and "/blog/**") ships its own
// next-themes ThemeProvider inside nextra-theme-docs' Layout, with its own
// toggle in the sidebar footer. Nesting a second, independent provider around
// it is unnecessary and was observed to destabilize hydration of the docs
// shell's sidebar (its active-item highlighting occasionally disagreed
// between server and client render in production). Marketing pages (home,
// blog) have no other theme management, so they still need this provider.
function isMarketingRoute(pathname: string): boolean {
  return pathname === "/" || pathname.startsWith("/blog");
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
