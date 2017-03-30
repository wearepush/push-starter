import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';

import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  auth,
});
