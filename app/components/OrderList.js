import React from "react";
import { useOrderContext } from "../context/OrderContext";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const { orders, dispatch } = useOrderContext();
  return (
    <div className="mt-6">
      {orders.map((item) => (
        <OrderCard item={item} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default OrderList;
