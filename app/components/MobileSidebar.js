import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { OrderCart } from "./OrderCart";
import { useOrderContext } from "../context/OrderContext";
import { useRouter } from "next/router";
import RedirectLink from "./RedirectLink";

const MobileSidebar = ({ isOpen, onClose }) => {
  const { orders } = useOrderContext();
  const router = useRouter();

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-end">
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
