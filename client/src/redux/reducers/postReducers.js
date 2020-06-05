import * as types from "../types";

export const initialState = {
  post: {},
  creationFlag: false,
  formErrors: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      if (action.payload.result === "success") {
        return { ...state, creationFlag: true, post: action.payload.data };
      } else {
        return { ...state, formErrors: action.payload.errors };
      }
    case types.GET_POST:
      return { ...state, post: action.payload.data };
    case types.POST_COMMENT:
      if (action.payload.result === "success") {
        return { ...state, creationFlag: true };
      } else {
        return state;
      }
    case types.EDIT_COMMENT:
      if (action.payload.result === "success") {
        return { ...state, creationFlag: true };
      } else {
        return state;
      }
    case types.DELETE_COMMENT:
      if (action.payload.result === "success") {
        return { ...state, creationFlag: true };
      } else {
        return state;
      }
    case types.EDIT_POST:
      if (action.payload.result === "success") {
        return { ...state, creationFlag: true };
      } else {
        return { ...state, formErrors: action.payload.errors };
      }
    case types.DELETE_POST:
      if (action.payload.result === "success") {
        return { ...state, creationFlag: true, post: action.payload.data };
      } else {
        return state;
      }
    case types.RESET_COMMENT_CREATION_FLAG:
      return { ...state, creationFlag: false };
    case types.RESET_POST_FORM_ERRORS:
      return { ...state, formErrors: undefined };
    default:
      return state;
  }
};
