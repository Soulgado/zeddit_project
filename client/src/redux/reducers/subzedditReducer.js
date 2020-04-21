import * as types from '../types.js';

export const initialState = {
  subzedditsList: [],
  subzedditsTitles: [],
  subzeddit: {},
  mostPopularGlobal: [],
  mostPopularSpecific: [],
  fetching: false
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.GET_SUBZEDDITS:
      return {...state, subzedditsList: action.payload.data, fetching: false};
    case types.CREATE_SUBZEDDIT:
      return {...state, fetching: false};
    case types.SUBZEDDIT_DETAIL:
      return {...state, subzeddit: action.payload.data, fetching: false}
    case types.GET_MOST_POPULAR_DEFAULT:
      return {...state, mostPopularGlobal: action.payload.data, fetching: false}
    case types.GET_SUBZEDDITS_TITLES:
      return {...state, subzedditsTitles: action.payload.data, fetching: false}
    case 'FETCHING':
      return {...state, fetching: true}
    default: 
      return state;
  }
}