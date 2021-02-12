import React, { useState } from "react";
import FormButton from "../app/components/FormButton";
import FormInput from "../app/components/FormInput";
import RedirectLink from "../app/components/RedirectLink";
import { useUserContext } from "../app/context/UserContext";
import {
  useDisclosure,
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { produceToast } from "../app/helperFunctions/produceToast";
import { validateEmail } from "../app/helperFunctions/validateEmail";
import { useRouter } from "next/router";
import PasswordResetModal from "../app/components/PasswordResetModal";
import { Auth } from "aws-amplify";

const Login = () => {
  const {
    setUser,
    user,
    signIn,
    signUp,
    resendConfirmationCode,
  } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [unconfirmed, setUnconfirmed] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const redirectToSignUp = () => {
    router.push("/signup");
  };

  const redirectToHome = () => {
    router.push("/");
  };

  const sendConfirmationCode = () => {
    resendConfirmationCode(email)
      .then((data) => {
        produceToast(
          toast,
          "success",
          "Success!",
          "Succesfully re-sent confirmation code. Check your inbox!"
        );
      })
      .catch((err) => {
        produceToast(toast, "warning", "Error!", err.message);
      });
  };

  const HandleSignIn = (e) => {
    e.preventDefault();
    //Input validation
    if (!validateEmail(email)) {
      produceToast(
        toast,
        "warning",
        "Invalid Input",
        "Please enter a valid email!"
      );
      return;
    }

    signIn(email, password)
      .then((authUser) => {
        produceToast(toast, "success", "Success!", "Redirecting you now");
        const userEmail = authUser.attributes.email;
        const jwtToken = authUser.signInUserSession.accessToken.jwtToken;
        const cognitoGroup =
          authUser.signInUserSession.accessToken.payload["cognito:groups"];
        const userPermissions = cognitoGroup ? cognitoGroup[0] : "customer";
        const userData = { userEmail, jwtToken, userPermissions };
        setUser(userData);
        redirectToHome();
      })
      .catch((err) => {
        if (err.code == "UserNotFoundException") {
          produceToast(
            toast,
            "warning",
            "Warning!",
            "No account exists with that email. Redirecting to Login now"
          );
          redirectToSignUp();
        }
        if (err.code == "UserNotConfirmedException") {
          setUnconfirmed(true);
          return;
        }
        console.log(err);
        produceToast(toast, "warning", "Warning!", err.message);
      });
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
          {unconfirmed && (
            <>
              <div
                class="mt-6 lg:bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Unconfirmed Email Address</strong>
                <br />
                <span class="block sm:inline">
                  Please confirm your email address before continuing.{" "}
                </span>
                <br />
                <button class="my-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <button
                    onClick={() => sendConfirmationCode()}
                    className="ml-4"
                  >
                    Resend Confirmation Email
                  </button>
                </button>
              </div>
            </>
          )}
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

                <FormButton text="Sign In" onClick={(e) => HandleSignIn(e)} />
              </form>

              <div class="mt-4 flex items-center justify-between">
                <RedirectLink
                  text="Signing up instead?"
                  customStyling="font-medium text-indigo-600 hover:text-indigo-500"
                  pathname="\signup"
                />
              </div>
              <div class="mt-4 flex items-center justify-between">
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500 bg-transparent	"
                  onClick={onOpen}
                >
                  Reset Password
                </button>
                <PasswordResetModal isOpen={isOpen} onClose={onClose} />
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
