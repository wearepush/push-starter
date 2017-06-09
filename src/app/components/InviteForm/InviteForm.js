import React, { Component } from 'react';
import { FieldArray, reduxForm} from 'redux-form/immutable';
import { func, any } from 'prop-types';
import validate from './validate';
import RenderMembers from './RenderMembers';

class FieldArraysForm extends Component {
  static propTypes = {
    handleSubmit: func,
    reset: func,
    pristine: any,
    submitting: any,
  };

  static defaultProps = {
    handleSubmit: undefined,
    reset: undefined,
    pristine: null,
    submitting: null,
  };

  onSubmit = (data) => { // eslint-disable-line
    // console.log(data);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <FieldArray name="members" component={RenderMembers} />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate
})(FieldArraysForm);
