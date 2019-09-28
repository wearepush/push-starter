import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';
import './normalize.scss';
import '../styles/layout/index.scss';
import 'redux-starter-ui/dist/index.css';

const Root = ({
  history,
  routes,
  store
}) => (
  <HelmetProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>
  </HelmetProvider>
);

Root.propTypes = {
  history: object.isRequired,
  store: object.isRequired,
  routes: oneOfType([
    array,
    object,
  ]).isRequired
};

export default Root;
