import React from 'react';
import { string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import cx from 'classnames';
import { FormField } from '../index.js';
import styles from './FormTextField.scss';

const FormTextField = ({
  id,
  input,
  label,
  meta,
  ...rest
}) => (
  <div className={styles.FormTextField}>
    <FormField
      meta={meta}
      label={label}
      name={id || input.name}
    >
      <input
        id={id || input.name}
        {...rest}
        {...input}
        className={
          cx(styles.FormTextField__input, {
            'is-active': meta.active,
            'is-invalid': meta.invalid,
          })
        }
      />
    </FormField>
  </div>
);

FormTextField.propTypes = {
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  type: string,
};

FormTextField.defaultProps = {
  id: '',
  label: '',
  type: 'text',
};

export default props => <Field {...props} component={FormTextField} />;
