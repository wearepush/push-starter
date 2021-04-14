import 'core-js/stable';

import React from 'react';
import { hydrate, render } from 'react-dom';
import { createBrowserHistory as createHistory } from 'history';
import { Root } from 'components';
import { ApiClient } from 'helpers';

import getRoutes from './routes/routes';
import configureStore from './redux/store';

// https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration
if (window.history.scrollRestoration) {
  window.history.scrollRestoration = 'manual';
}

const client = new ApiClient();
const initialState = window.INITIAL_STATE;
const history = createHistory();
const store = configureStore(history, client, initialState);
const dest = document.getElementById('root');
const renderRoot = process.env.NODE_ENV === 'development' ? render : hydrate;

renderRoot(<Root history={history} routes={getRoutes(store)} store={store} />, dest);
