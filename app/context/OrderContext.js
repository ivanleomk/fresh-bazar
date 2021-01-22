import { useReducer, createContext, useContext } from "react";
import orderReducer from "../reducer/orders";

const OrderContext = createContext();

export function OrderWrapper({ children }) {
  const [orders, dispatch] = useReducer(orderReducer, []);

  let sharedState = {
    orders,
    dispatch,
  };

  return (
    <OrderContext.Provider value={sharedState}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  return useContext(OrderContext);
}
