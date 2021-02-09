import React, { useState } from "react";
import FormButton from "../app/components/FormButton";
import FormInput from "../app/components/FormInput";
import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";
import { useToast } from "@chakra-ui/react"
import { produceToast } from "../app/helperFunctions/produceToast";
import { validateEmail } from "../app/helperFunctions/validateEmail";
import { useRouter } from "next/router";

const password_reset = () => {
    const [email,setEmail] = React.useState('')
    const [confirmationCode,setConfirmationCode] = React.useState(null)
    const [newPassword,setNewPassword] = React.useState('')
    const toast = useToast();
    const router = useRouter();
    let {forgotPasswordSubmit,forgotPassword} = useUserContext();

    const redirectToLogin = () => {
        router.push("/login")
    }

    React.useEffect(()=>{
        if(router.query){
            setConfirmationCode(router.query.confirmation_code)
            setEmail(router.query.username)
        }
    },[router.query])


    const handlePasswordReset = (e) => {
        e.preventDefault()

        //Email Validation
        if(!validateEmail(email)){
            produceToast(toast,"warning","Error!","Please enter a valid email address")
            return
        }

        //Password Validation
        if(newPassword.length < 5){
            produceToast(toast,"warning","Error!","Password must be of length greater than or equal to 6")
            return
        }

        forgotPasswordSubmit(email,confirmationCode,newPassword)
        .then((data)=>{
            produceToast(toast,"success","Success!","Succesfully reset password. Redirecting to login page now.")
            redirectToLogin()
            
        })
        .catch((err)=>{
            if(err.code == 'ExpiredCodeException'){
                produceToast(toast,"warning","Error!","Invalid  code provided. Please request for a new code!")
                return
            }
            if(err.code == "InvalidParameterException"){
                produceToast(toast,"warning","Error!",err.message)
            }
            console.log(err)})

        
    }

    return (
        <div class="flex-grow bg-white flex h-full">
        <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                Reset your password
              </h2>
            </div>
  
            <div class="mt-8">
              <div class="mt-6">
                <form class="space-y-6" onSubmit={(e) => handlePasswordReset(e)}>
                <FormInput
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                  />
                  <FormInput
                    label="Confirmation Code"
                    value={confirmationCode}
                    onChange={setConfirmationCode}
                  />
                  <FormInput
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                  />
                  <FormButton text="Sign In" onClick={(e)=>handlePasswordReset(e)} />
                </form>
  
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
    )
}

export default password_reset
