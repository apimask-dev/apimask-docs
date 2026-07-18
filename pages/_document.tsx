import { Head, Html, Main, NextScript } from "next/document";
import { fontVariableClassName } from "../lib/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontVariableClassName}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
