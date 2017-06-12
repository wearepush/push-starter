import React, { PureComponent } from 'react';
import { FieldArray, reduxForm} from 'redux-form/immutable';
import { func, bool } from 'prop-types';
import validate from './validate';
import RenderMembers from './RenderMembers';

const mapToForm = {
  form: 'fieldArrays',
  validate
};

class FieldArraysForm extends PureComponent {
  static propTypes = {
    handleSubmit: func,
    submitting: bool,
  };

  static defaultProps = {
    handleSubmit: undefined,
    submitting: false,
  };

  onSubmit = (data) => {
    console.log(data.toJS());
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <FieldArray name="emails" component={RenderMembers} />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm(mapToForm)(FieldArraysForm);
