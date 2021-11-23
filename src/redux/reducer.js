import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import * as reducers from './reducers';

export default function createReducer({ router }) {
  return combineReducers({
    router,
    form,
    ...reducers,
  });
}
