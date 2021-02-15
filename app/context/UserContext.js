import { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import {
  TOKEN,
  GRAPHQL_URL,
  ADMIN,
  ADMIN_TYPE,
  CUSTOMER_TYPE,
} from "../constants/graphql";
import axios from "axios";
import hasura from "../api/hasura";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // On Startup, check if user values exist
  useEffect(() => {
    //Check if prior value shave been set
    if (
      localStorage.getItem("cognito_token") !== null &&
      localStorage.getItem("cognito_role") !== null &&
      localStorage.getItem("cognito_email") !== null
    ) {
      setUser({
        userEmail: localStorage.getItem("cognito_email"),
        jwtToken: localStorage.getItem("cognito_token"),
        userPermissions: localStorage.getItem("cognito_role"),
      });
    }
  }, []);

  const signIn = (username, password) => {
    return new Promise((resolve, reject) => {
      try {
        const user = Auth.signIn(username, password);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };

  const signUp = (username, password) => {
    return new Promise((resolve, reject) => {
      try {
        const res = Auth.signUp({
          username,
          password,
          attributes: {
            email: username,
          },
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const sendVerificationCode = (username, code) => {
    return new Promise((resolve, reject) => {
      try {
        const res = Auth.confirmSignUp(username, code);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const signOut = () => {
    return new Promise((resolve, reject) => {
      try {
        const res = Auth.signOut({ global: true });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const forgotPassword = (username) => {
    return new Promise((resolve, reject) => {
      try {
        const res = Auth.forgotPassword(username);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const forgotPasswordSubmit = (username, code, new_password) => {
    return new Promise((resolve, reject) => {
      try {
        const res = Auth.forgotPasswordSubmit(username, code, new_password);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const resendConfirmationCode = (username) => {
    return new Promise((resolve, reject) => {
      try {
        const res = Auth.resendSignUp(username);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateHasuraCustomerDirectory = (userId, userRole) => {
    const hasuraAdminSecret = TOKEN;
    const url = GRAPHQL_URL;
    console.log(`userRole is ${userRole}`);
    let userType = userRole == ADMIN ? ADMIN_TYPE : CUSTOMER_TYPE;

    const upsertUserQuery = `
    mutation($userId: String!,$userType:Int!){
      insert_customer(objects: {user_email: $userId, customer_type_id: $userType}) {
        affected_rows
      }
    }`;

    const graphqlReq = {
      query: upsertUserQuery,
      variables: { userId, userType },
    };

    axios({
      method: "post", //you can set what request you want to be
      url: GRAPHQL_URL,
      data: graphqlReq,
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": TOKEN,
      },
    });

    //TODO : Set up token refresh in the background

    // hasura
    //   .post({ body: JSON.stringify(graphqlReq) })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    return;
  };

  let sharedState = {
    user,
    isAuthenticated: !(user === null),
    signIn,
    signUp,
    signOut,
    sendVerificationCode,
    forgotPassword,
    forgotPasswordSubmit,
    setUser,
    resendConfirmationCode,
    updateHasuraCustomerDirectory,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
