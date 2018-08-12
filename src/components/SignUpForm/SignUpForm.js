import React, { PureComponent } from 'react';
import { reduxForm, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { FormTextField, Button, FormCheckbox } from 'redux-starter-ui';

import validate from './validate';
import styles from './SignUpForm.scss';

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'SignUpFormForm',
  validate
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
                name="name"
                type="text"
                placeholder="Full name"
                label="Full Name"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="email"
                type="email"
                placeholder="Your email"
                label="Enter your Email"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="password"
                type="password"
                placeholder="Type your password"
                label="Password"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormTextField
                name="repeat_password"
                type="password"
                placeholder="Confirm password"
                label="Confirm your password"
              />
            </div>
            <div className={styles.SignUpForm__form_item}>
              <FormCheckbox
                name="agree"
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
                  {'Sign Up'}
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
