import React from 'react';
import { bool, object, string } from 'prop-types';
import { Field } from 'redux-form';
import { FormField, TextArea } from '../index.js';

const FormTextArea = ({
  disabled,
  id,
  input,
  label,
  meta,
  placeholder,
}) => {
  const _id = id || input.name;
  return (
    <FormField
      meta={meta}
      label={label}
      name={_id}
    >
      <TextArea
        active={meta.active}
        disabled={disabled}
        id={id}
        invalid={meta.invalid}
        onBlur={(event) => input.onBlur(event)}
        onChange={(event, value) => input.onChange(value)}
        onFocus={(event, value) => input.onFocus(value)}
        name={input.name}
        placeholder={placeholder}
        value={input.value}
      />
    </FormField>
  );
};

FormTextArea.propTypes = {
  disabled: bool,
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  placeholder: string,
};

FormTextArea.defaultProps = {
  disabled: false,
  id: '',
  label: '',
  placeholder: '',
};

export default props => <Field {...props} component={FormTextArea} type="textarea" />;
