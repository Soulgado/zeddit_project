import { createStore, applyMiddleware } from "redux";
import { initialState, rootReducer } from "./rootReducer";

import apiMiddleware from "./apiMiddleware";

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(apiMiddleware)
  );
  return store;
};

export default configureStore;
