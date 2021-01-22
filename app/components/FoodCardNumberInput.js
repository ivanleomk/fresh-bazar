import React from "react";
import {
  DECREMENT_ITEM_COUNT,
  INCREMENT_ITEM_COUNT,
} from "../constants/actions";
import { useToast } from "@chakra-ui/react";
import { useOrderContext } from "../context/OrderContext";

const FoodCardNumberInput = ({ name, img, quantity, price }) => {
  const { orders, dispatch } = useOrderContext();

  const toast = useToast();
  const clickHandler = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        name,
        price,
        quantity,
        img,
        unit: 1,
      },
    });

    toast({
      title: "Item Added",
      description: `We've succesfully added a ${name} to your cart`,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  if (orders.filter((item) => item.name == name).length == 0) {
    return (
      <button
        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-lg font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={clickHandler}
      >
        Add To Cart
      </button>
    );
  }

  return (
    <div className="flex items-center mt-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="border rounded-full h-10 w-10 text-gray-600 p-2"
        onClick={() =>
          dispatch({ type: INCREMENT_ITEM_COUNT, payload: { name } })
        }
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>

      <p className="mx-4">
        {orders.filter((item) => item.name == name)[0].unit}
      </p>

      <svg
        onClick={() =>
          dispatch({ type: DECREMENT_ITEM_COUNT, payload: { name } })
        }
        className="border rounded-full h-10 w-10 text-gray-600 p-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 12H6"
        />
      </svg>
    </div>
  );
};

export default FoodCardNumberInput;
