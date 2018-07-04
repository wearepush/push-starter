/* eslint-disable */

import React from 'react';
import { bool, object, oneOf, string } from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormField, TextField } from '../index.js';

const FormTextField = ({
  disabled,
  id,
  input,
  label,
  meta,
  placeholder,
  type,
}) => {
  const _id = id || input.name;
  return (
    <FormField
      meta={meta}
      label={label}
      name={_id}
    >
      <TextField
        active={meta.active}
        disabled={disabled}
        id={id}
        invalid={meta.invalid}
        onBlur={(event) => input.onBlur(event)}
        onChange={(event, value) => input.onChange(value)}
        onFocus={(event, value) => input.onFocus(value)}
        name={input.name}
        placeholder={placeholder}
        type={type}
        value={input.value}
      />
    </FormField>
  );
};

FormTextField.propTypes = {
  disabled: bool,
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  placeholder: string,
  type: oneOf([
    'date',
    'email',
    'number',
    'password',
    'text',
  ]),
};

FormTextField.defaultProps = {
  disabled: false,
  id: '',
  label: '',
  placeholder: '',
  type: 'text',
};

export default props => <Field {...props} component={FormTextField} />;
