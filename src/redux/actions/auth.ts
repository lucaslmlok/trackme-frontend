import { Dispatch } from "redux";
import axios from "axios";

import * as actionTypes from "../actionTypes";
import urls from "../../utils/urls";

export const authIn = (
  formData: any,
  isLogin: boolean,
  rememberMe: boolean
) => {
  return async (dispatch: Dispatch) => {
    try {
      const url = isLogin ? urls.login : urls.signup;
      const { data } = await axios.post(url, formData);
      const { token, userId } = data.data;

      if (rememberMe) {
        localStorage.setItem("token", token);
      }

      dispatch({ type: actionTypes.AUTH_IN, payload: { token, userId } });
    } catch (error) {
      return error.response.data;
    }
  };
};

export const authOut = () => {
  localStorage.removeItem("token");
  return { type: actionTypes.AUTH_OUT };
};

export const tokenLogin = () => {
  return async (dispatch: Dispatch) => {
    const storageToken = localStorage.getItem("token");

    if (!storageToken) {
      dispatch({ type: actionTypes.TOKEN_CHECK });
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${storageToken}` };
      const { data } = await axios.get(urls.tokenLogin, { headers });
      const { token, userId } = data.data;

      dispatch({ type: actionTypes.AUTH_IN, payload: { token, userId } });
      dispatch({ type: actionTypes.TOKEN_CHECK });
    } catch (error) {
      localStorage.removeItem("token");
      dispatch({ type: actionTypes.TOKEN_CHECK });
    }
  };
};
