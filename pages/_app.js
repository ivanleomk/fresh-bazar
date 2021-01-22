//Static File Imports
import "../styles/globals.css";
import "../styles/tailwind.css";

//Component Imports
import Head from "next/head";
import Header from "../app/components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { OrderWrapper } from "../app/context/OrderContext";

//Context Imports

function MyApp({ Component, pageProps }) {
  return (
    <OrderWrapper>
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
    </OrderWrapper>
  );
}

export default MyApp;
