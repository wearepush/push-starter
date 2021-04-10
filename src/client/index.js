import 'core-js/stable';

import React from 'react';
import { hydrate } from 'react-dom';
import { createBrowserHistory as createHistory } from 'history';

import Root from './root';
import ApiClient from '../helpers/ApiClient';
import getRoutes from '../routes/routes';
import configureStore from '../redux/store';

const client = new ApiClient();
const initialState = window.INITIAL_STATE;
const history = createHistory();
const store = configureStore(history, client, initialState);
const dest = document.getElementById('root');

const renderApp = (renderProps) => hydrate(<Root {...renderProps} />, dest);

renderApp({
  routes: getRoutes(store),
  store,
  history,
});

if (module.hot) {
  const isString = (string) => typeof string === 'string';
  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && isString(args[0]) && args[0].indexOf('You cannot change <Router ') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };

  module.hot.accept('../routes/routes', () => {
    const nextRoutes = require('../routes/routes').default;
    renderApp({
      routes: nextRoutes(store),
      store,
      history,
    });
  });
}
