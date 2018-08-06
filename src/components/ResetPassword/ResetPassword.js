import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { reduxForm, SubmissionError, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { FormTextField, Button, Checkbox } from 'redux-starter-ui';

// import validate from './ResetPasswordValidation';
import styles from './ResetPassword.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'ResetPasswordForm',
  // validate
};

class ResetPassword extends PureComponent {
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
      <div className={styles.ResetPassword}>
        <div className={styles.ResetPassword__container}>
          <Form
            onSubmit={handleSubmit(this.onSubmit)}
            className={styles.ResetPassword__form}
          >
            <div className={styles.ResetPassword__form_item}>
              <FormTextField
                name="password"
                type="password"
                placeholder="Type your password"
                label="Password"
              />
            </div>
            <div className={styles.ResetPassword__form_item}>
              <FormTextField
                name="password"
                type="password"
                placeholder="Confirm password"
                label="Confirm Your password"
              />
            </div>
            <div className={styles.ResetPassword__form_item}>
              <Checkbox
                name="checkbox-2"
                placeholder="Please accept the terms and conditions to proceed with your request."
                custom
              />
            </div>
            {error && (
              <div>
                {error}
              </div>
            )}
            <div className={styles.ResetPassword__footer}>
              <div className={styles.ResetPassword__btn_submit}>
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
  reduxForm(mapToForm)(ResetPassword)
);
