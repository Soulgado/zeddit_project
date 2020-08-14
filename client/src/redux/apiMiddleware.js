import * as types from "./types";

const apiMiddleware = (store) => (next) => (action) => {
  if (!action.meta || action.meta.type !== "api") {
    return next(action);
  }

  // for loading placeholder
  if (action.meta.loading) {
    // not every action requires loading placeholder
    store.dispatch({
      type: types.LOADING,
    });
  }

  const { url } = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  return fetch(url, fetchOptions)
    .then((resp) => resp.json())
    .then((json) => {
      let newAction = Object.assign({}, action, {
        payload: json,
      });
      if (action.meta.loading) {
        store.dispatch({
          type: types.END_LOADING,
        });
      }
      delete newAction.meta;
      store.dispatch(newAction);
    });
};

export default apiMiddleware;
