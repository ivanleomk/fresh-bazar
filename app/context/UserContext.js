import { createContext, useContext, useState } from "react";
import { Auth } from "aws-amplify";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [user, setUser] = useState(null);

  async function signIn(username,password) {
    try {
        const user = await Auth.signIn(username, password);
        setUser(user)
        
        return user
    } catch (error) {
        console.log('error signing in', error);
    }
}
async function signUp(username,password) {
  try {
      const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
              email:username,   
          }
      });
      console.log(user);
  } catch (error) {
      console.log('error signing up:', error);
  }
}

async function sendVerificationCode(username,code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}


  let sharedState = {
    user,
    signIn,
    signUp,
    sendVerificationCode
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
