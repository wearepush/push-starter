import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { func, object } from 'prop-types';
import config from './config';

import { isLoaded as isAuthLoaded, load as loadAuth } from '../../redux/modules/auth';
import styles from './App.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();
    if (!state.reduxAsyncConnect.loaded && !isAuthLoaded(state) && !state.auth.error) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user
  }),
  {
    pushState: push
  }
)
export default class App extends Component {
  static propTypes = {
    children: object,
    user: object,
    pushState: func.isRequired
  };

  static defaultProps = {
    children: null,
    user: null
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Helmet {...config.meta.head} />
        <div className={styles.app__container}>{this.props.children}</div>
      </div>
    );
  }
}
