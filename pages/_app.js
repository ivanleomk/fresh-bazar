//Static File Imports
import "../styles/globals.css";
import "../styles/tailwind.css";

//Component Imports
import Head from "next/head";
import Header from "../app/components/Header";
import { ChakraProvider } from "@chakra-ui/react";

//Amplify Configuration
import Amplify from "aws-amplify";
import config from "../src/aws-exports.js";

Amplify.configure({
  ...config,
  ssr: true,
});

//Context Imports
import { OrderWrapper } from "../app/context/OrderContext";
import { UserWrapper } from "../app/context/UserContext";
import { useApollo } from "../app/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import AdminProtectedRoute from "../app/components/AdminProtectedRoute";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
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
              <AdminProtectedRoute>
                <div className="flex-1 overflow-y-auto">
                  <Component {...pageProps} />
                </div>
              </AdminProtectedRoute>
            </div>
          </ChakraProvider>
        </OrderWrapper>
      </UserWrapper>
    </ApolloProvider>
  );
}

export default MyApp;
