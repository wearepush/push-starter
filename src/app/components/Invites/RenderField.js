import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';

export default class RenderField extends PureComponent {
  static propTypes = {
    label: string,
    meta: object,
    input: object,
    type: string
  };

  static defaultProps = {
    label: '',
    meta: null,
    input: null,
    type: ''
  };

  render() {
    const { input, label, type, meta: { touched, error } } = this.props;
    return (
      <div>
        <input
          {...input}
          type={type}
          placeholder={label}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}
