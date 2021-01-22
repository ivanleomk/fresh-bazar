import Image from "next/image";
import React from "react";
import FoodCardNumberInput from "./FoodCardNumberInput";

const OrderCard = ({ item, dispatch }) => {
  const { name, img, unit, price, quantity } = item;
  return (
    <div class="flex justify-between max-w-md">
      <Image src={img} width={150} height={150} />
      <div className="flex flex-col items-start">
        <h3 className="font-semibold text-gray-900 text-xl">{name}</h3>
        <p className="text-sm font-medium text-gray-500 truncate">{`$${price}`}</p>
        <FoodCardNumberInput
          name={name}
          img={img}
          dispatch={dispatch}
          unit={unit}
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default OrderCard;
