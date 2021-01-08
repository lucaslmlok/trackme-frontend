import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/auth";
import actionReducer from "./reducers/action";

const rootReducer = combineReducers({
  auth: authReducer,
  action: actionReducer,
});

const middleware = [thunk];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const state = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default state;
