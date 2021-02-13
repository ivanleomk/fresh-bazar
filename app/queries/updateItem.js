import { gql } from "@apollo/client";

export const UPDATE_ITEM = gql`
  mutation update_item(
    $id: Int!
    $new_name: String!
    $new_price: float8!
    $new_unit: String!
  ) {
    update_item(
      _set: {
        item_id: $id
        name: $new_name
        price: $new_price
        unit: $new_unit
      }
      where: { item_id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;
