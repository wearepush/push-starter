import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { FieldArray, reduxForm, isValid, getFormValues } from 'redux-form/immutable';
import { func, bool, object } from 'prop-types';
import { Button, Input } from 'elements';
import validate from './validate';

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

  rednderMembers = ({ fields, meta: { error, submitFailed } }) => { // eslint-disable-line
    return (
      <div>
        {submitFailed && error && <span>{error}</span>}
        {fields.map((member, index) => (
          <div key={index}>
            <div>
              <Input
                name={`${member}.email`}
                placeholder="Email"
                type="email"
              />
            </div>
            <Button
              type="button"
              title="Remove Member"
              onClick={() => fields.remove(index)}
            >
              x
            </Button>
          </div>
        ))}
        {error && <span className="error">{error}</span>}
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <FieldArray
          name="emails"
          component={this.rednderMembers}
        />
        <div>
          <Button
            type="submit"
            disabled={submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(mapToForm)(Invites)
);
