import {
  ADD_SIZES,
  DELETE_SIZES,
  LOAD_SIZES,
  REMOVE_SIZES,
  SELECT_SIZES,
  UPDATE_SIZES,
} from "../actionTypes";

export const sizeStore = {
  isLoaded: false,
  sizes: [],
  selectedSize: null,
};

export const sizeReducer = (state, action) => {
  switch (action.type) {
    case LOAD_SIZES:
      console.log("test sizes : ", action.payload);
      return {
        isLoaded: true,
        sizes: action.payload,
        selectedSize: null,
      };

    case ADD_SIZES:
      return { ...state, sizes: [...state.sizes, action.payload] };
    case SELECT_SIZES:
      return { ...state, selectedSize: action.payload };
    case REMOVE_SIZES:
      return { ...state, selectedSize: null };
    case UPDATE_SIZES:
      const olds = state.sizes;
      const index = olds.findIndex(
        (cat) => cat.sizeId === action.payload.sizeId
      );
      olds[index] = action.payload;

      return {
        ...state,
        colors: olds,
      };

    case DELETE_SIZES:
      let sizes = state.sizes.filter((e) => e.sizeId !== action.payload);
      return {
        ...state,
        sizes: sizes,
      };

    default:
      return state;
  }
};
