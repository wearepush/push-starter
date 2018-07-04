/* eslint-disable */

import React from 'react';
import { bool, node, shape, string } from 'prop-types';
import { FormFieldLabel, FormFieldError } from '../index.js';
import styles from './FormField.scss';

const FormField = ({
  meta,
  children,
  label,
  name,
}) => (
  <div
    className={styles.FormField}
  >
    {label &&
      <div className={styles.FormField__label}>
        <FormFieldLabel
          active={meta.active}
          invalid={meta.invalid}
          htmlFor={name}
          label={label}
        />
      </div>
    }
    <div className={styles.FormField__children}>
      {children}
    </div>
    {meta.touched && (meta.error || meta.warning) &&
      <div className={styles.FormField__error}>
        <FormFieldError
          error={meta.error || meta.warning}
        />
      </div>
    }
  </div>
);

FormField.propTypes = {
  meta: shape({
    active: bool,
    error: string,
    invalid: bool,
    touched: bool,
    warning: string,
  }),
  children: node.isRequired,
  label: string,
  name: string,
};

FormField.defaultProps = {
  meta: {
    active: false,
    error: '',
    invalid: false,
    touched: false,
    warning: '',
  },
  label: '',
  name: '',
};

export default FormField;
