import 'babel-polyfill';

import React from 'react';
import { fromJS } from 'immutable';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { match, browserHistory } from 'react-router';

import ApiClient from '../helpers/ApiClient';
import Root from './root';
import getRoutes from '../app/routes';
import configureStore from '../app/redux/store';

const client = new ApiClient();
const initialState = fromJS(window.__INITIAL_STATE__);
const store = configureStore(browserHistory, client, initialState);
const history = browserHistory;

const hydrateApp = renderProps => hydrate(
  <AppContainer>
    <Root {...{ store, history, ...renderProps }} />
  </AppContainer>,
  document.getElementById('root')
);

match(
  { history, routes: getRoutes(store) },
  (error, redirectLocation, renderProps) => hydrateApp(renderProps)
);

if (module.hot) {
  module.hot.accept('../app/routes', () => {
    const nextRoutes = require('../app/routes');
    hydrateApp({ routes: nextRoutes(store) });
  });
}
