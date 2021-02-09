import React, { useState } from "react";
import FormButton from "../app/components/FormButton";
import FormInput from "../app/components/FormInput";
import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";
import { useToast } from "@chakra-ui/react"
import { produceToast } from "../app/helperFunctions/produceToast";
import { validateEmail } from "../app/helperFunctions/validateEmail";
import { useRouter } from "next/router";



const Login = () => {
  const { setUser,user, signIn, signUp } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast()
  const router = useRouter()
  

  const redirectToSignUp = () => {
    router.push("/signup")
  }

  const redirectToHome = () => {
    router.push("/")
  }

  const HandleSignIn = (e) => {
    e.preventDefault();
    //Input validation
    if(!validateEmail(email)){
      produceToast(toast,"warning","Invalid Input","Please enter a valid email!")
      return
    }
    
    signIn(email,password).then((authUser)=>{
      produceToast(toast,"success","Success!","Redirecting you now")
      setUser(authUser)
      redirectToHome();
    }
    
    ).catch((err)=>{
      if(err.code=="UserNotFoundException"){
        produceToast(toast,"warning", "Warning!", "No account exists with that email. Redirecting to Login now")  
        redirectToSignUp();
      }
      produceToast(toast,"warning", "Warning!", err.message)  
    })
  };

  return (
    <div class="flex-grow bg-white flex h-full">
      <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div class="mt-8">
            <div class="mt-6">
              <form class="space-y-6" onSubmit={(e) => HandleSignIn(e)}>
                <FormInput
                  label="Email Address"
                  value={email}
                  onChange={setEmail}
                />
                <FormInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
                <FormButton text="Sign In" onClick={(e)=>HandleSignIn(e)} />
              </form>

              <div class="flex items-center justify-between">
                  <RedirectLink
                    text="Signing up instead?"
                    customStyling="font-medium text-indigo-600 hover:text-indigo-500"
                    pathname="\signup"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block relative w-0 flex-1">
        <img
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
