import { Dispatch } from "redux";
import axios from "axios";
import _ from "lodash";

import { State } from "../redux";
import { Action } from "../../utils/types";
import urls from "../../utils/urls";
import { authHeaders } from "../../utils/helper";
import * as actionTypes from "../actionTypes";

export const fetchActionList = () => {
  return async (dispatch: Dispatch, getState: () => State) => {
    dispatch({ type: actionTypes.ACTION_LIST_LOADING });
    try {
      const { data } = await axios.get(urls.action, {
        headers: authHeaders(getState()),
      });
      const actionList = data;

      dispatch({
        type: actionTypes.UPDATE_ACTION_LIST,
        payload: { actionList },
      });
      dispatch({ type: actionTypes.ACTION_LIST_FINISH });
    } catch (error) {
      return error.response.data;
    }
  };
};

export const updateAction = (action: Action) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    const actionList = _.cloneDeep(getState().action.actionList);
    try {
      const { data: axiosData } = await axios({
        method: action.id ? "put" : "post",
        url: urls.action,
        data: action,
        headers: authHeaders(getState()),
      });
      const { data, message } = axiosData;

      const index = actionList.findIndex((a) => a.id === action.id);
      if (index === -1) {
        actionList.push(data);
      } else {
        actionList.splice(index, 1, data);
      }

      dispatch({
        type: actionTypes.UPDATE_ACTION_LIST,
        payload: { actionList },
      });
      return message;
    } catch (error) {
      error.response.data.error = true;
      return error.response.data;
    }
  };
};

export const deleteActions = (ids: string[]) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    let actionList = _.cloneDeep(getState().action.actionList);
    try {
      const { data: axiosData } = await axios.delete(urls.action, {
        data: { ids },
        headers: authHeaders(getState()),
      });
      const { message } = axiosData;

      actionList = actionList.filter((a) => !ids.includes(a.id));
      dispatch({
        type: actionTypes.UPDATE_ACTION_LIST,
        payload: { actionList },
      });
      return message;
    } catch (error) {
      error.response.data.error = true;
      return error.response.data;
    }
  };
};

export const updateActionOrder = (actionIds: string[]) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    try {
    } catch (error) {}
  };
};
