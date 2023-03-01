import {
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  LOAD_CATEGORIES,
  REMOVE_CATEGORIES,
  SELECT_CATEGORIES,
  UPDATE_CATEGORIES,
} from "../actionTypes";

export const categoryStore = {
  isLoaded: false,
  categories: [],
  selectedCategory: null,
};

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        isLoaded: true,
        categories: action.payload,
        selectedCategory: null,
      };

    case ADD_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };
    case SELECT_CATEGORIES:
      return { ...state, selectedCategory: action.payload };
    case REMOVE_CATEGORIES:
      return { ...state, selectedCategory: null };
    case UPDATE_CATEGORIES:
      const oldCategories = state.categories;
      const index =  oldCategories.findIndex(cat => cat.id === action.payload.id);
      oldCategories[index] = action.payload;

      return{
        ...state, categories: oldCategories
      }

    case DELETE_CATEGORIES:
      let cats = state.categories.filter((e) => e.id !== action.payload);
      return {
        ...state,
        categories: cats,
      };

    default:
      return state;
  }
};
