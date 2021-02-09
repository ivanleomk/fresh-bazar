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

  const sendVerificationCode = (username,code) => {
    return new Promise((resolve,reject)=>{
      
      try {
        const res = Auth.confirmSignUp(username, code)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
  
  const signOut = () => {
    return new Promise((resolve,reject)=>{
      try{
        const res = Auth.signOut({global:true})
        
        resolve(res)
      }
      catch(error){
        reject(error)
      }
    })
  }


  let sharedState = {
    user,
    signIn,
    signUp,
    signOut,
    sendVerificationCode,
    setUser,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
