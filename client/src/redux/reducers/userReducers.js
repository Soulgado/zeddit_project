import * as types from '../types';

export const initialState = {
  user: undefined,
  loggedIn: false,
  successFlag: false
}

// add error message for user
export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      if (action.payload.result === 'success') {
        return {...state, successFlag: true};
      } else {
        return state;
      }
    case types.LOGIN:
      if (action.payload.result === 'success') {
        return {...state, user: action.payload.user, loggedIn: true};
      } else {
        return {...state};
      } 
    case types.LOGOUT:
      return {...state, user: undefined, loggedIn: false};
    case types.RESET_REGISTRATION_SUCCESS:
      return {...state, successFlag: false}
    default:
      return state;
  }
}