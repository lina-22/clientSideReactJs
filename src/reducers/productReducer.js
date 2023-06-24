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
        isLoaded: action.isLoaded,
        products: [...state.products, ...action.payload],
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
      const index = oldProducts.findIndex(
        (prod) => prod.productId === action.payload.productId
      );
      oldProducts[index] = action.payload;

      return {
        ...state,
        products: oldProducts,
      };

    case DELETE_PRODUCTS:
      console.log("test delete :", action.payload);
      let prods = state.products.filter((e) => e.productId !== action.payload);
      return {
        ...state,
        products: prods,
      };

    default:
      return state;
  }
};
