import React from 'react';
import styles from './NotFound.scss';

const NotFound = () => (
  <div className={styles.notfoundpage}>
    <h5>Error 404</h5>
    <h1>Ooops!</h1>
    <p>These are <em>not</em> the droids you are looking for!</p>
  </div>
);

export default NotFound;
