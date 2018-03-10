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
}) => (
  <div className={styles.FormCheckbox}>
    <FormField
      meta={meta}
      label={label}
      name={id || input.name}
    >
      <label htmlFor={id || input.name}>
        {iconChecked && iconUnChecked ?
          <div
            className={
              cx(styles.FormCheckbox__icon, {
                'is-custom-icon': true,
                'is-checked': input.value,
                'is-unchecked': !input.value,
                'is-active': meta.active,
                'is-invalid': meta.invalid,
              })
            }
          >
            {input.value ?
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
                'is-checked': input.value,
                'is-unchecked': !input.value,
                'is-active': meta.active,
                'is-invalid': meta.invalid,
              })
            }
          />
        }
        <input
          id={id || input.name}
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
