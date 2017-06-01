import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
// import Helmet from 'react-helmet';
import { object, func } from 'prop-types';
import { isLoaded as isAuthLoaded, load as loadAuth } from '../../redux/modules/auth';
import { Header, Footer } from '../../components';
// import config from '../../config';
import styles from './App.scss';

const mapAsyncConnect = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();
    const reduxAsyncConnect = state.get('reduxAsyncConnect');
    const auth = state.get('auth');

    if (!reduxAsyncConnect.get('loaded') && !isAuthLoaded(reduxAsyncConnect) && !auth.get('error')) {
      promises.push(
        dispatch(loadAuth())
        .then(() => {}, () => {})
        .catch(err => console.log(err))
      );
    }
    return Promise.all(promises);
  }
}];

const mapStateToProps = state => ({
  user: state.getIn(['auth', 'user'])
});

const mapDispatchToProps = {
  pushState: push
};

class App extends Component {
  static propTypes = {
    children: object,
    history: object,  // eslint-disable-line
    pushState: func.isRequired,
    user: object
  };

  static defaultProps = {
    children: null,
    history: null,
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
        <Header />
        <div className={styles.app__container}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default asyncConnect(mapAsyncConnect)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
