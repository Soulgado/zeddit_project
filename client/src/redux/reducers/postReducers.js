import * as types from '../types';

export const initialState = {
  post: {}
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return {...state};
    case types.GET_POST:
      return {...state, post: action.payload.data};
    case types.POST_COMMENT:
      return {...state};
    case types.EDIT_POST:
      return {...state, post: action.payload.data}
    default: 
      return state;
  }
}