import OrderList from "./OrderList";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import RedirectLink from "./RedirectLink";

export const OrderCart = ({ onClose }) => {
  return (
    <>
      <div className="pb-1 sm:pb-6">
        <RedirectLink text="Home" pathname="/" onClose={onClose} />
        <RedirectLink
          text="Order History"
          pathname="/orders"
          onClose={onClose}
        />
        <RedirectLink text="Settings" pathname="/settings" onClose={onClose} />

        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6 flex items-center">
          <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
            Your Current Order
          </h3>
        </div>
        <OrderList />
      </div>
    </>
  );
};
