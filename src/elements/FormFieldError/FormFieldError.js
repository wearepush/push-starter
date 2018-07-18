import React from 'react';
import { oneOf, string } from 'prop-types';
import cx from 'classnames';
import styles from './FormFieldError.scss';

const FormFieldError = ({
  text,
  type,
}) => (
  <div
    className={
      cx(styles.FormFieldError, {
        [`is-${type}`]: !!type,
      })
    }
  >
    {text}
  </div>
);

FormFieldError.propTypes = {
  text: string,
  type: oneOf([
    'error',
    'warning',
  ]),
};

FormFieldError.defaultProps = {
  text: '',
  type: 'error',
};

export default FormFieldError;
