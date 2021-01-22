import React from "react";
import AddressCard from "../app/components/AddressCard";
import { OrderCart } from "../app/components/OrderCart";
import OrderList from "../app/components/OrderList";
import { useOrderContext } from "../app/context/OrderContext";
import Heading from "../app/components/Heading";
import CheckoutForm from "../app/components/CheckoutForm";

const user = {
  address: [
    {
      postalcode: 123456,
      address: "Tornadoes in Pyjamas are very troublesome to deal with",
      tag: "Home",
    },
    {
      postalcode: 123456,
      address: "Tornadoes in Pyjamas are very troublesome to deal with",
      tag: "Home",
    },
  ],
};

const Checkout = () => {
  const { address } = user;
  const { orders } = useOrderContext();

  return (
    <center className="px-4 py-4">
      <div className=" max-w-2xl flex flex-col items-start">
        <Heading text="Shopping Cart  " />
        {orders.length > 0 ? (
          <>
            <OrderList />
            <CheckoutForm />
          </>
        ) : (
          <p>Your Cart is Empty</p>
        )}
      </div>
    </center>
  );
};

export default Checkout;
