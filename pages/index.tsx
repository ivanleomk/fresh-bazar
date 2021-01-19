//Library Imports
import React, { useState, useEffect } from "react";

//Component Imports
import Heading from "../app/components/Heading";
import SubHeading from "../app/components/SubHeading";
import Button from "../app/components/Button";
import CategoryLink from "../app/components/CategoryLink";
import FoodCard from "../app/components/FoodCard";
import { MobileHeading } from "../app/components/MobileHeading";

//Importing Types
import { GroceryItem } from "../app/types/index";
import { extract_tags_from_list } from "../app/methods/items";

//Hooks
import useWindowSize from "../app/hooks/useWindowDimensions";

//Mocking Data
import { items } from "../app/constants/items";
import { TABLET_BREAKPOINT } from "../app/constants/breakpoints";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<String | null>(
    null
  );
  const [categories, setCategories] = React.useState<GroceryItem[]>([]);
  let { width } = useWindowSize();

  useEffect(() => {
    const tags = extract_tags_from_list(items);
    setCategories(tags);
    setSelectedCategory(tags[0]);
  }, []);

  return (
    <>
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
                <Button text="Search" className="col-span-1" emphasis={true} />
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="grid grid-cols 5 md:grid-cols-6 h-screen pt-10">
        <div className="bg-white col-span-2">
          <div className="mx-6 my-4">
            {width > TABLET_BREAKPOINT ? (
              <Heading text="Categories" />
            ) : (
              <MobileHeading text="Categories" />
            )}

            <div className="flex-col flex">
              {categories.map((item) => (
                <CategoryLink
                  text={item}
                  selected={selectedCategory == item}
                  onClickHandler={() => setSelectedCategory(item)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4 mx-4">
          <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items
              .filter(
                (item: GroceryItem) =>
                  !selectedCategory || item.tags.includes(selectedCategory)
              )
              .map((item: GroceryItem) => (
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
    </>
  );
}
