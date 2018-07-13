/* eslint-disable */

import React from 'react';
import { array, arrayOf, bool, shape, string, object, oneOfType, number } from 'prop-types';
import { Field } from 'redux-form';
import cx from 'classnames';
import { FormField } from '../index.js';
import styles from './FormSelect.scss';

const FormSelectComponent = ({
  custom,
  id,
  input,
  label,
  meta,
  options,
  ...rest
}) => {
  const _id = id || input.name;
  const { placeholder, multiple } = rest;
  return (
    <div className={styles.FormSelect}>
      <FormField
        meta={meta}
        label={label}
        name={_id}
      >
        {!custom ?
          <select
            id={_id}
            {...rest}
            {...input}
            className={
              cx(styles.FormSelect__input, {
                'is-active': meta.active,
                'is-invalid': meta.invalid,
              })
            }
          >
            {!multiple && placeholder &&
              <option>{placeholder}</option>
            }
            {
              options.map((c, i) => (
                <option {...c} key={i.toString()}>{c.label}</option>
              ))
            }
          </select>
          :
          <div
            className={
              cx(styles.FormSelect__list, {
                'is-active': meta.active,
                'is-invalid': meta.invalid,
              })
            }
            role="listbox"
          >
            {placeholder &&
              <div
                className={
                  cx(styles.FormSelect__item, {
                    'is-placeholder': true,
                    'is-selected': multiple ? input.value.length === 0 : !input.value,
                  })
                }
                tabIndex={multiple ? input.value.length === 0 ? '-1' : '0' : !input.value ? '-1' : '0'}
                aria-selected={multiple ? input.value.length === 0 : !input.value}
                role="option"
                onClick={() => {
                  if (multiple) {
                    input.onChange([]);
                  } else {
                    input.onChange(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) { // enter
                    if (multiple) {
                      input.onChange([]);
                    } else {
                      input.onChange(null);
                    }
                  } else if (e.keyCode === 40) { // down
                    const next = e.currentTarget.nextSibling;
                    if (next) {
                      next.focus();
                    }
                  }
                }}
              >
                {placeholder}
              </div>
            }
            {
              options.map((c, i) => {
                let selected = false;
                if (multiple) {
                  selected = input.value.find(f => f === c.value);
                } else {
                  selected = input.value === c.value;
                }
                return (
                  <div
                    className={
                      cx(styles.FormSelect__item, {
                        'is-selected': selected,
                        'is-disabled': c.disabled,
                      })
                    }
                    key={i.toString()}
                    role="option"
                    aria-disabled={c.disabled}
                    onClick={() => {
                      if (!c.disabled) {
                        if (multiple) {
                          if (!input.value.find(f => f === c.value)) {
                            input.onChange([...input.value, c.value]);
                          } else {
                            input.onChange(input.value.filter(f => f !== c.value));
                          }
                        } else {
                          input.onChange(c.value);
                        }
                      }
                    }}
                    tabIndex={selected ? '-1' : '0'}
                    aria-selected={selected}
                    onFocus={(e) => {
                      input.onFocus(e);
                    }}
                    onBlur={(e) => {
                      input.onBlur(e);
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) { // enter
                        if (!c.disabled) {
                          if (multiple) {
                            if (!input.value.find(f => f === c.value)) {
                              input.onChange([...input.value, c.value]);
                            } else {
                              input.onChange(input.value.filter(f => f !== c.value));
                            }
                          } else {
                            input.onChange(c.value);
                          }
                        }
                      } else if (e.keyCode === 40) { // down
                        const next = e.currentTarget.nextSibling;
                        if (next) {
                          next.focus();
                        }
                      } else if (e.keyCode === 38) { // up
                        const previous = e.currentTarget.previousSibling;
                        if (previous) {
                          previous.focus();
                        }
                      }
                    }}
                  >
                    {c.label}
                  </div>
                );
              })
            }
          </div>
        }
      </FormField>
    </div>
  );
};

FormSelectComponent.propTypes = {
  custom: bool,
  id: string,
  input: object.isRequired,
  label: string,
  meta: object.isRequired,
  placeholder: string,
  options: array,
};

FormSelectComponent.defaultProps = {
  custom: false,
  id: '',
  label: '',
  placeholder: '',
  options: [],
};

const FormSelect = props => (
  <Field
    {...props}
    component={FormSelectComponent}
    type={!props.multiple ? 'select' : 'select-multiple'}
  />
);

FormSelect.propTypes = {
  custom: bool,
  id: string,
  label: string,
  multiple: bool,
  name: string.isRequired,
  placeholder: string,
  options: arrayOf(
    shape({
      label: string.isRequired,
      value: oneOfType([
        number.isRequired,
        string.isRequired,
      ]),
    })
  ),
};


FormSelect.defaultProps = {
  custom: false,
  id: '',
  label: '',
  multiple: false,
  options: [],
  placeholder: '',
};

export default FormSelect;
