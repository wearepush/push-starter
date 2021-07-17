import 'regenerator-runtime/runtime';
import { routerMiddleware } from 'connected-react-router';
import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducer';
import { rootSaga } from './sagas';

export default function configureStore(history, client, initialState = {}) {
  const reducer = createReducer({
    history,
  });
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleware = routerMiddleware(history);
  const store = configureStoreToolkit({
    devTools: process.env.REACT_APP_REDUX_DEVTOOLS === 'true',
    reducer,
    middleware: [routeMiddleware, sagaMiddleware],
    preloadedState: initialState,
  });
  sagaMiddleware.run(rootSaga, { client });
  return store;
}
