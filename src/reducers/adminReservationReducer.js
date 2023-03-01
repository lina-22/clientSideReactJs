import { LOAD_ADMIN_RESERVATIONS , ADMIN_RESERVATION_STATUS_CHANGE, ADMIN_RESERVATION_DELETE} from "../actionTypes";


export const adminReservationStore = {
  isLoaded: false,
  reservations: null,
};

export const adminReservationReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ADMIN_RESERVATIONS:
      return {
        isLoaded: true,
        reservations: action.payload,
      };
    case ADMIN_RESERVATION_STATUS_CHANGE:
      const oldReservations = state.reservations;
      const index =  oldReservations.findIndex(prod => prod.id === action.payload.id);
      oldReservations[index] = action.payload;
      case ADMIN_RESERVATION_DELETE:
        let reservations = state.reservations.filter((e) => e.id !== action.payload);
      return {
        ...state,
        reservations,
      };

    default:
      return state;
  }
};
