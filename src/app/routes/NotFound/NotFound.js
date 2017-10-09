import React from 'react';
import { Route } from 'react-router-dom';
import styles from './NotFound.scss';

const NotFound = () => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404; // eslint-disable-line
      }
      return (
        <div className={styles.notfoundpage}>
          <h1>404 : Not Found</h1>
        </div>
      );
    }}
  />
);

export default NotFound;
