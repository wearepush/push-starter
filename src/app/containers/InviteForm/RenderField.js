/*eslint-disable*/
import React, { PureComponent } from 'react';
import { FieldArray, reduxForm, isInvalid } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { string, object, func } from 'prop-types';

export default class RenderField extends PureComponent {
  static propTypes = {
    label: string,
    meta: object,
    input: object,
    type: string,
    onClick: func
  };

  static defaultProps = {
    label: '',
    meta: null,
    input: null,
    type: ''
  };

  render() {
    const { input, label, type, meta: {touched, error}, onClick, values } = this.props;
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
