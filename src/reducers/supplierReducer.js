import {
  ADD_SUPPLIERS,
  DELETE_SUPPLIERS,
  LOAD_SUPPLIERS,
  REMOVE_SUPPLIERS,
  SELECT_SUPPLIERS,
  UPDATE_SUPPLIERS,
} from "../actionTypes";

export const supplierStore = {
  isLoaded: false,
  suppliers: [],
  selectedSupplier: null,
};

export const supplierReducer = (state, action) => {
  switch (action.type) {
    case LOAD_SUPPLIERS:
      return {
        isLoaded: true,
        suppliers: action.payload,
        selectedSupplier: null,
      };

    case ADD_SUPPLIERS:
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    case SELECT_SUPPLIERS:
      console.log("test selected supplier :", action.payload);
      return { ...state, selectedSupplier: action.payload };
    case REMOVE_SUPPLIERS:
      return { ...state, selectedSupplier: null };
    case UPDATE_SUPPLIERS:
      const olds = state.suppliers;
      const index = olds.findIndex(
        (supplier) => supplier.supplierId === action.payload.colorId
      );
      olds[index] = action.payload;

      return {
        ...state,
        suppliers: olds,
      };

    case DELETE_SUPPLIERS:
      let suppliers = state.suppliers.filter(
        (e) => e.supplierId !== action.payload
      );
      return {
        ...state,
        suppliers: suppliers,
      };

    default:
      return state;
  }
};
