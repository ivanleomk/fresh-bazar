export const extract_tags_from_list = (list_of_items) => {
  let total_tags = [];
  for (let i = 0; i < list_of_items.length; i++) {
    total_tags = total_tags.concat(list_of_items[i].tags);
  }
  return [...Array.from(new Set(total_tags))];
};
