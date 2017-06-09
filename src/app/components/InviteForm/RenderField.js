import React, { Component } from 'react';
import { any, string, object } from 'prop-types';

export default class RenderField extends Component {
  static propTypes = {
    label: string,
    meta: object,
    input: any,
    type: any,
  };

  static defaultProps = {
    label: '',
    meta: null,
    input: null,
    type: null,
  };

  render() {
    const { input, label, type, meta: {touched, error} } = this.props;
    return (
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}
