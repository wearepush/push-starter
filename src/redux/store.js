import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createReducer from './reducer';
import createMiddleware from './middleware/clientMiddleware';

export default function configureStore(history, client, initialState = {}) {
  const reducer = createReducer();
  const middlewares = [createMiddleware(client), routerMiddleware(history)];

  const composeEnhancers =
    (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.REDUX_DEVTOOLS && process.env.REDUX_DEVTOOLS === 'true' &&
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })) || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(
    connectRouter(history)(reducer),
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const createNextReducer = require('./reducer').default;
      const nextReducer = createNextReducer();
      store.replaceReducer(
        connectRouter(
          history
        )(
          nextReducer
        )
      );
    });
  }

  return store;
}
