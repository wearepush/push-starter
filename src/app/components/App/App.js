import React from 'react';
import { renderRoutes } from 'react-router-config';
import { object } from 'prop-types';
import { Container } from 'semantic-ui-react';

import { Header, Footer } from './../../components';
import styles from './App.scss';

const App = ({
  route: {
    routes
  }
}) => (
  <Container className={styles.app}>
    <Header />
    <div className={styles.app__container}>
      {renderRoutes(routes)}
    </div>
    <Footer />
  </Container>
);

App.propTypes = {
  route: object,
};

App.defaultProps = {
  route: object,
};

export default App;
