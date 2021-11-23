import 'regenerator-runtime/runtime';
import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import createSagaMiddleware, { END } from 'redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import createReducer from './reducer';
import rootSaga from './sagas';

export default function configureStore(history, client, initialState = {}) {
  const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
    history,
  });
  const reducer = createReducer({
    router: routerReducer,
  });
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStoreToolkit({
    devTools: process.env.REACT_APP_REDUX_DEVTOOLS === 'true',
    reducer,
    middleware: [routerMiddleware, sagaMiddleware],
    preloadedState: initialState,
  });
  store.runSaga = sagaMiddleware.run(rootSaga, { client });
  store.stopSaga = () => END;
  store.createReduxHistory = createReduxHistory;
  return store;
}
