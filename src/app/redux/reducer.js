import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { routerReducer as router } from 'react-router-redux';

import auth from './modules/auth';

export default function createReducer() {
  return combineReducers({
    form,
    router,
    auth
  });
}
