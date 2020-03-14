import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import users, { STATE_KEY as USERS_STATE_KEY } from './modules/users';

export default function createReducer({ history = undefined }) {
  return combineReducers({
    router: connectRouter(history),
    form,
    [USERS_STATE_KEY]: users,
  });
}
