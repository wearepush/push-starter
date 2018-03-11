import React from 'react';
import { node, string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import cx from 'classnames';
import { FormField } from '../index.js';
import styles from './FormRadio.scss';

const FormRadio = ({
  iconChecked,
  iconUnChecked,
  id,
  input,
  label,
  meta,
  placeholder,
  ...rest
}) => {
  const _id = id || `${input.name}-${input.value}`;
  return (
    <div className={styles.FormRadio}>
      <FormField
        meta={meta}
        label={label}
        name={_id}
      >
        <label htmlFor={_id}>
          {iconChecked && iconUnChecked ?
            <div
              className={
                cx(styles.FormRadio__icon, {
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
                cx(styles.FormRadio__icon, {
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
            data-checked={input.checked.toString()}
            className={styles.FormRadio__input}
            type="radio"
          />
          <span className={styles.FormRadio__placeholder}>
            {placeholder}
          </span>
        </label>
      </FormField>
    </div>
  );
};

FormRadio.propTypes = {
  iconChecked: node,
  iconUnChecked: node,
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  placeholder: string.isRequired,
};

FormRadio.defaultProps = {
  iconChecked: null,
  iconUnChecked: null,
  id: '',
  label: '',
};

export default props => <Field {...props} component={FormRadio} type="radio" />;
