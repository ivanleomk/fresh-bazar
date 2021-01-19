import "../styles/globals.css";
import "../styles/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../app/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <link
          rel="preload"
          href="/fonts/Poppins/Poppins-Bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
