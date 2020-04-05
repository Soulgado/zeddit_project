import * as types from './types';

export function createAccount() {

}

export const login = (user) => ({
  type: types.LOGIN,
  payload: user
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

export const getPost = (post, subzeddit) => ({
  type: types.GET_POST,
  meta: {
    type: 'api',
    url: `/api/sz/subzeddit/${subzeddit}/${post}`  // template
  }
})

export const postComment = (user, comment, post) => ({
  types: types.POST_COMMENT,
  meta: {
    type: 'api',
    url: '',
    method: 'POST',
    body: JSON.stringify({user, comment, post}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

