import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { object } from 'prop-types';
import { Container } from 'semantic-ui-react';

import { Header, Footer } from 'components';

import styles from './App.scss';

const mapStateToProps = state => ({
  user: state.getIn(['auth', 'user'])
});

const mapDispatchToProps = {};

class App extends Component {
  static propTypes = {
    route: object,
    history: object,  // eslint-disable-line
    user: object // eslint-disable-line
  };

  static defaultProps = {
    route: null,
    history: null,
    user: null
  };

  render() {
    return (
      <Container className={styles.app}>
        <Header />
        <div className={styles.app__container}>
          {renderRoutes(this.props.route.routes)}
        </div>
        <Footer />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
