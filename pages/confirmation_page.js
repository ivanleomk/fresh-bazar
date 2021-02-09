import React from 'react'
import { useRouter,useEffect } from 'next/router';
import FormInput from "../app/components/FormInput";
import FormButton from "../app/components/FormButton";

import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";
import { useToast } from '@chakra-ui/react';
import { produceToast } from '../app/helperFunctions/produceToast';

const confirmation_page = () => {
    const router = useRouter()
    const {username,confirmation_code} = router.query
    const toast = useToast();
    const [confirmationCode,setConfirmationCode] = React.useState(0)
    const { sendVerificationCode,setUser } = useUserContext();
  
    React.useEffect(()=>{
        if(router.query){
            setConfirmationCode(confirmation_code)
        }
    },[router.query])


    const redirectToLogin = () => {
      router.push("/login")
    }

    const redirectToHome = () => {
      router.push("/")
    }

    const confirmSignUp = (e) => {
        e.preventDefault()
        
        sendVerificationCode(username,confirmationCode).then((user)=>{
          produceToast(toast,"success","Success!","We've confirmed your email address. Redirecting you to the main page now.")
          setUser(user)
          redirectToHome()
        }
        
        ).catch((err)=>{
          // User has already confirmed his email
          if(err.message=="User cannot be confirmed. Current status is CONFIRMED"){
            produceToast(toast,"Error encountered","Email has already been confirmed. Redirecting to login page now")
            redirectToLogin()
          }
          

          toast({
            title: "Error encountered",
            description: err.message,
            status: "warning",
            duration: 1000,
            isClosable: true,
          })
          
          console.log(err)})
    }

    return (
        <div class="flex-grow bg-white flex h-full">
      <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
              Confirm your Account
            </h2>
          </div>

          <div class="mt-8">
            <div class="mt-6">
              <form class="space-y-6" onSubmit={(e) => confirmSignUp(e)}>
                <FormInput
                  label="Confirmation Code"
                  value={confirmationCode}
                  onChange={setConfirmationCode}
                />
                <FormButton text="Sign In" onClick={(e)=>confirmSignUp(e)} />
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

export default confirmation_page
