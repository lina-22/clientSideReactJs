import axios from "axios";
import jwt_decode from "jwt-decode";
import { LOG_IN, LOG_OUT, SET_USER } from "../actionTypes";

export const userStore = {
  isLoaded: false,
  user: undefined,
  role: undefined,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      // const { user, token } = action.payload;
      const accessToken = `Bearer ${action.payload}`;
      axios.defaults.headers.common = { Authorization: accessToken };
      localStorage.setItem("AccessToken", accessToken);

      let decodedUser = jwt_decode(action.payload);
      return {
        isLoaded: true,
        user: decodedUser.sub,
        role: decodedUser.roles[0],
      };

    case SET_USER:
      return { isLoaded: true, user: decodedUser };

    case LOG_OUT:
      axios.defaults.headers.common = { Authorization: "" };
      localStorage.removeItem("AccessToken");
      return {};

    default:
      return state;
  }
};
