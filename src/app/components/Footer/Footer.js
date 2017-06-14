import React, { PureComponent } from 'react';
import styles from './Footer.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        <span>Have questions? Contact with me for help on </span>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </div>
    );
  }
}
