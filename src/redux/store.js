import { routerMiddleware } from 'connected-react-router';
import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import createReducer from './reducer';
import createMiddleware from './middleware/clientMiddleware';

export default function configureStore(history, client, initialState = {}) {
  const reducer = createReducer({
    history,
  });
  const middleware = [createMiddleware(client), routerMiddleware(history)];
  const store = configureStoreToolkit({
    devTools: process.env.REACT_APP_REDUX_DEVTOOLS === 'true',
    reducer,
    middleware,
    preloadedState: initialState,
  });
  return store;
}
