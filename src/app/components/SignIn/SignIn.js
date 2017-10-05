import React, { PureComponent } from 'react';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import { Form, Container } from 'semantic-ui-react';

import { Input, Button } from './../../elements';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const mapStateToProps = state => ({}); // eslint-disable-line

const mapToProps = {
};

const mapToForm = {
  form: 'SignInForm',
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
      <Container text>
        <Form
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Form.Field>
            <Input
              name="username"
              type="text"
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field>
            <Input
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Field>
          {error && <div>{error}</div>}
          <Form.Field>
            <Button
              type="submit"
            >
              Sign In!
            </Button>
          </Form.Field>
        </Form>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapToProps)(
  reduxForm(mapToForm)(SignIn)
);
