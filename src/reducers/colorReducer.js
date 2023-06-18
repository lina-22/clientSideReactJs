import {
  ADD_COLORS,
  DELETE_COLORS,
  LOAD_COLORS,
  REMOVE_COLORS,
  SELECT_COLORS,
  UPDATE_COLORS,
} from "../actionTypes";

export const colorStore = {
  isLoaded: false,
  colors: [],
  selectedColor: null,
};

export const colorReducer = (state, action) => {
  switch (action.type) {
    case LOAD_COLORS:
      return {
        isLoaded: true,
        colors: action.payload,
        selectedColor: null,
      };

    case ADD_COLORS:
      return { ...state, colors: [...state.colors, action.payload] };
    case SELECT_COLORS:
      return { ...state, selectedColor: action.payload };
    case REMOVE_COLORS:
      return { ...state, selectedColor: null };
    case UPDATE_COLORS:
      const olds = state.colors;
      const index = olds.findIndex(
        (cat) => cat.colorId === action.payload.colorId
      );
      olds[index] = action.payload;

      return {
        ...state,
        colors: olds,
      };

    case DELETE_COLORS:
      let colors = state.colors.filter((e) => e.colourId !== action.payload);
      return {
        ...state,
        colors: colors,
      };

    default:
      return state;
  }
};
