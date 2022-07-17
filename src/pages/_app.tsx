import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Heder from "src/components/Heder";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Heder />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
