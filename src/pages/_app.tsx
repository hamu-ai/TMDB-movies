import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import AuthProvider from "src/hook/AuthContext";
import Heder from "src/components/Heder";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

//　ページごとのレイアウト
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(
      <RecoilRoot>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
    );
  }
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <RecoilRoot>
        <AuthProvider>
          <Heder />
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </MantineProvider>
  );
}
