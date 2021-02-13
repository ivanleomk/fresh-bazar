import { gql } from "@apollo/client";

export const ALL_ITEMS_AND_ID_QUERY = gql`
  query getItemsAndId {
    item {
      item_id
      active
      name
      price
      unit
      item_categories {
        category {
          name
        }
      }
    }
  }
`;
