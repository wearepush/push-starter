import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducer';
import createMiddleware from './middleware/clientMiddleware';

export default function configureStore(history, client, initialState = {}) {
  const reducer = createReducer();

  const middlewares = [createMiddleware(client)];

  const composeEnhancers =
    (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })) || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(
    reducer,
    fromJS(initialState),
    enhancer
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const createNextReducer = require('./reducer');
      const nextReducer = createNextReducer();

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
