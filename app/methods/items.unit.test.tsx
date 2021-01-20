import { extract_tags_from_list } from "./items";

test("Extracting tags from an empty list should return an empty list", () => {
  expect(extract_tags_from_list([])).toMatchObject([]);
});

const items = [
  {
    name: "Blueberries",
    img:
      "https://res.cloudinary.com/redq-inc/image/upload/v1589614570/pickbazar/grocery/BabySpinach_xronqz.jpg",
    price: 1.5,
    quantity: "300g",
    tags: ["Healthy Eating"],
  },
  {
    name: "Blueberries",
    img:
      "https://res.cloudinary.com/redq-inc/image/upload/v1589614570/pickbazar/grocery/BabySpinach_xronqz.jpg",
    price: 1.5,
    quantity: "300g",
    tags: ["Healthy Eating"],
  },
];

test("Extracting tags from an list of items with the same tags should return a list of one", () => {
  expect(extract_tags_from_list(items)).toMatchObject(["Healthy Eating"]);
});

const items2 = [
  {
    name: "Blueberries",
    img:
      "https://res.cloudinary.com/redq-inc/image/upload/v1589614570/pickbazar/grocery/BabySpinach_xronqz.jpg",
    price: 1.5,
    quantity: "300g",
    tags: ["Healthy Eating"],
  },
  {
    name: "Blueberries",
    img:
      "https://res.cloudinary.com/redq-inc/image/upload/v1589614570/pickbazar/grocery/BabySpinach_xronqz.jpg",
    price: 1.5,
    quantity: "300g",
    tags: ["Stem Vegetables"],
  },
];

test("Extracting tags from an list of items with the same tags should return a list of one", () => {
  expect(extract_tags_from_list(items2)).toMatchObject([
    "Healthy Eating",
    "Stem Vegetables",
  ]);
});
