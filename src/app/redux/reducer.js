import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';

import routing from './routing';
import auth from './modules/auth';

export default function createReducer() {
  return combineReducers({
    routing,
    form,
    auth
  });
}
