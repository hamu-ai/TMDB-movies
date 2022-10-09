import "src/styles/globals.css";

import { MantineProvider } from "@mantine/core";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import Heder from "src/components/Heder";
import AuthProvider from "src/hook/AuthContext";

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
        globalStyles: (theme) => ({
          body: {
            color: "white",
          },
        }),
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
