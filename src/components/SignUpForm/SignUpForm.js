import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { reduxForm, SubmissionError, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { FormTextField, Button, Checkbox } from 'redux-starter-ui';

// import validate from './SignUpFormValidation';
import styles from './SignUpForm.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'SignUpFormForm',
  // validate
};

class SignUpForm extends PureComponent {
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
      <div className={styles.SignUpForm}>
        <div className={styles.SignUpForm__container}>
          <Form
            onSubmit={handleSubmit(this.onSubmit)}
            className={styles.SignUpForm__form}
          >
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="text"
                type="text"
                placeholder="Full Name"
                label="Full Name"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="text"
                type="text"
                placeholder="Address"
                label="Enter Full Address"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="email"
                type="email"
                placeholder="Your Email"
                label="Enter Your Email"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="password_1"
                type="password"
                placeholder="Type your password"
                label="Password"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="password_2"
                type="password"
                placeholder="Confirm password"
                label="Confirm Your password"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <Checkbox
                name="checkbox-1"
                placeholder="Please accept the terms and conditions to proceed with your request."
                custom
              />
            </div>
            {error && (
              <div>
                {error}
              </div>
            )}
            <div className={styles.SignUpForm__footer}>
              <div className={styles.SignUpForm__btn_submit}>
                <Button
                  color="success"
                  type="submit"
                  float
                >
                  Submit
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
  reduxForm(mapToForm)(SignUpForm)
);
