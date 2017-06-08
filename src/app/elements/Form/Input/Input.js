import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';

class Input extends PureComponent {
  static propTypes = {
    // name: string,
    type: string,
    input: object,
    meta: object,
  }

  static defaultProps = {
    // name: '',
    type: 'text',
    input: null,
    meta: null,
  }

  render() {
    const { type, input, meta: {touched, error}, ...rest } = this.props; // eslint-disable-line
    return (
      <div>
        <input
          {...rest}
          {...input}
        />
      </div>
    );
  }
}

export default props=> <Field {...props} component={Input} />; // eslint-disable-line
