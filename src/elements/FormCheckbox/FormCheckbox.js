import React from 'react';
import { node, string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import cx from 'classnames';
import { FormField } from '../index.js';
import styles from './FormCheckbox.scss';

const FormCheckbox = ({
  iconChecked,
  iconUnChecked,
  id,
  input,
  label,
  meta,
  placeholder,
  ...rest
}) => {
  const _id = id || input.name;
  return (
    <div className={styles.FormCheckbox}>
      <FormField
        meta={meta}
        label={label}
        name={_id}
      >
        <label htmlFor={_id}>
          {iconChecked && iconUnChecked ?
            <div
              className={
                cx(styles.FormCheckbox__icon, {
                  'is-custom-icon': true,
                  'is-checked': input.checked,
                  'is-unchecked': !input.checked,
                  'is-active': meta.active,
                  'is-invalid': meta.invalid,
                })
              }
            >
              {input.checked ?
                iconChecked
                :
                iconUnChecked
              }
            </div>
            :
            <div
              className={
                cx(styles.FormCheckbox__icon, {
                  'is-default-icon': true,
                  'is-checked': input.checked,
                  'is-unchecked': !input.checked,
                  'is-active': meta.active,
                  'is-invalid': meta.invalid,
                })
              }
            />
          }
          <input
            id={_id}
            {...rest}
            {...input}
            className={styles.FormCheckbox__input}
            type="checkbox"
          />
          <span className={styles.FormCheckbox__placeholder}>
            {placeholder}
          </span>
        </label>
      </FormField>
    </div>
  );
};

FormCheckbox.propTypes = {
  iconChecked: node,
  iconUnChecked: node,
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  placeholder: string.isRequired,
};

FormCheckbox.defaultProps = {
  iconChecked: null,
  iconUnChecked: null,
  id: '',
  label: '',
};

export default props => <Field {...props} component={FormCheckbox} type="checkbox" />;