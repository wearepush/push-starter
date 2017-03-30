import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import styles from './index.scss';

export default class HomePage extends Component {
  render() {
    return (
      <div className={styles.homepage}>
        <Helmet {...config.meta.home} />
      </div>
    );
  }
}
