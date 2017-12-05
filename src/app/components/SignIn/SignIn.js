import React, { PureComponent } from 'react';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { Input, Button } from './../../elements';
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
        <form
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <div>
            <Input
              name="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {error && <div>{error}</div>}
          <div>
            <Button
              type="submit"
            >
              Sign In!!
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapToProps)(
  reduxForm(mapToForm)(SignIn)
);
