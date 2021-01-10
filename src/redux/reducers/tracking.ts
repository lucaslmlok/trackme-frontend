import moment from "moment";

import { TrackingState } from "../redux";
import * as actionTypes from "../actionTypes";
import config from "../../utils/config";

const initialState: TrackingState = {
  date: moment().format(config.dateFormat),
  recordList: [],
  recordLoading: false,
  recordError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_DATE:
      return { ...state, date: payload.date };
    case actionTypes.RECORD_LIST_LOADING:
      return {
        ...state,
        recordLoading: true,
        recordError: false,
        recordList: [],
      };
    case actionTypes.UPDATE_RECORD_LIST:
      return { ...state, recordLoading: false, recordList: payload.recordList };
    case actionTypes.RECORD_LIST_ERROR:
      return { ...state, recordLoading: false, recordError: true };
    default:
      return state;
  }
};
