import type { AppProps } from "next/app";
import "../temp/app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={"min-h-screen antialiased bg-[#010101]"}>
      <Component {...pageProps} />
    </div>
  );
}
