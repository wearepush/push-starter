import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const Root = ({
  routes,
  store
}) => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: object.isRequired,
  routes: oneOfType([
    array,
    object,
  ]).isRequired
};

export default Root;
