import React, { Component } from 'react';
import { string, node } from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    type: string,
    children: node,
  };

  static defaultProps = {
    type: 'button',
    children: null
  };

  render() {
    const { children, ...rest } = this.props;
    return (
      <button
        {...rest}
      >
        {children}
      </button>
    );
  }
}

