import * as types from '../types';

const defaultUser = {
  "id":2,
  "username":"soul",
  "password":"admin","email":
  "somemail@gmail.com"
}   // temporary user for production build testing

export const initialState = {
  user: defaultUser,
  loggedIn: true,
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
    case types.UPDATE_USERNAME:
      if (action.payload.result === 'success') {
        return {...state, successFlag: true};
      } else {
        return {...state, formErrors: action.payload.errors};
      }
    case types.UPDATE_PASSWORD:
      if (action.payload.result === 'success') {
        return { ...state, successFlag: true };
      } else {
        return { ...state, formErrors: action.payload.errors };
      }
    case types.DELETE_ACCOUNT:
      if (action.payload.result === 'success') {
        return { ...state, successFlag: true };
      } else {
        return { ...state, formErrors: action.payload.errors };
      }
    default:
      return state;
  }
}