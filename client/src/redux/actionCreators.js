import * as types from './types';

export const createAccount = (formData) => ({
  type: types.CREATE_ACCOUNT,
  payload: '',
  meta: {
    type: 'api',
    method: 'POST',
    url: 'api/users/register',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

export const login = (user) => ({
  type: types.LOGIN,
  payload: '',
  meta: {
    type: 'api',
    url: '/api/users/signin',
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const logout = () => ({
  type: types.LOGOUT
});

export const createSubzeddit = (formData) => ({
  type: types.CREATE_SUBZEDDIT,
  payload: 0,
  meta: {
    type: 'api',
    url: '/api/sz/create',
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const getSubzedditsList = () => ({
  type: types.GET_SUBZEDDITS,
  payload: 0,
  meta: {
    type: 'api',
    url: '/api/sz/index'
  }
});

export const getSubzeddit = (title) => ({
  type: types.SUBZEDDIT_DETAIL,
  meta: {
    type: 'api',
    url: `/api/sz/subzeddit/${title}`
  }
});

export const createNewPost = (user, formData, subzeddit) => ({
  type: types.CREATE_POST,
  meta: {
    type: 'api',
    url: '/api/sz/post/create',
    method: 'POST',
    body: JSON.stringify({...formData, user, subzeddit}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const getPost = (post) => ({
  type: types.GET_POST,
  meta: {
    type: 'api',
    url: `/api/sz/posts/${post}` 
  }
})

export const postComment = (user, comment, post) => ({
  type: types.POST_COMMENT,
  meta: {
    type: 'api',
    url: '/api/sz/comment/create',
    method: 'POST',
    body: JSON.stringify({user, comment, post}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const getMostPopularGlobal = () => ({
  type: types.GET_MOST_POPULAR_GLOBAL,
  meta: {
    type: 'api',
    url: '/api/sz/subzeddit/popular'   // template 
  }
});

export const getMostPopularSpecific = (user) => ({
  type: types.GET_MOST_POPULAR_SPECIFIC,
  meta: {
    type: 'api',
    url: `/api/sz/subzeddit/${user.username}/popular`   // template 
  }
});

export const votePost = (post, user, user_rating) => ({
  type: types.VOTE_POST,
  meta: {
    type: 'api',
    url: '/api/sz/post/rate',
    body: JSON.stringify({ post, user, user_rating }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const getUserSubscriptions = user => ({
  type: types.GET_USER_SUBSCRIPTIONS,
  meta: {
    type: 'api',
    url: `/api/users/${user.id}/subscriptions`
  }
});

export const getUserSubscription = (user, subzeddit) => ({
  type: types.GET_USER_SUBSCRIPTION,
  meta: {
    type: 'api',
    url: `/api/sz/subscribe_status?user=${user}&subzeddit=${subzeddit}`
  }
});

export const changeSubscriptionStatus = (user, subzeddit, status) => {
  let request = {
    type: types.CHANGE_SUBSCRIPTION_STATUS,
    meta: {
      type: 'api',
      method: 'POST',
      body: JSON.stringify({user, subzeddit}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };
  if (status) {
    request.meta.url = '/api/users/unsub_from_subzeddit'
  } else {
    request.meta.url = '/api/users/subscribe_to_subzeddit'
  }
  return fetch;
}

export const getUpvotedPosts = user => ({
  type: types.GET_USER_UPVOTED_POSTS,
  meta: {
    type: 'api',
    url: `/api/users/${user.id}/upvoted`
  }
}); 

export const getDownvotedPosts = user => ({
  type: types.GET_USER_DOWNVOTED_POSTS,
  meta: {
    type: 'api',
    url: `/api/users/${user.id}/downvoted`
  }
})

