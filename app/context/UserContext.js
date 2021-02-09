import { createContext, useContext, useState } from "react";
import { Auth } from "aws-amplify";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (username,password) => {
    return new Promise((resolve,reject)=>{
      try{
        const user = Auth.signIn(username, password);
        resolve(user)
      }
      catch(error){
        reject(error)
      }

    })
  }

  const signUp = (username,password) => {
    return new Promise((resolve,reject)=>{
      try {
        const res = Auth.signUp({
            username,
            password,
            attributes: {
                email:username,   
            }
        });
        resolve(res)
    }
    catch(error){
      reject(error)
    }
    })
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
