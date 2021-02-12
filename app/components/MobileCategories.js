import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  useToast,
} from "@chakra-ui/react";
import CategoryLink from "./CategoryLink";

export const MobileCategories = ({
  onClose,
  isOpen,
  setSelectedCategory,
  categories,
  selectedCategory,
  items,
}) => {
  const toast = useToast();

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-end">
            <svg
              onClick={onClose}
              className="h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div className="bg-white col-span-2">
            <div className="mx-6 my-4">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Categories
              </h2>

              <div className="flex-col flex">
                {categories.map((item) => (
                  <CategoryLink
                    text={item}
                    selected={selectedCategory == item}
                    onClickHandler={() => {
                      onClose();
                      setSelectedCategory(item);
                      toast({
                        title: "Filter Applied",
                        description: `We found ${
                          items.filter((groceryitem) =>
                            groceryitem.item_categories.includes(item)
                          ).length
                        } items which matched your selection`,
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
