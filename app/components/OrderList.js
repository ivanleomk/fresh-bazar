import React from "react";
import { useOrderContext } from "../context/OrderContext";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const { orders, dispatch } = useOrderContext();
  return (
    <div class="flex-grow w-full">
      {orders.map((item) => (
        <OrderCard item={item} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default OrderList;
