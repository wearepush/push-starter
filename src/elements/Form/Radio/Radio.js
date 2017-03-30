import React, { Component, PropTypes } from 'react';
import {} from './Radio.scss';
import { Field } from 'redux-form';

const radioRender = (field, children) => {
  const { className, disabled, onCustomChange, label } = field;

  return (
    <label className={(className ? `radio ${className}` : 'radio') + (field.input.checked ? ' active' : '')}>
      <input
        {...field.input}
        disabled={disabled}
        onChange={() => {
          if (onCustomChange) {
            onCustomChange(field.input, field.input.value);
          } else {
            field.input.onChange(field.input.value);
          }
        }}
        type="radio"
        name={field.input.name}
        style={{ display: children ? 'none' : 'inline-block' }}
      />
      {children && children}
      <span>{label}</span>
    </label>
  );
};


export default class Radio extends Component {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    value: PropTypes.string,
    field: PropTypes.object,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    checked: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { children, name, disabled, onChange, ...rest } = this.props;

    return (
      <Field
        type="radio"
        disabled={disabled}
        key={name}
        name={name}
        onCustomChange={onChange}
        {...rest}
        component={field => radioRender(field, children)}
      />
    );
  }
}

