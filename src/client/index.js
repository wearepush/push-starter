import 'babel-polyfill';

import React from 'react';
import { fromJS } from 'immutable';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import Root from './root';
import ApiClient from './../helpers/ApiClient';
import getRoutes from './../app/routes';
import config from './../app/config';
import configureStore from './../app/redux/store';

const client = new ApiClient();
const initialState = fromJS(window.__INITIAL_STATE__);
const history = createHistory();
const store = configureStore(history, client, initialState);
const dest = document.getElementById('root');

let renderApp = renderProps => render(
  <Root
    {...renderProps}
  />,
  dest
);

if (config.env === 'development') {
  const RedBox = require('redbox-react').default;
  const RHL = require('react-hot-loader');
  renderApp = renderProps => render(
    <RHL.AppContainer
      errorReporter={RedBox}
    >
      <Root
        {...renderProps}
      />
    </RHL.AppContainer>,
    dest
  );
}

renderApp({
  routes: getRoutes(store),
  store,
  history
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
    const nextRoutes = require('../app/routes').default;
    renderApp({
      routes: nextRoutes(store),
      store,
      history
    });
  });
}
