import React from 'react'
import { useRouter,useEffect } from 'next/router';
import FormInput from "../app/components/FormInput";
import FormButton from "../app/components/FormButton";

import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";

const confirmation_page = () => {
    const Router = useRouter()
    const {username,confirmation_code} = Router.query
    
    const [confirmationCode,setConfirmationCode] = React.useState(0)
    const { sendVerificationCode } = useUserContext();

    React.useEffect(()=>{
        if(Router.query){
            setConfirmationCode(parseInt(confirmation_code))
        }
    },[Router.query])

    const confirmSignUp = (e) => {
        e.preventDefault()
        sendVerificationCode(username,confirmationCode)
    }

    console.log(Router.query)
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