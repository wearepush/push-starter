import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

const Header = () => (
  <div className={styles.Header}>
    <div className={styles.Header__container}>
      <Link className={styles.Header__link} to="/">
        Home
      </Link>
      <Link className={styles.Header__link} to="/users">
        Users
      </Link>
    </div>
  </div>
);

export default Header;
