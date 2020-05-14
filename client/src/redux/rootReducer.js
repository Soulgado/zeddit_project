import { combineReducers } from 'redux';

import * as user from './reducers/userReducers';
import * as userAction from './reducers/userActionsReducer';
import * as subzeddit from './reducers/subzedditReducer';
import * as post from './reducers/postReducers';
import * as loading from './reducers/loadingReducers';

export const rootReducer = combineReducers({
  currentUser: user.reducer,
  userAction: userAction.reducer,
  subzeddit: subzeddit.reducer,
  post: post.reducer,
  loading: loading.reducer
})

export const initialState = {
  currentUser: user.initialState,
  userAction: userAction.initialState,
  subzeddit: subzeddit.initialState,
  post: post.initialState,
  loading: loading.initialState
}