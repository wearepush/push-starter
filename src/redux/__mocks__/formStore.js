import { reducer as form } from 'redux-form/immutable';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutablejs';

export default createStore(
  combineReducers({ form })
);
