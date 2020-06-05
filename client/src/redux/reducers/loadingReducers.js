import * as types from "../types";

export const initialState = {
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true };
    case types.END_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
