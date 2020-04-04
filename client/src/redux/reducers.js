import * as types from './types';

export const initialState = {
  user: undefined,
  loggedIn: false,
  subzedditsNumber: 0,
  subzedditsList: []
}

export const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      return {...state, user: action.payload};
    case types.LOGIN:
      return {...state, user: action.payload, loggedIn: true};
    case types.LOGOUT:
      return {...state, user: undefined, loggedIn: false};
    case types.GET_SUBZEDDITS:
      return {...state, subzedditsNumber: action.payload.result.number,
        subzedditsList: action.payload.result.subzeddits};
    case types.CREATE_SUBZEDDIT:
      return {...state};
    default:
      return state;
  }
}