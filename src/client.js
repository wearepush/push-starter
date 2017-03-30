/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import getRoutes from './routes';
import { supportsHistory } from 'history/lib/DOMUtils';
import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';

const historyStrategy = supportsHistory() ? browserHistory : hashHistory;
const client = new ApiClient();
const scroll_history = useScroll(() => historyStrategy)();
const dest = document.getElementById('content');
const logger = createLogger();
const store = createStore(scroll_history, client, window.__data, logger);
const history = syncHistoryWithStore(scroll_history, store);

const component = (
  <Router
    render={props =>
      <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />
    }
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
