import {
  DECREMENT_ITEM_COUNT,
  INCREMENT_ITEM_COUNT,
} from "../constants/actions";
function orderReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return state.concat(action.payload);
    }

    case "DELETE_ITEM": {
      return state.filter((item) => item.name === action.payload.name);
    }

    case INCREMENT_ITEM_COUNT: {
      const { name } = action.payload;
      return state.map((item) =>
        item.name == name ? { ...item, unit: item.unit + 1 } : { ...item }
      );
    }

    case DECREMENT_ITEM_COUNT: {
      const { name } = action.payload;
      return state
        .map((item) =>
          item.name == name ? { ...item, unit: item.unit - 1 } : { ...item }
        )
        .filter((item) => item.unit !== 0);
    }

    default:
      return state;
  }
}

export default orderReducer;
