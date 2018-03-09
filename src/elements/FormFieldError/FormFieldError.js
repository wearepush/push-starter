import React from 'react';
import { string } from 'prop-types';
import styles from './FormFieldError.scss';

const FormFieldError = ({
  error,
}) => (
  <div
    className={styles.FormFieldError}
  >
    {error}
  </div>
);

FormFieldError.propTypes = {
  error: string,
};

FormFieldError.defaultProps = {
  error: '',
};

export default FormFieldError;
