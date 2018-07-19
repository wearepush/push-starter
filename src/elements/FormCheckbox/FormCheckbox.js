import React from 'react';
import { array, bool, object, node, number, oneOfType, string } from 'prop-types';
import { Field } from 'redux-form';
import { FormField, Checkbox } from '../index.js';

const FormCheckbox = ({
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
  valueProp,
}) => {
  const _id = id || input.name;
  return (
    <FormField
      label={label}
      name={_id}
    >
      <Checkbox
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
        value={valueProp}
      />
    </FormField>
  );
};

FormCheckbox.propTypes = {
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
  valueProp: oneOfType([
    array,
    bool,
    object,
    number,
    string,
  ]),
};

FormCheckbox.defaultProps = {
  custom: false,
  checkedIcon: null,
  disabled: false,
  id: '',
  inputProps: null,
  label: '',
  unCheckedIcon: null,
  valueProp: undefined,
};

export default props => <Field {...props} component={FormCheckbox} valueProp={props.value} type="checkbox" />; // eslint-disable-line
