import React, { Component, PropTypes } from 'react';
import styles from './Group.scss';

export default class Group extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.group}>
        {children}
      </div>
    );
  }
}

