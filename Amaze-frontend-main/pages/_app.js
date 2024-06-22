import { Fragment } from "react";
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./global.css";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Chat from '../components/chat';


const chakraTheme = extendTheme({
  styles: { global: { img: { maxWidth: "unset" } } },
  colors: {
    gray: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2c3748",
      800: "#1a202c",
      900: "#171923",
    },
    grey: {
      50: "#f3f2f2",
      100: "#dad7d8",
      200: "#c2bdbe",
      300: "#aaa2a4",
      400: "#91878b",
      500: "#857a7e",
      600: "#786e71",
      700: "#5d5558",
      800: "#423d3f",
      900: "#282526",
    },
  },
});
const emotionCache = createCache({
  key: "emotion-cache",
  prepend: true,
});

function MyApp({ Component, pageProps }) {



  return (
    <Fragment>
      <Head>
        <title>Amaze</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={chakraTheme}>
          <Component {...pageProps} />

          <Chat />

        </ChakraProvider>
      </CacheProvider>
    </Fragment>
  );
}

export default MyApp;
