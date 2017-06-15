import React, { Component } from 'react';
import { string, node } from 'prop-types';
import { Button as ButtonUI } from 'semantic-ui-react';

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
      <ButtonUI
        {...rest}
      >
        {children}
      </ButtonUI>
    );
  }
}

