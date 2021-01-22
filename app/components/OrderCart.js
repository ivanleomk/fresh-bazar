import OrderList from "./OrderList";
import React from "react";

export const OrderCart = ({}) => {
  return (
    <>
      <div className="pb-1 sm:pb-6">
        <a
          href="#"
          className="bg-gray-100 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
          aria-current="page"
        >
          Store
        </a>
        <a
          href="#"
          className=" text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
          aria-current="page"
        >
          Order History
        </a>
        <a
          href="#"
          className=" text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
          aria-current="page"
        >
          Settings
        </a>

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
