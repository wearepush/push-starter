import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';

import './normalize.scss';
import '../styles/layout/_base.scss';
import 'redux-starter-ui/dist/index.css';

const Root = ({
  history,
  routes,
  store
}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
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
