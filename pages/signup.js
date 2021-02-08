import React,{useState} from "react";
import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";
import FormButton from "../app/components/FormButton";
import FormInput from "../app/components/FormInput";

const Login = () => {
  const { user, signIn, signUp } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSignUp = (e) => {
    e.preventDefault();
    signUp(email,password)
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
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
