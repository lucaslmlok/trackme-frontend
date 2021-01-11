import { ActionState } from "../redux";

import * as actionTypes from "../actionTypes";

const initialState: ActionState = {
  actionList: [],
  actionListLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ACTION_LIST_LOADING:
      return { ...state, actionListLoading: true };
    case actionTypes.ACTION_LIST_FINISH:
      return { ...state, actionListLoading: false };
    case actionTypes.UPDATE_ACTION_LIST:
      return { ...state, actionList: payload.actionList };
    default:
      return state;
  }
};
