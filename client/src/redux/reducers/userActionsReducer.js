import * as types from '../types';

export const initialState = {
  userSubscriptions: [],
  userSubscriptionsStatus: {},
  userUpvotedPosts: [],
  userDownvotedPosts: []
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.GET_USER_UPVOTED_POSTS:
      return {...state, userUpvotedPosts: action.payload.data}
    case types.GET_USER_DOWNVOTED_POSTS:
      return {...state, userDownvotedPosts: action.payload.data}
    case types.GET_USER_SUBSCRIPTIONS:
      return { ...state, userSubscriptions: [...action.payload.data] }
    case types.GET_USER_SUBSCRIPTION:
      let { subzeddit, status } = action.payload.data;
      state.userSubscriptionsStatus[subzeddit] = status;
      return { ...state }
    default:
      return state;
  }
}