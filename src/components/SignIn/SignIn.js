import React, { PureComponent } from 'react';
import { reduxForm, SubmissionError, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { FormTextField, FormTextArea, FormCheckbox, FormRadio, FormSelect, Button, FormButton } from '../../elements';
import validate from './SignInValidation';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'SignInForm',
  validate
};

class SignIn extends PureComponent {
  static propTypes = {
    handleSubmit: func,
    error: string
  };

  static defaultProps = {
    handleSubmit: undefined,
    error: ''
  };

  onSubmit = (values) => { // eslint-disable-line
    console.log(values);
    return sleep(100).then(() => {
      if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        throw new SubmissionError({
          username: 'User does not exist',
          _error: 'Login failed!'
        });
      } else if (values.password !== 'qwerty') {
        throw new SubmissionError({
          password: 'Wrong password',
          _error: 'Login failed!'
        });
      } else {
        console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      }
    });
  }

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <div>
        <Form
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <div>
            <FormTextField
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <FormTextField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <FormTextArea
              label="Description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <FormCheckbox
              custom
              name="remember"
              placeholder="Remember me"
            />
          </div>
          <div>
            <FormRadio
              custom
              name="gender"
              value="1"
              placeholder="Women"
            />
            <FormRadio
              custom
              name="gender"
              value="2"
              placeholder="Men"
            />
          </div>
          <div>
            <FormSelect
              label="Age"
              name="age"
              placeholder="Select Age"
              options={[
                { label: '< 18', value: '18' },
                { label: '18-25', value: '18-25', disabled: true },
                { label: '25+', value: '25' },
              ]}
            />
          </div>
          {error && (
            <div>
              {error}
            </div>
          )}
          <div>
            <Button
              type="submit"
            >
              Sign In!
            </Button>
          </div>
        </Form>
        <br />
        <FormButton
          form="SignInForm"
          className="test-2"
        >
          Sign In Remote Button!
        </FormButton>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapToProps)(
  reduxForm(mapToForm)(SignIn)
);
