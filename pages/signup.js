import React,{useState} from "react";
import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";
import FormButton from "../app/components/FormButton";
import FormInput from "../app/components/FormInput";
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { validateEmail } from "../app/helperFunctions/validateEmail";
import { produceToast } from "../app/helperFunctions/produceToast";


const Login = () => {
  const { user, signIn, signUp } = useUserContext();
  const toast = useToast(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const redirectToSignIn = () => {
    router.push("/login")
  }


  const HandleSignUp = (e) => {
    e.preventDefault();
    //Validation of Email
    if(!validateEmail(email)){
      produceToast(toast,"warning","Invalid Input","Please enter a valid email!")
      return
    }


    signUp(email,password).then((user)=>{
      produceToast(toast,"success","Succesfully registed!","We've just sent you a confirmation email. Do look out for it in your inbox!")
    }
    
    ).catch((err)=>{
      // Username already exists
      if(err.code == "UsernameExistsException"){
        produceToast(toast,"warning","An account exists for this email","Redirecting to sign in now.")
        redirectToSignIn()
      }
    })
  };

  return (
    <div class="flex-grow bg-white flex h-full">
      <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
              Sign Up for an account
            </h2>
          </div>

          <div class="mt-8">
            <div class="mt-6">
            <form class="space-y-6" onSubmit={(e) => HandleSignUp(e)}>
              <FormInput
                  label="Email Address"
                  value={email}
                  onChange={setEmail}
                  type = "email"
                />
                <FormInput
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  type="password"
                />

                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <div class="flex items-center justify-between">
                  <RedirectLink
                    text="Signing in instead?"
                    customStyling={
                      "font-medium text-indigo-600 hover:text-indigo-500"
                    }
                    pathname="/login"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block relative w-0 flex-1">
        <img
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
