import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import {} from './Checkbox.scss';
import { Field } from 'redux-form';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    classNameInput: PropTypes.string,
    label: PropTypes.string,
    meta: PropTypes.object,
    input: PropTypes.object
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, classNameInput, input, input: { name }, meta: { error, touched }, label, ...rest } = this.props;
    return (
      <Form.Group>
        <div className={`checkbox ${className}` + (error && touched ? 'has-error ' : '')}>
          <label>
            <input
              {...rest}
              {...input}
              className={'form-checkbox ' + (classNameInput ? `${classNameInput} ` : '') + (error && touched ? 'is-error ' : '')}
              type="checkbox"
              id={'form-checkbox-' + name}
            />
            {label}
          </label>
          <Form.Error message={error && touched ? error : ''} />
        </div>
      </Form.Group>
    );
  }
}

export default props => <Field {...props} component={Checkbox} />;
