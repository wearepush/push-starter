import React, { PureComponent } from 'react';
import { reduxForm, SubmissionError, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { FormTextField, Button } from 'redux-starter-ui';

import validate from './validate';
import styles from './SignInForm.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'SignInForm',
  validate
};

class SignInForm extends PureComponent {
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
      <div className={styles.SignInForm}>
        <div className={styles.SignInForm__container}>
          <div className={styles.SignInForm__header}>
            <h1 className={styles.SignInForm__ttl}>Login into your account</h1>
          </div>
          <Form
            onSubmit={handleSubmit(this.onSubmit)}
            className={styles.SignInForm__form}
          >
            <div className={styles.SignInForm__form_item}>
              <FormTextField
                name="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className={styles.SignInForm__form_item}>
              <FormTextField
                name="password"
                type="password"
                placeholder="Type your password"
              />
            </div>
            {error && (
              <div>
                {error}
              </div>
            )}
            <div className={styles.SignInForm__footer}>
              <div className={styles.SignInForm__btn_login}>
                <Button
                  type="submit"
                  float
                >
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

export default connect(mapStateToProps, mapToProps)(
  reduxForm(mapToForm)(SignInForm)
);
