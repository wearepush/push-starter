import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';
import styles from './Header.scss';

export default class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        <Menu inverted>
          <Link to="/">
            <Menu.Item>
              Home
            </Menu.Item>
          </Link>
          <Link to="/invite">
            <Menu.Item>
              Invite
            </Menu.Item>
          </Link>
        </Menu>
      </div>
    );
  }
}
