import * as types from "./types";

// user actions

export const createAccount = (formData) => ({
  type: types.CREATE_ACCOUNT,
  payload: "",
  meta: {  
    type: "api",
    method: "POST",
    url: "api/users/register",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
    loading: true,
  },
});

export const resetRegistrationSuccess = () => ({
  type: types.RESET_REGISTRATION_SUCCESS,
  payload: null,
});

export const login = (user) => ({
  type: types.LOGIN,
  payload: "",
  meta: {
    type: "api",
    url: "/api/users/signin",
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    loading: true,
  },
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const resetUserFormErrors = () => ({
  type: types.RESET_USER_FORM_ERRORS,
});

// subzeddits actions

export const createSubzeddit = (formData) => ({
  type: types.CREATE_SUBZEDDIT,
  payload: 0,
  meta: {
    type: "api",
    loading: true,
    url: "/api/sz",
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const resetSubzedditFormErrors = () => ({
  type: types.RESET_SUBZEDDIT_FORM_ERRORS,
});

export const resetCreationSuccess = () => ({
  type: types.RESET_CREATION_SUCCESS,
});

export const getSubzedditsList = (user) => ({
  type: types.GET_SUBZEDDITS,
  payload: 0,
  meta: {
    type: "api",
    loading: true,
    url: `/api/sz/list?user=${user ? user.id : ""}`,
  },
});

export const getSubzeddit = (title, user) => ({
  type: types.SUBZEDDIT_DETAIL,
  meta: {
    type: "api",
    loading: true,
    url: `/api/sz/${title}?user=${user ? user.id : ""}`,
  },
});

export const getSubzedditPosts = (title, user, page) => ({
  type: types.GET_SUBZEDDIT_POSTS,
  meta: {
    type: "api",
    loading: true,
    url: `/api/sz/${title}/posts?user=${user ? user.id : ""}&page=${page}`
  }
})

export const getSubzedditTitles = () => ({
  type: types.GET_SUBZEDDITS_TITLES,
  meta: {
    type: "api",
    url: "/api/sz/get_titles",
  },
});

// user profile actions

export const getUserSubscriptions = (user) => ({
  type: types.GET_USER_SUBSCRIPTIONS,
  meta: {
    type: "api",
    url: `/api/users/${user.id}/subscriptions`,
  },
});

/*
// helper action
export const getUserSubscription = (user, subzeddit) => ({
  type: types.GET_USER_SUBSCRIPTION,
  meta: {
    type: "api",
    url: `/api/sz/subscribe_status?user=${user}&subzeddit=${subzeddit}`,
  },
});
*/

export const changeSubscriptionStatus = (user, subzeddit, status) => {
  let request = {
    type: types.CHANGE_SUBSCRIPTION_STATUS,
    meta: {
      type: "api",
      method: "POST",
      body: JSON.stringify({ user, subzeddit }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
  if (status) {
    request.meta.url = "/api/users/unsub_from_subzeddit";
  } else {
    request.meta.url = "/api/users/subscribe_to_subzeddit";
  }
  return request;
};

export const getUpvotedPosts = (user) => ({
  type: types.GET_USER_UPVOTED_POSTS,
  meta: {
    type: "api",
    loading: true,
    url: `/api/users/${user.id}/upvoted`,
  },
});

export const getDownvotedPosts = (user) => ({
  type: types.GET_USER_DOWNVOTED_POSTS,
  meta: {
    type: "api",
    loading: true,
    url: `/api/users/${user.id}/downvoted`,
  },
});

export const resetPostDeleteFlag = () => ({
  type: types.RESET_POST_DELETE_FLAG
});

export const editUsername = (formData) => ({
  type: types.UPDATE_USERNAME,
  meta: {
    type: "api",
    url: "/api/users/update_username",
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const editPassword = (formData) => ({
  type: types.UPDATE_PASSWORD,
  meta: {
    type: "api",
    url: "/api/users/update_password",
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const deleteAccount = (username, password) => ({
  type: types.DELETE_ACCOUNT,
  meta: {
    type: "api",
    url: "/api/users/delete_user",
    method: "DELETE",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const getSubmittedPosts = (user) => ({
  type: types.GET_SUBMITTED_POSTS,
  meta: {
    type: "api",
    loading: true,
    url: `/api/users/${user.id}/created_posts`,
  },
});

export const editEmail = (formData) => ({
  type: types.UPDATE_EMAIL,
  meta: {
    type: "api",
    url: "/api/users/update_email",
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

// posts actions

export const createNewPost = (user, formData) => ({
  type: types.CREATE_POST,
  meta: {
    type: "api",
    url: "/api/posts/create_text",
    loading: true,
    method: "POST",
    body: JSON.stringify({ ...formData, user }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const createNewImagePost = (formData) => ({
  type: types.CREATE_POST,
  meta: {
    type: "api",
    loading: true,
    url: "/api/posts/create_img",
    method: "POST",
    body: formData,  // formData already formatted with FormsAPI
  },
});

export const resetPostFormErrors = () => ({
  type: types.RESET_POST_FORM_ERRORS,
});

export const getPost = (post, user) => {
  let request = {
    type: types.GET_POST,
    meta: {
      loading: true,
      type: "api",
    },
  };
  if (user) {
    request.meta.url = `/api/posts/${post}?user=${user.id}`;
  } else {
    request.meta.url = `/api/posts/${post}`;
  }
  return request;
};

export const votePost = (post, user, user_rating) => ({
  type: types.VOTE_POST,
  meta: {
    type: "api",
    url: "/api/posts/rate",
    body: JSON.stringify({ post, user, user_rating }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const getMostPopularDefault = (user) => {
  let request = {
    type: types.GET_MOST_POPULAR_DEFAULT,
    meta: {
      type: "api",
      loading: true
    }
  };
  if (user) {
    request.meta.url = `/api/posts/most_popular_user?user=${user.id}`;
  } else {
    request.meta.url = `/api/posts/most_popular_default`
  }
  return request;
};

export const editTextPost = (user, post, formData) => ({
  type: types.EDIT_POST,
  meta: {
    type: "api",
    method: "PUT",
    loading: true,
    url: "/api/posts",
    body: JSON.stringify({ user, post, ...formData, type: "text" }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const editImagePost = (user, post, formData) => ({
  type: types.EDIT_POST,
  meta: {
    type: "api",
    method: "PUT",
    loading: true,
    url: "/api/posts",
    body: JSON.stringify({ user, post, ...formData, type: "image" }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const deletePost = (user, post) => ({
  type: types.DELETE_POST,
  meta: {
    type: "api",
    method: "DELETE",
    url: "/api/posts",
    body: JSON.stringify({ user, post }),
    headers: {
      "Content-Type": "application/json",
    },
    loading: true
  },
});

// comments actions

export const postComment = (user, content, post, parent_comment) => ({
  type: types.POST_COMMENT,
  meta: {
    type: "api",
    url: "/api/comments",
    method: "POST",
    body: JSON.stringify({ user, content, post, parent_comment }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const resetCommentCreationFlag = () => ({
  type: types.RESET_COMMENT_CREATION_FLAG,
});

export const editComment = (user, comment, content) => ({
  type: types.EDIT_COMMENT,
  meta: {
    type: "api",
    url: "/api/comments",
    method: "PUT",
    body: JSON.stringify({ user, comment, content }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const deleteComment = (user, comment) => ({
  type: types.DELETE_COMMENT,
  meta: {
    type: "api",
    url: "/api/comments",
    method: "DELETE",
    body: JSON.stringify({ user, comment }),
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const voteComment = (comment, user, user_rating) => ({
  type: types.VOTE_COMMENT,
  meta: {
    type: "api",
    url: "/api/comments/rate",
    body: JSON.stringify({ comment, user, user_rating }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
});