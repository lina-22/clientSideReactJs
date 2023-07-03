import { SET_CART, CLEAR_CART } from "../actionTypes";

export const cartStore = {
  isLoaded: false,
  total: "",
  totalQty: "",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        isLoaded: true,
        total: action.payload.total,
        totalQty: action.payload.totalQty,
      };
    case CLEAR_CART:
      return {
        isLoaded: true,
        total: null,
        totalQty: null,
      };

    default:
      return state;
  }
};
