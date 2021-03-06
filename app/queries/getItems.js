import { gql } from "@apollo/client";

export const ALL_ITEMS_QUERY = gql`
  query getAllItems {
    item {
      active
      name
      price
      unit
      item_categories(where: { item: { active: { _eq: true } } }) {
        category {
          name
        }
      }
    }
  }
`;
