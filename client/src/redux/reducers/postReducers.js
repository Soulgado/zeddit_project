import * as types from '../types';

export const initialState = {
  post: {},
  commentCreationFlag: false
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return {...state};
    case types.GET_POST:
      return {...state, post: action.payload.data};
    case types.POST_COMMENT:
      if (action.payload.result === 'success') {
        return {...state, commentCreationFlag: true}
      } else {
        return state;
      }
    case types.EDIT_POST:
      return {...state, post: action.payload.data}
    case types.RESET_COMMENT_CREATION_FLAG:
      return {...state, commentCreationFlag: false}
    default: 
      return state;
  }
}