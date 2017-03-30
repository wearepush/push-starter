import React, {Component, PropTypes} from 'react';
import {Form} from 'elements';
import {connect} from 'react-redux';

@connect(state=>(
  {
    errors: state.formErrors
  }
  ),
  {})
export default class RadioMessage extends Component {
  static propTypes = {
    errors: PropTypes.object,
    field: PropTypes.string.isRequired,
  }

  render() {
    const {errors, field} = this.props;
    return errors && errors[field] ? <Form.Error className="form-error--alignment" message={errors[field]} /> : null;
  }
}
