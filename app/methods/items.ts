import { list } from "postcss";
import { GroceryItem } from "../types/index";

export const extract_tags_from_list = (list_of_items: GroceryItem[]) => {
  let tags = new Set();
  for (let i = 0; i < list_of_items.length; i++) {
    list_of_items[i].tags.forEach((item) => tags.add(item));
  }
  return Array.from(tags);
};
