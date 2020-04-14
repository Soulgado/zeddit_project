import * as types from './types';

export const initialState = {
  user: undefined,
  loggedIn: false,
  subzedditsList: [],
  subzeddit: {},
  posts: [],
  mostPopularGlobal: [],
  mostPopularSpecific: []
}

export const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      return {...state, user: action.payload};
    case types.LOGIN:
      if (action.payload.result === 'success') {
        return {...state, user: action.payload.user, loggedIn: true};
      } else {
        return {...state};
      } 
    case types.LOGOUT:
      return {...state, user: undefined, loggedIn: false};
    case types.GET_SUBZEDDITS:
      return {...state, subzedditsList: action.payload.data};
    case types.CREATE_SUBZEDDIT:
      return {...state};
    case types.CREATE_POST:
      return {...state};
    case types.SUBZEDDIT_DETAIL:
      return {...state, subzeddit: action.payload.data}
    case types.GET_POST:
      action.payload.post.upvotes = action.payload.upvotes;
      action.payload.post.downvotes = action.payload.downvotes;
      state.posts.push(action.payload.post);
      return {...state};
    case types.POST_COMMENT:
      return {...state};
    case types.GET_MOST_POPULAR_GLOBAL:
      return {...state, mostPopularGlobal: action.payload.posts}
    default:
      return state;
  }
}