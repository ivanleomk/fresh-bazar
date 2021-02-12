import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { OrderCart } from "./OrderCart";
import { useOrderContext } from "../context/OrderContext";
import { useRouter } from "next/router";
import RedirectLink from "./RedirectLink";
import { useUserContext } from "../context/UserContext";
import { produceToast } from "../helperFunctions/produceToast";

const MobileSidebar = ({ isOpen, onClose }) => {
  const { orders } = useOrderContext();
  const { user, signOut, setUser } = useUserContext();
  const router = useRouter();
  const toast = useToast();

  const handleSignOut = () => {
    signOut()
      .then((e) => {
        setUser(null);
        onClose();
        produceToast(toast, "success", "Success!", "Succesfully signed out.");
      })
      .catch((err) => console.log("Error : " + err));
  };

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <RedirectLink text="dashboard" pathname="/admin/dashboard" />
          <div className="flex justify-between">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div class="ml-3">
                  <p class="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                    {user ? (
                      user.username
                    ) : (
                      <RedirectLink
                        text="Sign In"
                        pathname="/login"
                        onClose={onClose}
                      />
                    )}
                  </p>
                  {user && (
                    <button
                      onClick={() => handleSignOut()}
                      class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </a>
            <svg
              onClick={onClose}
              className="h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <OrderCart onClose={onClose} />
          <RedirectLink
            onClose={onClose}
            customStyling={
              "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }
            text={`Checkout  ($${
              orders.length > 0
                ? orders
                    .map((item) => item.unit * item.price)
                    .reduce((acc, currVal) => acc + currVal)
                : 0
            })`}
            pathname="/checkout"
          ></RedirectLink>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
