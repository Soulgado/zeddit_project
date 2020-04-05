import * as types from './types';

export const initialState = {
  user: undefined,
  loggedIn: false,
  subzedditsNumber: 0,
  subzedditsList: [],
  subzeddit: {}
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
    case types.CREATE_POST:
      return {...state};
    case types.SUBZEDDIT_DETAIL:
      return {...state, subzeddit: action.payload.data}
    default:
      return state;
  }
}