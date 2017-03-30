import React, { PropTypes } from 'react';

const FormCaption = ({ children, ...rest }) =>
  <div {...rest} className="caption">
    {children}
  </div>;
FormCaption.propTypes = {
  children: PropTypes.node
};
export default FormCaption;
