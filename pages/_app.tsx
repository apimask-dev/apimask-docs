import type { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/blog.css";
import { fontVariableClassName } from "../lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`font-root ${fontVariableClassName}`}>
      <Component {...pageProps} />
    </div>
  );
}
