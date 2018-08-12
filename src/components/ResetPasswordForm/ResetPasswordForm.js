import React, { PureComponent } from 'react';
import { reduxForm, Form } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { FormTextField, Button } from 'redux-starter-ui';

import validate from './validate';
import styles from './ResetPasswordForm.scss';

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'ResetPasswordForm',
  validate
};

class ResetPasswordForm extends PureComponent {
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
      <div className={styles.ResetPasswordForm}>
        <div className={styles.ResetPasswordForm__container}>
          <Form
            onSubmit={handleSubmit(this.onSubmit)}
            className={styles.ResetPasswordForm__form}
          >
            <div className={styles.ResetPasswordForm__form_item}>
              <FormTextField
                name="password"
                type="password"
                placeholder="Type your password"
                label="Password"
              />
            </div>
            <div className={styles.ResetPasswordForm__form_item}>
              <FormTextField
                name="repeat_password"
                type="password"
                placeholder="Confirm password"
                label="Confirm your password"
              />
            </div>
            {error && (
              <div>
                {error}
              </div>
            )}
            <div className={styles.ResetPasswordForm__footer}>
              <div className={styles.ResetPasswordForm__btn_submit}>
                <Button
                  color="success"
                  type="submit"
                  float
                >
                  {'Reset password'}
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
  reduxForm(mapToForm)(ResetPasswordForm)
);
