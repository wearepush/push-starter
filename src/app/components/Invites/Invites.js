import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { FieldArray, reduxForm, isValid, getFormValues } from 'redux-form/immutable';
import { func, bool, object } from 'prop-types';
import { Form, Container, Message } from 'semantic-ui-react';

import { Button, Input } from './../../elements';
import validate from './validate';
import s from './Invite.scss';

const formName = 'fieldArrays';

const mapToForm = {
  form: formName,
  initialValues: fromJS({
    emails: [{}, {}, {}]
  }),
  validate
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  formValues: getFormValues(formName)(state),
  valid: isValid(formName)(state)
});

class Invites extends PureComponent {
  static propTypes = {
    change: func.isRequired,
    handleSubmit: func,
    formValues: object,
    emailValues: object,
    submitting: bool.isRequired,
  };

  static defaultProps = {
    handleSubmit: undefined,
    formValues: {},
    emailValues: {},
  };

  constructor() {
    super();
    this.state = {
      formSent: false
    };

    this.handleAddMember = ::this.handleAddMember;
  }

  onSubmit = (data) => {
    console.log(data.toJS());
  }

  getValidEmailLength(field = 'email') {
    const { formValues } = this.props;
    const emails = formValues.get('emails').toJS();
    const emailsLength = emails.length;
    let i;
    let num = 0;

    for (i = 0; i < emailsLength; i += 1) {
      const email = emails[i][field];
      if (email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) num += 1;
    }

    return num;
  }

  handleAddMember() {
    const { change, formValues } = this.props;
    const emails = formValues.get('emails');

    change('emails',
      emails.push(fromJS({}))
    );
  }

  rednderMembers = ({ fields, meta: { error, submitFailed } }) => { // eslint-disable-line
    return (
      <div>
        {submitFailed && error && <span>{error}</span>}
        {fields.map((member, index) => (
          <Form.Field key={index.toString()} className={s.invites__field}>
            <Input
              name={`${member}.email`}
              placeholder="Email"
              type="email"
            />
            <Button
              type="button"
              title="Remove Member"
              color="red"
              onClick={() => fields.remove(index)}
              basic
            >
              x
            </Button>
          </Form.Field>
        ))}
      </div>
    );
  }

  renderMembersTips() {
    const validEmails = this.getValidEmailLength();

    return (
      <Message
        {...(validEmails < 3 ? { warning: true } : { success: true })}
        visible
        header={`You chose ${validEmails} ` + (validEmails !== 1 ? 'friends' : 'friend')}
        content={
          !validEmails
            ? 'Enter your friend email'
            : validEmails < 3
              ? 'Enter more for the best chances'
              : ''
        }
      />
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Container text>
        <div className={s.invites__ttl}>Enter email address to send free deliveries to your friends</div>
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
            {this.renderMembersTips()}
          </Form.Field>
          <Form.Field>
            <Button
              type="button"
              disabled={submitting}
              style={{ width: '100%' }}
              onClick={this.handleAddMember}
            >
              Add friend
            </Button>
          </Form.Field>
          <Form.Field>
            <Button
              type="submit"
              color="green"
              style={{ width: '100%' }}
              disabled={submitting}
            >
              Send
            </Button>
          </Form.Field>
        </Form>
      </Container>
    );
  }
}

export default reduxForm(mapToForm)(
  connect(mapStateToProps, mapDispatchToProps)(Invites)
);
