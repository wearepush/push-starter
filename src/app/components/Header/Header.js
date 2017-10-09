import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styles from './Header.scss';

const Header = () => (
  <div className={styles.header}>
    <Menu inverted>
      <Link to="/">
        <Menu.Item>
          Home
        </Menu.Item>
      </Link>
      <Link to="/users">
        <Menu.Item>
          Users
        </Menu.Item>
      </Link>
    </Menu>
  </div>
);

export default Header;
