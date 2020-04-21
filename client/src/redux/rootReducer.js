import { combineReducers } from 'redux';

import * as user from './reducers/userReducers';
import * as userAction from './reducers/userActionsReducer';
import * as subzeddit from './reducers/subzedditReducer';
import * as post from './reducers/postReducers';

export const rootReducer = combineReducers({
  currentUser: user.reducer,
  userAction: userAction.reducer,
  subzeddit: subzeddit.reducer,
  post: post.reducer,
})

export const initialState = {
  currentUser: user.initialState,
  userAction: userAction.initialState,
  subzeddit: subzeddit.initialState,
  post: post.initialState,
}