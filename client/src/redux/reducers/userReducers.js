import * as types from '../types';

export const initialState = {
  user: undefined,
  loggedIn: false,
  successFlag: false,
  formErrors: undefined,
}

// add error message for user
export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      if (action.payload.result === 'success') {
        return {...state, successFlag: true};
      } else {
        return {...state, formErrors: action.payload.errors};
      }
    case types.LOGIN:
      if (action.payload.result === 'success') {
        return {...state, user: action.payload.user, loggedIn: true};
      } else {
        return {...state, formErrors: action.payload.errors};
      } 
    case types.LOGOUT:
      return {...state, user: undefined, loggedIn: false};
    case types.RESET_REGISTRATION_SUCCESS:
      return {...state, successFlag: false}
    case types.RESET_USER_FORM_ERRORS:
      return {...state, formErrors: undefined}
    default:
      return state;
  }
}