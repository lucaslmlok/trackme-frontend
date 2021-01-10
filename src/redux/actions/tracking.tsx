import { Dispatch } from "redux";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";

import * as actionTypes from "../actionTypes";
import { State } from "../redux";
import urls from "../../utils/urls";
import { authHeaders, getErrorData, timeout } from "../../utils/helper";
import ToastMsg from "../../components/ui/ToastMsg";

export const fetchRecords = () => {
  return async (dispatch: Dispatch, getState: () => State) => {
    dispatch({ type: actionTypes.RECORD_LIST_LOADING });
    const { date } = getState().tracking;

    try {
      const { data } = await axios.get(urls.actionRecord, {
        headers: authHeaders(getState()),
        params: { date },
      });
      dispatch({
        type: actionTypes.UPDATE_RECORD_LIST,
        payload: { recordList: data },
      });
    } catch (error) {
      const result = error?.response?.data;
      const body = getErrorData(result?.data);
      toast.error(<ToastMsg title={result?.message} body={body} />);
      dispatch({ type: actionTypes.RECORD_LIST_ERROR });
    }
  };
};

export const setDate = (date: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.SET_DATE,
      payload: { date },
    });

    return dispatch(fetchRecords() as any);
  };
};

export const doneRecord = (actionId: string, type = "done") => {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { date } = getState().tracking;
    try {
      const { data: axiosData } = await axios.post(
        urls.actionRecord,
        { id: actionId, date, type },
        { headers: authHeaders(getState()) }
      );
      const { data } = axiosData;

      const recordList = _.cloneDeep(getState().tracking.recordList);
      const index = recordList.findIndex((record) => {
        return record.id === actionId;
      });
      if (index !== -1) {
        recordList[index].done = data.done;
      }

      dispatch({
        type: actionTypes.UPDATE_RECORD_LIST,
        payload: { recordList },
      });
    } catch (error) {
      toast.error("something");
    }
  };
};
