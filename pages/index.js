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
import { extract_tags_from_list } from "../app/methods/items";

//Hooks
import useWindowSize from "../app/hooks/useWindowDimensions";

//Next Auth Imports
import { signIn, signOut, useSession } from "next-auth/client";

//Breakpoint Stuff
import {
  SMALL_LAPTOP_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "../app/constants/breakpoints";

//GraphQL Queries
import { ALL_ITEMS_QUERY } from "../app/queries/getItems";

//Apollo Imports
import { gql, useQuery } from "@apollo/client";
import { useUserContext } from "../app/context/UserContext";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);
  const { user } = useUserContext();
  console.log(user);
  let { width } = useWindowSize();

  useEffect(() => {
    const tags = extract_tags_from_list(items);
    console.log("Extracing tags,found");
    setCategories(tags);
  }, [data]);

  useEffect(() => {
    if (!loading) {
      let newData = data["item"]
        .map(({ __typename, ...item }) => item)
        .map((item) => {
          return {
            ...item,
            item_categories: item.item_categories.map(
              ({ category }) => category.name
            ),
          };
        });
      setItems(newData);
      console.log(newData);
    }
  }, [loading]);

  const handleSignIn = () => {
    console.log("Signing in!");
    signIn();
  };

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
                  <button onClick={handleSignIn}>Sign In</button>

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
                    !selectedCategory ||
                    item.item_categories.includes(selectedCategory)
                )
                .map((item) => (
                  <FoodCard item={item} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
