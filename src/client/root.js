import React, { Component } from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

export default class Root extends Component {
  static propTypes = {
    store: object.isRequired,
    history: object.isRequired, // eslint-disable-line
    routes: oneOfType([ // eslint-disable-line
      array,
      object,
    ]).isRequired
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router
          key={module.hot && new Date()}
          render={props => <ReduxAsyncConnect {...props} />}
          {...this.props}
        />
      </Provider>
    );
  }
}
