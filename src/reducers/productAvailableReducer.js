import {
  ADD_PRODUCTSAVAILABLE,
  DELETE_PRODUCTSAVAILABLE,
  LOAD_PRODUCTSAVAILABLE,
  REMOVE_PRODUCTSAVAILABLE,
  SELECT_PRODUCTSAVAILABLE,
  UPDATE_PRODUCTSAVAILABLE,
} from "../actionTypes";

export const productAvailableStore = {
  isLoaded: false,
  productsAvailable: [],
  selectedProductAvailable: null,
};

export const productAvailableReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTSAVAILABLE:
      return {
        isLoaded: true,
        productsAvailable: action.payload,
        selectedProductAvailable: null,
      };

    case ADD_PRODUCTSAVAILABLE:
      return { ...state, productsAvailable: [...state.productsAvailable, action.payload] };
    case SELECT_PRODUCTSAVAILABLE:
      return { ...state, selectedProductAvailable: action.payload };
    case REMOVE_PRODUCTSAVAILABLE:
      return { ...state, selectedProductAvailable: null };
    case UPDATE_PRODUCTSAVAILABLE:
      const oldProductsAvilable = state.productsAvailable;
      const index =  oldProductsAvilable.findIndex(prodAvailable => prodAvailable.id === action.payload.id);
      oldProductsAvilable[index] = action.payload;

      return{
        ...state, products: oldProductsAvilable
      }

    case DELETE_PRODUCTSAVAILABLE:
      let cats = state.productsAvailable.filter((e) => e.id !== action.payload);
      return {
        ...state,
        productsAvailable: cats,
      };

    default:
      return state;
  }
};
