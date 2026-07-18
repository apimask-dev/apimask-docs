import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";

/**
 * Self-hosted via next/font — no render-blocking Google Fonts CSS request.
 * Variables are applied on <html> in _document.tsx.
 */
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-apimask-sans",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-apimask-mono",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-apimask-display",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const fontVariableClassName = [
  plexSans.variable,
  plexMono.variable,
  spaceGrotesk.variable,
].join(" ");
