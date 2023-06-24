import {
  ADD_MATERIALS,
  DELETE_MATERIALS,
  LOAD_MATERIALS,
  REMOVE_MATERIALS,
  SELECT_MATERIALS,
  UPDATE_MATERIALS,
} from "../actionTypes";

export const materialStore = {
  isLoaded: false,
  materials: [],
  selectedMaterial: null,
};

export const materialReducer = (state, action) => {
  switch (action.type) {
    case LOAD_MATERIALS:
      console.log("test mat action payload :", action.payload);
      return {
        isLoaded: true,
        materials: [...action.payload],
        selectedMaterial: null,
      };

    case ADD_MATERIALS:
      return { ...state, materials: [...state.materials, action.payload] };
    case SELECT_MATERIALS:
      return { ...state, selectedMaterial: action.payload };
    case REMOVE_MATERIALS:
      return { ...state, selectedMaterial: null };
    case UPDATE_MATERIALS:
      const olds = state.materials;
      const index = olds.findIndex(
        (cat) => cat.materialId === action.payload.materialId
      );
      olds[index] = action.payload;

      return {
        ...state,
        materials: olds,
      };

    case DELETE_MATERIALS:
      let materials = state.materials.filter(
        (e) => e.materialId !== action.payload
      );
      return {
        ...state,
        materials: materials,
      };

    default:
      return state;
  }
};
