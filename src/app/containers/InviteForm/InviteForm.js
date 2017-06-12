/*eslint-disable*/
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { fromJS } from 'immutable';
import { FieldArray, reduxForm, isValid, getFormValues, isPristine } from 'redux-form/immutable';
import { func, bool, object } from 'prop-types';
import validate from './validate';
import RenderMembers from './RenderMembers';

const mapToForm = {
  form: 'fieldArrays',
  initialValues: fromJS({
    emails: [{}, {}]
  }),
  validate
};

const mapStateToProps = (state) => { // eslint-disable-line
  return {
    valid: isValid('fieldArrays')(state),
    formValues: getFormValues('fieldArrays')(state)
  };
};

class FieldArraysForm extends PureComponent {
  static propTypes = {
    handleSubmit: func,
    change: func,
    dispatch: func,
    formValues: object,
    pristine: bool,
    submitting: bool,
    valid: bool.isRequired
  };

  static defaultProps = {
    handleSubmit: undefined,
    valid: false,
    submitting: false,
  };

  componentWillReceiveProps(nextProps) {
    const { valid, formValues, dispatch, change } = nextProps;
    console.log('????????');


    if(valid && formValues) {
      console.log('!!!!!!!!!', valid);
      formValues.set('emails', formValues.get('emails').push(fromJS({})))

      // dispatch(
      //   change('emails',
      //     formValues.get('emails').push(fromJS({}))
      //   )
      // );
    }
  }

  onSubmit = (data) => {
    console.log(data.toJS());
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <FieldArray name="emails"  component={RenderMembers} />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  () => ({})
)(reduxForm(mapToForm)(FieldArraysForm));
