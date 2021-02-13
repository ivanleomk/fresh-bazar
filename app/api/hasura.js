import { GRAPHQL_URL, TOKEN } from "../constants/graphql";
import axios from "axios";

const hasura = axios.create({
  baseURL: GRAPHQL_URL,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": TOKEN,
  },
});

export default hasura;
