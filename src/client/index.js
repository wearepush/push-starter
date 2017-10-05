import 'babel-polyfill';

import React from 'react';
import { fromJS } from 'immutable';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

import Root from './root';
import ApiClient from './../helpers/ApiClient';
import getRoutes from './../app/routes';
import config from './../app/config';
import configureStore from './../app/redux/store';

const client = new ApiClient();
const initialState = fromJS(window.__INITIAL_STATE__);
const store = configureStore(client, initialState);
const dest = document.getElementById('root');

const hydrateApp = renderProps => hydrate(
  <AppContainer
    errorReporter={Redbox}
  >
    <Root
      {...renderProps}
    />
  </AppContainer>,
  dest
);

hydrateApp({
  routes: getRoutes(store),
  store
});

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (
    !config.ssr
    &&
    (!dest || !dest.firstChild
      ||
      !dest.firstChild.attributes
      ||
      !dest.firstChild.attributes['data-react-checksum']
    )
  ) {
    console.error('Server-side React render was discarded.');
  }
}

if (module.hot) {
  const isString = string => typeof string === 'string';
  const orgError = console.error;
  console.error = (...args) => {
    if (
      args
      && args.length === 1
      && isString(args[0])
      && args[0].indexOf('You cannot change <Router ') > -1
    ) {
    // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };

  module.hot.accept('../app/routes', () => {
    const nextRoutes = require('../app/routes');
    hydrateApp({
      routes: nextRoutes(store),
      store
    });
  });
}
