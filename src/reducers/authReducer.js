import axios from "axios";
import jwt_decode from "jwt-decode";
import { LOG_IN, LOG_OUT, SET_USER } from "../actionTypes";

export const userStore = {
  isLoaded: false,
  user: {},
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      // const { user, token } = action.payload;
      const accessToken = `Bearer ${action.payload}`;
      axios.defaults.headers.common = { Authorization: accessToken };
      localStorage.setItem("AccessToken", accessToken);

      let decodedUser = jwt_decode(action.payload);
      console.log("in reducer : ", decodedUser);
      return { user: decodedUser };

    case SET_USER:
      return { user: decodedUser };

    case LOG_OUT:
      axios.defaults.headers.common = { Authorization: "" };
      localStorage.removeItem("AccessToken");
      return {};

    default:
      return state;
  }
};
