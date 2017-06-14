import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Input as InputUI } from 'semantic-ui-react';

class Input extends PureComponent {
  static propTypes = {
    type: string,
    input: object,
    meta: object
  };

  static defaultProps = {
    type: 'text',
    input: null,
    meta: null
  };

  render() {
    const { type, input, meta: { touched, error }, ...rest } = this.props;
    return (
      <div>
        <InputUI
          error={touched && !!error}
          {...input}
          {...rest}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}

export default props => <Field {...props} component={Input} />;
