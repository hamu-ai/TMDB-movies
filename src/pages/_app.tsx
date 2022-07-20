import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Heder from "src/components/Heder";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Heder />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
