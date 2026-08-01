import localFont from "next/font/local";

/**
 * Geist (Vercel/Basement Studio, SIL OFL — see lib/font-files/LICENSE.txt).
 *
 * The .woff2 files are vendored into lib/font-files/ rather than pulled from
 * `next/font/google` or the `geist` npm package:
 *   - Geist is not in Next 14's bundled Google Fonts manifest, so
 *     next/font/google cannot resolve it.
 *   - The `geist` package hardcodes `variable: "--font-geist-sans"`, and the
 *     rest of the site is written against `--font-apimask-*`.
 * Vendoring the two variable faces gives us the variable names we need with no
 * extra dependency, and next/font/local still self-hosts + subsets them.
 *
 * Both faces are variable (weight 100-900), so display and body share one file:
 * they're differentiated by weight and letter-spacing, not by family.
 */
const geistSans = localFont({
  src: "./font-files/Geist-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-apimask-sans",
  display: "swap",
  preload: true,
  // Metric overrides for the fallback face, to minimise layout shift while the
  // real font loads. Values are Geist's own metrics against Arial.
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const geistMono = localFont({
  src: "./font-files/GeistMono-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-apimask-mono",
  display: "swap",
  preload: false,
  fallback: ["SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

// Note: there is no --font-apimask-display face any more. `--apimask-display`
// is aliased onto --font-apimask-sans in styles/global.css, which keeps the
// single seam to change if a distinct display face is ever introduced.
export const fontVariableClassName = [geistSans.variable, geistMono.variable].join(" ");
