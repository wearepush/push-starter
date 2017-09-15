import { fromJS } from 'immutable';
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import {
  setToImmutableStateFunc,
  setToMutableStateFunc,
  immutableReducer as reduxAsyncConnect
} from 'redux-connect';

import routing from './routing';
import auth from './modules/auth';

setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

export default function createReducer() {
  return combineReducers({
    routing,
    form,
    reduxAsyncConnect,
    auth
  });
}
