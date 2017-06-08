import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { func } from 'prop-types';
import { Form } from '../../elements';

class SignIn extends PureComponent {
  static propTypes = {
    handleSubmit: func,
  }

  static defaultProps = {
    handleSubmit: undefined,
  };

  onSubmit = (date) => {
    console.log(date);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h1>Sign In</h1>
        <Form.Input
          name="username"
          type="text"
          placeholder="User name"
        />
        <Form.Button type="submit">sign in</Form.Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'SignInForm'
})(SignIn);
