import * as types from '../types';

export const initialState = {
  posts: []
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return {...state};
    case types.GET_POST:
      state.posts.push(action.payload.data);
      return {...state};
    case types.POST_COMMENT:
      return {...state};
    default: 
      return state;
  }
}