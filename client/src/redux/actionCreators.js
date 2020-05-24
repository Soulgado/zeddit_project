import * as types from './types';

// create specific actionCreators for reducers

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
    },
    loading: true
  }
});

export const resetRegistrationSuccess = () => ({
  type: types.RESET_REGISTRATION_SUCCESS,
  payload: null
});

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
    },
    loading: true
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
    loading: true,
    url: '/api/sz/create',
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const resetCreationSuccess = () => ({
  type: types.RESET_CREATION_SUCCESS
});

export const resetUserFormErrors = () => ({
  type: types.RESET_USER_FORM_ERRORS
})

export const getSubzedditsList = (user) => ({
  type: types.GET_SUBZEDDITS,
  payload: 0,
  meta: {
    type: 'api',
    loading: true,
    url: `/api/sz/subzeddits_list?user=${user ? user.id : ''}`
  }
});

export const getSubzeddit = (title, user) => ({
  type: types.SUBZEDDIT_DETAIL,
  meta: {
    type: 'api',
    url: `/api/sz/subzeddit/${title}?user=${user ? user.id : ''}`
  }
});

export const createNewPost = (user, formData) => ({
  type: types.CREATE_POST,
  meta: {
    type: 'api',
    url: '/api/sz/post/create',
    method: 'POST',
    body: JSON.stringify({...formData, user}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const createNewImagePost = formData => ({
  type: types.CREATE_POST,
  meta: {
    type: 'api',
    url: '/api/sz/post/create_img',
    method: 'POST',
    body: formData
  }
});

export const resetPostFormErrors = () => ({
  type: types.RESET_POST_FORM_ERRORS
})

export const getPost = (post, user) => {
  let request = {
    type: types.GET_POST,
    meta: {
      type: 'api'
    }
  }
  if (user) {
    request.meta.url = `/api/sz/posts/${post}?user=${user.id}`;
  } else {
    request.meta.url = `/api/sz/posts/${post}?user=0`; 
  }
  return request;
}

export const postComment = (user, content, post, parent_comment) => ({
  type: types.POST_COMMENT,
  meta: {
    type: 'api',
    url: '/api/sz/comment/create',
    method: 'POST',
    body: JSON.stringify({user, content, post, parent_comment}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const resetCommentCreationFlag = () => ({
  type: types.RESET_COMMENT_CREATION_FLAG
})

export const editComment = (user, comment, content) => ({
  type: types.EDIT_COMMENT,
  meta: {
    type: 'api',
    url: '/api/sz/comment/edit_comment',
    method: 'POST',
    body: JSON.stringify({ user, comment, content }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const deleteComment = (user, comment) => ({
  type: types.DELETE_COMMENT,
  meta: {
    type: 'api',
    url: '/api/sz/comment/delete_comment',
    method: 'DELETE',
    body: JSON.stringify({user, comment}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

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
    url: `/api/users/${user}/subscriptions`
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
  return request;
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
});

export const getMostPopularDefault = user => ({
  type: types.GET_MOST_POPULAR_DEFAULT,
  meta: {
    type: 'api',
    loading: true,
    url: `/api/sz/most_popular_default?user=${user ? user.id : '0'}`
  }
});

export const getSubzedditTitles = () => ({
  type: types.GET_SUBZEDDITS_TITLES,
  meta: {
    type: 'api',
    url: '/api/sz/get_subzeddits_titles'
  }
});

export const editPost = (user, post, formData) => ({
  type: types.EDIT_POST,
  meta: {
    type: 'api',
    method: 'POST',
    url: '/api/sz/edit_post',
    body: JSON.stringify({user, post, ...formData}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const deletePost = (user, post) => ({
  type: types.DELETE_POST,
  meta: {
    type: 'api',
    method: 'DELETE',
    url: '/api/sz/post/delete_post',
    body: JSON.stringify({user, post}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

export const voteComment = (comment, user, user_rating) => ({
  type: types.VOTE_COMMENT,
  meta: {
    type: 'api',
    url: '/api/sz/comment/rate_comment',
    body: JSON.stringify({ comment, user, user_rating }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
});




