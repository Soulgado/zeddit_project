import * as types from './types';

// ToDo: divide reducers

export const initialState = {
  user: undefined,
  loggedIn: false,
  subzedditsList: [],
  subzeddit: {},
  posts: [],
  mostPopularGlobal: [],
  mostPopularSpecific: [],
  userSubscriptions: [],
  userSubscriptionsStatus: {},
  userUpvotedPosts: [],
  userDownvotedPosts: []
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
      state.posts.push(action.payload.data);
      return {...state};
    case types.POST_COMMENT:
      return {...state};
    case types.GET_MOST_POPULAR_GLOBAL:
      return {...state, mostPopularGlobal: action.payload.posts}
    case types.GET_USER_SUBSCRIPTIONS:
      return {...state, userSubscriptions: [...action.payload.data]}
    case types.GET_USER_SUBSCRIPTION:
      let { subzeddit, status } = action.payload.data;
      state.userSubscriptionsStatus[subzeddit] = status;
      return {...state}
    case types.GET_USER_UPVOTED_POSTS:
      return {...state, userUpvotedPosts: action.payload.data}
    case types.GET_USER_DOWNVOTED_POSTS:
      return {...state, userDownvotedPosts: action.payload.data}
    default:
      return state;
  }
}