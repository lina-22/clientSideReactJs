import axios from "axios";
import { LOG_IN, LOG_OUT, SET_USER } from "../actionTypes";

export const authReducer = (state, action) => {

  switch(action.type){

    case LOG_IN:
      const {user, token} = action.payload;
      const accessToken = `Bearer ${token.plainTextToken}`;
      axios.defaults.headers.common = { Authorization: accessToken };
      localStorage.setItem("AccessToken", accessToken);
      return {user}
    
    case SET_USER:
      return {user:action.payload};

    case LOG_OUT:
      axios.defaults.headers.common = { Authorization: "" };
      localStorage.removeItem("AccessToken");
    return {};

    default:
      return state;

  }

}