import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { FieldArray, reduxForm, isValid, getFormValues } from 'redux-form/immutable';
import { func, bool, object } from 'prop-types';
import validate from './validate';
import Members from './Members';

const formName = 'fieldArrays';

const mapToForm = {
  form: formName,
  initialValues: fromJS({
    emails: [{}, {}, {}]
  }),
  validate
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  formValues: getFormValues(formName)(state),
  valid: isValid(formName)(state)
});

class Invites extends PureComponent {
  static propTypes = {
    change: func.isRequired,
    dispatch: func.isRequired,
    handleSubmit: func,
    formValues: object,
    submitting: bool.isRequired,
    valid: bool.isRequired
  };

  static defaultProps = {
    handleSubmit: undefined,
    formValues: null
  };

  componentWillReceiveProps(nextProps) {
    const { valid, dispatch, change } = nextProps;
    const { formValues } = this.props;

    if (valid && formValues) {
      dispatch(
        change('emails',
          formValues.get('emails')
          .push(fromJS({}))
        )
      );
    }
  }

  onSubmit = (data) => {
    console.log(data.toJS());
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <FieldArray
          name="emails"
          component={Members}
        />
        <div>
          <button
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(mapToForm)(Invites)
);
