import React from 'react';
import { bool, object, node, string } from 'prop-types';
import { Field } from 'redux-form';
import { FormField, Radio } from '../index.js';

const FormRadio = ({
  custom,
  checkedIcon,
  disabled,
  id,
  input,
  inputProps,
  label,
  meta,
  placeholder,
  unCheckedIcon,
}) => {
  const _id = id || `${input.name}-${JSON.stringify(input.value)}`; // replace to hash
  return (
    <FormField
      label={label}
      name={_id}
    >
      <Radio
        active={meta.active}
        checked={input.checked}
        custom={custom}
        checkedIcon={checkedIcon}
        disabled={disabled}
        id={id}
        inputProps={inputProps}
        invalid={meta.touched && meta.invalid}
        onBlur={(event) => input.onBlur(event)}
        onChange={(event, value) => input.onChange(value)}
        onFocus={(event, value) => input.onFocus(value)}
        name={input.name}
        placeholder={placeholder}
        unCheckedIcon={unCheckedIcon}
        value={input.value}
      />
    </FormField>
  );
};

FormRadio.propTypes = {
  checkedIcon: node,
  custom: bool,
  disabled: bool,
  id: string,
  input: object.isRequired,
  inputProps: object,
  label: string,
  meta: object.isRequired,
  placeholder: string.isRequired,
  unCheckedIcon: node,
};

FormRadio.defaultProps = {
  custom: false,
  checkedIcon: null,
  disabled: false,
  id: '',
  inputProps: null,
  label: '',
  unCheckedIcon: null,
};

export default props => <Field {...props} component={FormRadio} type="radio" />;
