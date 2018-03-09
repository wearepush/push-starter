import React from 'react';
import { string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import cx from 'classnames';
import { FormField } from '../index.js';

const FormTextField = ({
  id,
  input,
  label,
  meta,
  ...rest
}) => (
  <FormField
    meta={meta}
    label={label}
    name={id || input.name}
  >
    <input
      id={id || input.name}
      {...input}
      {...rest}
      className={
        cx({
          'is-active': meta.active,
          'is-invalid': !meta.invalid,
          'is-valid': meta.valid,
        })
      }
    />
  </FormField>
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
