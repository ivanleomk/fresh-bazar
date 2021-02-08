//Static File Imports
import "../styles/globals.css";
import "../styles/tailwind.css";

//Component Imports
import Head from "next/head";
import Header from "../app/components/Header";
import { ChakraProvider } from "@chakra-ui/react";


//Amplify Configuration
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
Amplify.configure({
  ...config,
  ssr: true
})

//Context Imports
import { OrderWrapper } from "../app/context/OrderContext";
import { UserWrapper } from "../app/context/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserWrapper>
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
          <div class="flex flex-col h-screen">
            <Header />
            <div className="flex-1 overflow-y-auto">
              <Component {...pageProps} />
            </div>
          </div>
        </ChakraProvider>
      </OrderWrapper>
    </UserWrapper>
  );
}

export default MyApp;
