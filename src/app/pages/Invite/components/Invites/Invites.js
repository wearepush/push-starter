import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { FieldArray, reduxForm, isValid, getFormValues } from 'redux-form/immutable';
import { func, bool, object } from 'prop-types';
import { Button, Input } from 'elements';
import { Form } from 'semantic-ui-react';
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
          <Form.Field key={index}>
            <Input
              name={`${member}.email`}
              placeholder="Email"
              type="email"
            />
            <Button
              type="button"
              title="Remove Member"
              onClick={() => fields.remove(index)}
            >
              x
            </Button>
          </Form.Field>
        ))}
        {error && <span>{error}</span>}
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <FieldArray
          name="emails"
          component={this.rednderMembers}
        />
        <Form.Field>
          Choose 3 or more friends for the best chance at getting free groceries
        </Form.Field>
        <Form.Field>
          <Button
            type="submit"
            disabled={submitting}
          >
            Send
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(mapToForm)(Invites)
);
