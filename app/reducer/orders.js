function orderReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return state.concat(action.payload);
    case "DELETE_ITEM":
      return state.filter((item) => item.name === action.payload.name);
    default:
      return state;
  }
}

export default orderReducer;
