import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, SubmissionError, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { FormTextField, Button } from '../../elements';
import validate from './SignInValidation';
import styles from './SignIn.scss';

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
      <div className={styles.SignIn}>
        <div className={styles.SignIn__container}>
          <div className={styles.SignIn__header}>
            <h1 className={styles.SignIn__ttl}>Login into your account</h1>
            <span className={styles.SignIn__account_text}>Don’t have an account?</span>
            <Link
              to="/signup"
              className={styles.SignIn__link}
            >
              Create new
            </Link>
          </div>
          <Form
            onSubmit={handleSubmit(this.onSubmit)}
            className={styles.SignIn__form}
          >
            <div className={styles.SignIn__form_item}>
              <FormTextField
                name="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className={styles.SignIn__form_item}>
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
            <div className={styles.SignIn__footer}>
              <Link
                to="/signup"
                className={styles.SignIn__link}
              >
                Forget Password?
              </Link>
              <div className={styles.SignIn__btn_login}>
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
  reduxForm(mapToForm)(SignIn)
);
