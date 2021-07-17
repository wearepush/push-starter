import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import * as reducers from './reducers';

export default function createReducer({ history = undefined }) {
  return combineReducers({
    router: connectRouter(history),
    form,
    ...reducers,
  });
}
