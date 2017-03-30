import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import {} from './Textarea.scss';
import { Field } from 'redux-form';

class Textarea extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    classNameTextarea: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    row: PropTypes.number,
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
    const { autoComplete, className, label, maxLength, input, input: { name }, meta: { error, touched }, row, ...rest } = this.props;
    return (
      <Form.Group>
        <div className={'textarea ' + className + (error && touched ? 'has-error ' : '')}>
          {label && <label htmlFor={'form-input-' + name}>{label}</label>}
          <div className="textarea__wrapper">
            <textarea
              {...rest}
              {...input}
              className="form-control"
              autoComplete={autoComplete}
              name={name}
              rows={row || 1}
              maxLength={maxLength}
              placeholder={label}
            />
            <Form.Error message={error && touched ? error : ''} />
          </div>
        </div>
      </Form.Group>
    );
  }
}
export default props => <Field {...props} component={Textarea} />;
