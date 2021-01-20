//Library Imports
import React, { useState, useEffect } from "react";
import {
  Center,
  useDisclosure,
  Button as ChakraButton,
} from "@chakra-ui/react";

//Component Imports
import Heading from "../app/components/Heading";
import SubHeading from "../app/components/SubHeading";
import Button from "../app/components/Button";
import CategoryLink from "../app/components/CategoryLink";
import FoodCard from "../app/components/FoodCard";
import { MobileCategories } from "../app/components/MobileCategories";

//Importing Types
import { GroceryItem } from "../app/types/index";
import { extract_tags_from_list } from "../app/methods/items";

//Hooks
import useWindowSize from "../app/hooks/useWindowDimensions";

//Mocking Data
import { items } from "../app/constants/items";
import {
  SMALL_LAPTOP_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "../app/constants/breakpoints";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { width } = useWindowSize();

  useEffect(() => {
    const tags = extract_tags_from_list(items);
    setCategories(tags);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <span
          onClick={onOpen}
          className="bg-white px-4 py-2  text-xl rounded-full text-indigo-500 border border-indigo-500"
        >
          Filter Produce
          <MobileCategories
            isOpen={isOpen}
            onClose={onClose}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            selectedCategory={selectedCategory}
            items={items}
          />
        </span>
      </div>

      {width > TABLET_BREAKPOINT ? (
        <>
          <div
            style={{
              backgroundImage:
                "url(" + `${require("../public/Hero.png")}` + ")",
              height: "90vh",
              backgroundRepeat: "no-repeat",
            }}
            className="bg-cover w-full bg-center flex flex-col items-center justify-center"
          >
            <div>
              <Heading text="Same Day Grocery Delivery" />
              <SubHeading text="Get your healthy foods and snacks delivered at your doorstep all day everyday" />
              <div className="grid grid-cols-6 mt-4 ">
                <input
                  className="bg-white py-8 rounded-md px-4 col-span-5 focus:outline-none"
                  placeholder="Search for what you need"
                />
                <Button text="Search" emphasis={true} />
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 h-screen pt-10">
          {width > SMALL_LAPTOP_BREAKPOINT ? (
            <>
              <div className="bg-white col-span-2">
                <div className="mx-6 my-4">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Categories
                  </h2>

                  <div className="flex-col flex">
                    {categories.map((item) => (
                      <CategoryLink
                        text={item}
                        selected={item == selectedCategory}
                        onClickHandler={() => setSelectedCategory(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="col-span-4 lg:col-span-4 mx-4">
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
              {items
                .filter(
                  (item) =>
                    !selectedCategory || item.tags.includes(selectedCategory)
                )
                .map((item) => (
                  <FoodCard
                    tags={item.tags}
                    name={item.name}
                    quantity={item.quantity}
                    img={item.img}
                    price={item.price}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
