import React, { Component, PropTypes } from 'react';
import styles from './Col.scss';

export default class Col extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.col}>
        {children}
      </div>
    );
  }
}
