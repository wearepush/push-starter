import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import {
  setToImmutableStateFunc,
  setToMutableStateFunc,
  immutableReducer as reduxAsyncConnect
} from 'redux-connect';

import routeReducer from './routing';
import auth from './modules/auth';

setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

export default function createReducer() {
  return combineReducers({
    routing: routeReducer,
    reduxAsyncConnect,
    auth
  });
}