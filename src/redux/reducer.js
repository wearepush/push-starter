import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import users, { STATE_KEY as USERS_STATE_KEY } from './modules/users';

export default function createReducer() {
  return combineReducers({
    form,
    [USERS_STATE_KEY]: users,
  });
}
