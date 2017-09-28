import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

const Root = props => (
  <Provider store={props.store}>
    <Router
      key={module.hot && new Date()}
      render={rstProps => <ReduxAsyncConnect {...rstProps} />}
      {...props}
    />
  </Provider>
);

Root.propTypes = {
  store: object.isRequired,
  history: object.isRequired,
  routes: oneOfType([
    array,
    object,
  ]).isRequired
};

export default Root;
