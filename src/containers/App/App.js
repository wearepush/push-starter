import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import config from 'config';
import { Header, Footer } from 'components';
import { object, func, instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import styles from './App.scss';

class App extends Component {
  static propTypes = {
    children: object,
    cookies: instanceOf(Cookies).isRequired,
    history: object, // eslint-disable-line
    pushState: func.isRequired,
    user: object,
  };

  static defaultProps = {
    children: null,
    history: null,
    user: null
  };

  componentDidMount() {
    console.log(this.props.cookies);
  }

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
        <Header />
        <div className={styles.app__container}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();
    if (!state.reduxAsyncConnect.loaded && !isAuthLoaded(state) && !state.auth.error) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])(
  connect(
    state => ({
      user: state.auth.user
    }),
    {
      pushState: push
    }
  )(
    withCookies(App)
  )
);
