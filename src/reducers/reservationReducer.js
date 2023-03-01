import { CLEAR_RESERVATION, SET_RESERVATION } from "../actionTypes";


export const reservationStore = {
  isLoaded: false,
  reservation: null,
  cartCount: 0,
};

export const reservationReducer = (state, action) => {
  switch (action.type) {
    case SET_RESERVATION:
      return {
        isLoaded: true,
        reservation: action.payload,
        cartCount: action.payload.productLines.length,
      };
    case CLEAR_RESERVATION:
      return reservationStore;

    default:
      return state;
  }

};
