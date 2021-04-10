import 'core-js/stable';

import React from 'react';
import { hydrate, render } from 'react-dom';
import { createBrowserHistory as createHistory } from 'history';

import Root from './root';
import ApiClient from '../helpers/ApiClient';
import getRoutes from '../routes/routes';
import configureStore from '../redux/store';

// https://github.com/gaearon/react-hot-loader
// "Make sure `react-hot-loader` is required before `react` and `react-dom`".
require('react-hot-loader');

const client = new ApiClient();
const initialState = window.INITIAL_STATE;
const history = createHistory();
const store = configureStore(history, client, initialState);
const dest = document.getElementById('root');
const renderRoot = process.env.NODE_ENV === 'development' ? render : hydrate;

renderRoot(<Root history={history} routes={getRoutes(store)} store={store} />, dest);

// if (module.hot) {
//   module.hot.accept('../routes/routes', () => {
//     const nextRoutes = require('../routes/routes').default;
//     renderRoot({
//       routes: nextRoutes(store),
//       store,
//       history,
//     });
//   });
// }
