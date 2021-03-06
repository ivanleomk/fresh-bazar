import { useMemo } from "react";
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GRAPHQL_URL, TOKEN } from "../constants/graphql";
import { setContext } from "@apollo/client/link/context";

let apolloClient;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const tokenInfo = localStorage.getItem("cognito_token");
  const roleInfo = localStorage.getItem("cognito_role");
  const userEmail = localStorage.getItem("cognito_email");

  const token = tokenInfo ? tokenInfo : null;
  const role = roleInfo ? roleInfo : "anonymous";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "x-hasura-role": role,
      Authorization: `Bearer ${token}`,
      "X-Hasura-User-ID": userEmail,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
