import React from 'react';
import { string, node } from 'prop-types';

const Button = ({
  children,
  ...rest
}) => (
  <button
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: string,
  children: node
};

Button.defaultProps = {
  type: 'button',
  children: null
};

export default Button;
