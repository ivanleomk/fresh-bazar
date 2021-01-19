import Image from "next/image";
import React from "react";
import { items } from "../constants/items";
import Button from "./Button";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Tags from "./Tags";
import { PropTypes } from "prop-types";

const FoodCard = ({ img, price, name, quantity, tags }) => {
  return (
    <li className="col-span-1 hover:shadow-md hover:cursor-pointer cursor-pointer p-4">
      <Image src={img} width={300} height={300} />
      <div className="mx-4">
        <div className="flex">
          <div>
            <Heading text={name} />
            <SubHeading text={`${price} / ${quantity}`} />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
      {tags.map((item) => (
        <Tags text={item} />
      ))}
      <Button text="Add to Cart" emphasis={true} />
    </li>
  );
};

FoodCard.PropTypes = {
  img: PropTypes.String,
  price: PropTypes.Number,
  name: PropTypes.String,
  quantity: PropTypes.String,
  tags: PropTypes.arrayOf(String),
};

export default FoodCard;
