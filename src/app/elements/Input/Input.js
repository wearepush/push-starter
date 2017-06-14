import React, { PureComponent } from 'react';
import { string, object, func } from 'prop-types';
import { Field } from 'redux-form/immutable';

class Input extends PureComponent {
  static propTypes = {
    type: string,
    input: object,
    meta: object,
    onClick: func
  };

  static defaultProps = {
    type: 'text',
    input: null,
    meta: null,
    onClick: undefined
  };

  render() {
    const { type, input, meta: { touched, error }, ...rest } = this.props; // eslint-disable-line
    return (
      <div>
        <input
          {...rest}
          {...input}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}

export default props => <Field {...props} component={Input} />;
