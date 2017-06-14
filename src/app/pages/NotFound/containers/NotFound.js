import React from 'react';
// import Helmet from 'react-helmet';
// import config from 'config';
import styles from './NotFound.scss';

export default function NotFound() {
  return (
    <div className={styles.notfoundpage}>
      <h5>Error 404</h5>
      <h1>Ooops!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
    </div>
  );
}
