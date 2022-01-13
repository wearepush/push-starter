import { combineReducers } from 'redux';
import * as reducers from './reducers';

export default function createReducer({ router }) {
  return combineReducers({
    router,
    ...reducers,
  });
}
