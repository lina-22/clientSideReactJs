import {
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  LOAD_PRODUCTS,
  REMOVE_PRODUCTS,
  SELECT_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../actionTypes";

export const productStore = {
  isLoaded: false,
  products: [],
  selectedProduct: null,
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        isLoaded: true,
        products: action.payload,
        selectedProduct: null,
      };

    case ADD_PRODUCTS:
      return { ...state, products: [...state.products, action.payload] };
    case SELECT_PRODUCTS:
      return { ...state, selectedProduct: action.payload };
    case REMOVE_PRODUCTS:
      return { ...state, selectedProduct: null };
    case UPDATE_PRODUCTS:
      const oldProducts = state.products;
      const index =  oldProducts.findIndex(prod => prod.id === action.payload.id);
      oldProducts[index] = action.payload;

      return{
        ...state, products: oldProducts
      }

    case DELETE_PRODUCTS:
      let cats = state.products.filter((e) => e.id !== action.payload);
      return {
        ...state,
        products: cats,
      };

    default:
      return state;
  }
};
