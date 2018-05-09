import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

const Header = () => (
  <div className={styles.Header}>
    <div>
      <Link to="/">
        Home
      </Link>
      <Link to="/ui">
        UI
      </Link>
      <Link to="/users">
        Users
      </Link>
    </div>
  </div>
);

export default Header;
