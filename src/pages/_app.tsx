import "src/styles/globals.css";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
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
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  // ダークモード　ライトモード切り替えの関数
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // ホットキーの使用
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            body: {
              color:
                theme.colorScheme === "dark" ? theme.white : theme.colors.dark,
            },
          }),
          /** Put your mantine theme override here */
          colorScheme,
        }}
      >
        <RecoilRoot>
          <AuthProvider>
            <Heder />
            <Component {...pageProps} />
          </AuthProvider>
        </RecoilRoot>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
