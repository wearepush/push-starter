import React from 'react';
import { string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import cx from 'classnames';

const Input = ({
  input,
  meta: { touched, error },
  ...rest
}) => (
  <div
    className={cx(
      {
        error: touched && !!error
      }
    )}
  >
    <input
      {...input}
      {...rest}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

Input.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  type: string.isRequired
};

Input.defaultProps = {
  input: null,
  meta: null,
  type: 'text'
};

export default props => <Field {...props} component={Input} />;
