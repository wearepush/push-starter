import React, { Component } from 'react';
import { node } from 'prop-types';

import styles from './Group.scss';

export default class Group extends Component {
  static propTypes = {
    children: node.isRequired
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

