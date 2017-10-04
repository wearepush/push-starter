import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';

import auth from './modules/auth';

export default function createReducer() {
  return combineReducers({
    form,
    auth
  });
}
