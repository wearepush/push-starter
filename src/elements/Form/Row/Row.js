import React, { Component, PropTypes } from 'react';
import styles from './Row.scss';

export default class Row extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.row}>
        {children}
      </div>
    );
  }
}
