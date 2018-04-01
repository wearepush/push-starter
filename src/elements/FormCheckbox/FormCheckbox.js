import React from 'react';
import { bool, node, string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import { FormField, Checkbox } from '../index.js';

const FormCheckbox = ({
  custom,
  checkedIcon,
  disabled,
  id,
  input,
  label,
  meta,
  placeholder,
  unCheckedIcon,
}) => {
  const _id = id || input.name;
  return (
    <FormField
      meta={meta}
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
        invalid={meta.invalid}
        onBlur={(event, value) => input.onBlur(value)}
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

FormCheckbox.propTypes = {
  custom: bool,
  checkedIcon: node,
  disabled: bool,
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  placeholder: string.isRequired,
  unCheckedIcon: node,
};

FormCheckbox.defaultProps = {
  custom: false,
  checkedIcon: null,
  disabled: false,
  id: '',
  label: '',
  unCheckedIcon: null,
};

export default props => <Field {...props} component={FormCheckbox} type="checkbox" />;
