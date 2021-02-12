import Image from "next/image";
import React from "react";
import { items } from "../constants/items";
import Button from "./Button";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Tags from "./Tags";

import { Center, useToast } from "@chakra-ui/react";
import { useOrderContext } from "../context/OrderContext";
import FoodCardNumberInput from "./FoodCardNumberInput";

const FoodCard = ({ item }) => {
  const { name, price, unit, item_categories } = item;
  return (
    <li className="border border-gray-100 rounded-md shadow-sm my-4 mx-2  col-span-2 hover:shadow-md hover:cursor-pointer cursor-pointer p-4">
      {/* <Center>
        <Image src={img} width={300} height={300} />
      </Center> */}

      <div className="mx-4">
        <div className="flex">
          <div className="text-lg leading-6 font-medium space-y-1">
            <h3
              style={{
                fontFamily: "Poppins",
              }}
            >
              {name}
            </h3>
            <p
              style={{
                fontFamily: "Poppins",
              }}
              className="text-gray-400"
            >{`$${price} / ${unit}`}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-5 my-4">
        {item_categories.map((item) => (
          <Tags text={item} />
        ))}
      </div>
      <Center>
        <FoodCardNumberInput name={name} price={price} />
      </Center>
    </li>
  );
};

export default FoodCard;
