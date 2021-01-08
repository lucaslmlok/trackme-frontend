import { ActionState } from "../redux";

import * as actionTypes from "../actionTypes";

const initialState: ActionState = {
  actionList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.UPDATE_ACTION_LIST:
      return { ...state, actionList: payload.actionList };
    default:
      return state;
  }
};
