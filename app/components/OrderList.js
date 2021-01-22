import { Center } from "@chakra-ui/react";
import React from "react";
import { useOrderContext } from "../context/OrderContext";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const { orders, dispatch } = useOrderContext();
  return (
    <Center>
      <div className="mt-6 max-w-md w-screen">
        {orders.map((item) => (
          <OrderCard item={item} dispatch={dispatch} />
        ))}
      </div>
    </Center>
  );
};

export default OrderList;
