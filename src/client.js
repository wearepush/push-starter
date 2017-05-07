/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory, applyRouterMiddleware } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { useScroll } from 'react-router-scroll';
import { supportsHistory } from 'history/lib/DOMUtils';
import { CookiesProvider } from 'react-cookie';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

const historyStrategy = supportsHistory() ? browserHistory : hashHistory;
const client = new ApiClient();
const dest = document.getElementById('content');
const logger = createLogger();
const store = createStore(historyStrategy, client, window.__data, logger);
const history = syncHistoryWithStore(historyStrategy, store);

const component = (
  <Router
    render={props =>
      (
        <ReduxAsyncConnect
          {...props}
          helpers={{ client }}
          filter={item => !item.deferred}
          render={applyRouterMiddleware(useScroll((prevProps, { location, routes }) => {
            if (routes.some(route => route.ignoreScrollBehavior)) {
              return false;
            }
            if (prevProps && `${location.pathname}${location.search}` !== `${prevProps.location.pathname}${prevProps.location.search}`) {
              return [0, 0];
            }
            return true;
          }))}
        />
      )
    }
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store} key="provider">
      {component}
    </Provider>
  </CookiesProvider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
