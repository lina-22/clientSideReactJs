import {
  ADD_RESERVATION,
  CLEAR_RESERVATION,
  LOAD_ALL_RESERVATION,
  LOAD_ALL_RESERVATION_BY_USER,
  SET_RESERVATION,
} from "../actionTypes";

export const reservationStore = {
  isLoaded: false,
  reservations: [],
  cartCount: 0,
};

export const reservationReducer = (state, action) => {
  switch (action.type) {
    case ADD_RESERVATION:
      return {
        isLoaded: true,
        reservations: [...state.reservations, action.payload],
        cartCount: state.reservations.length,
      };
    case LOAD_ALL_RESERVATION:
      return {
        isLoaded: true,
        reservations: action.payload,
        cartCount: state.reservations.length,
      };
    case LOAD_ALL_RESERVATION_BY_USER:
      return {
        isLoaded: true,
        reservations: action.payload,
        cartCount: state.reservations.length,
      };

    case CLEAR_RESERVATION:
      return {
        isLoaded: false,
        reservations: [],
        cartCount: 0,
      };

    default:
      return state;
  }
};
