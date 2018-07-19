import { reducer as form } from 'redux-form';
import { createStore, combineReducers } from 'redux';

export default createStore(
  combineReducers({ form })
);
