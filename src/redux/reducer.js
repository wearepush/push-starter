import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';

import users, { STATE_KEY as USERS_STATE_KEY } from './modules/users';

export default function createReducer() {
  return combineReducers({
    form,
    router,
    [USERS_STATE_KEY]: users,
  });
}
