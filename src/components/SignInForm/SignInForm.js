import React, { PureComponent } from 'react';
import { reduxForm, SubmissionError, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { FormTextField, Button } from 'push-ui';
import validate from './validate';
import './sign_in_form.scss';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mapStateToProps = (state) => ({}); // eslint-disable-line

const mapToProps = {};

const mapToForm = {
  form: 'SignInForm',
  validate,
};

class SignInForm extends PureComponent {
  onSubmit = (values) => {
    // eslint-disable-line
    console.log(values);
    return sleep(100).then(() => {
      if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        throw new SubmissionError({
          username: 'User does not exist',
          _error: 'Login failed!',
        });
      } else if (values.password !== 'qwerty') {
        throw new SubmissionError({
          password: 'Wrong password',
          _error: 'Login failed!',
        });
      } else {
        console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      }
    });
  };

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <div className="sign-in-form">
        <div className="sign-in-form__container">
          <div className="sign-in-form__header">
            <h1 className="sign-in-form__ttl">Login into your account</h1>
          </div>
          <Form onSubmit={handleSubmit(this.onSubmit)} className="sign-in-form__form">
            <div className="sign-in-form__form-item">
              <FormTextField name="email" type="email" placeholder="Your Email" size="md" />
            </div>
            <div className="sign-in-form__form-item">
              <FormTextField name="password" type="password" placeholder="Type your password" size="md" />
            </div>
            {error && <div>{error}</div>}
            <div className="sign-in-form__footer">
              <div className="sign-in-form__btn-login">
                <Button type="submit" float>
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  handleSubmit: func,
  error: string,
};

SignInForm.defaultProps = {
  handleSubmit: undefined,
  error: '',
};

export default connect(mapStateToProps, mapToProps)(reduxForm(mapToForm)(SignInForm));
