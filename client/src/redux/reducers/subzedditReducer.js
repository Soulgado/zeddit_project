import * as types from "../types.js";

export const initialState = {
  subzedditsList: [],
  subzedditsTitles: [],
  subzeddit: {},
  mostPopularGlobal: [],
  mostPopularSpecific: [],
  creationSuccess: false,
  formErrors: undefined,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SUBZEDDITS:
      return { ...state, subzedditsList: action.payload.data };
    case types.CREATE_SUBZEDDIT:
      if (action.payload.result === "success") {
        return { ...state, creationSuccess: true };
      } else {
        return { ...state, formErrors: action.payload.errors };
      }
    case types.SUBZEDDIT_DETAIL:
      return { ...state, subzeddit: action.payload.data };
    case types.GET_MOST_POPULAR_DEFAULT:
      return { ...state, mostPopularGlobal: action.payload.data };
    case types.GET_SUBZEDDITS_TITLES:
      return { ...state, subzedditsTitles: action.payload.data };
    case types.RESET_CREATION_SUCCESS:
      return { ...state, creationSuccess: false };
    case types.RESET_SUBZEDDIT_FORM_ERRORS:
      return { ...state, formErrors: undefined };
    default:
      return state;
  }
};
