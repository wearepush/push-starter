import React, { PureComponent } from 'react';
import styles from './Footer.scss';

export default class Footer extends PureComponent {
  render() {
    const githubUrl = 'https://github.com/krasevych/english-school';

    return (
      <div className={styles.footer}>
        <span>Have questions? Contact with me for help on </span>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
        <div className={styles.footer__minion} />
      </div>
    );
  }
}
