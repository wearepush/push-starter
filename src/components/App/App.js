import React from 'react';
import { renderRoutes } from 'react-router-config';
import { object } from 'prop-types';

import { Header, Footer } from './../../components';
import styles from './App.scss';

const App = ({
  route: {
    routes
  }
}) => (
  <div className={styles.App}>
    <Header />
    <div className={styles.App__container}>
      {renderRoutes(routes)}
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  route: object,
};

App.defaultProps = {
  route: object,
};

export default App;
