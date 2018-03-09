import React from 'react';
import { bool, string } from 'prop-types';
import cx from 'classnames';
import styles from './FormFieldLabel.scss';

const FormFieldLabel = ({
  active,
  invalid,
  htmlFor,
  label,
}) => (
  <label
    className={
      cx(styles.FormFieldLabel, {
        'is-active': active,
        'is-invalid': invalid,
      })
    }
    htmlFor={htmlFor}
  >
    {label}
  </label>
);

FormFieldLabel.propTypes = {
  active: bool,
  invalid: bool,
  htmlFor: string.isRequired,
  label: string.isRequired,
};

FormFieldLabel.defaultProps = {
  active: false,
  invalid: false,
};

export default FormFieldLabel;
