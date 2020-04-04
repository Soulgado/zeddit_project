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

// helper function for connecting to backend

function fetch(path, data) {

}