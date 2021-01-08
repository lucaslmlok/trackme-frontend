import { AuthState } from "../redux";
import * as actionTypes from "../actionTypes";

const initialState: AuthState = {
  tokenCheck: false,
  token: null,
  userId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOKEN_CHECK:
      return { ...state, tokenCheck: true };
    case actionTypes.AUTH_IN:
      return { ...state, token: payload.token, userId: payload.userId };
    case actionTypes.AUTH_OUT:
      return { ...state, token: null, userId: null };
    default:
      return state;
  }
};
