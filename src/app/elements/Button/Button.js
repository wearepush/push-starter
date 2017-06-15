import React from 'react';
import { string, node } from 'prop-types';
import { Button as ButtonUI } from 'semantic-ui-react';

const Button = ({
  children,
  ...rest
}) => (
  <ButtonUI
    {...rest}
  >
    {children}
  </ButtonUI>
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
