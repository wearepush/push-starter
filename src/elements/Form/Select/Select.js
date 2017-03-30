import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import {} from './Select.scss';
import { Field } from 'redux-form';

class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    classNameInput: PropTypes.string,
    defaultLabel: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    meta: PropTypes.object,
    input: PropTypes.object,
    list: PropTypes.array
  }

  static defaultProps = {
    className: '',
    multiple: false
  }

  constructor(props) {
    super(props);
  }

  findDefault() {
    const { list } = this.props;
    let result = false;
    if (list.length > 0) {
      list.forEach((item) => {
        if (item.defaultValue) {
          result = true;
        }
        return false;
      });
    }
    return result;
  }

  render() {
    const { className, classNameInput, defaultLabel, label, multiple, input, input: { name }, meta: { touched, error }, list, ...rest } = this.props;
    return (
      <Form.Group>
        <div className={`${className} ` + (error && touched ? 'has-error ' : '')}>
          <label htmlFor={'form-select-' + name}>{label}</label>
          {list.length > 0 &&
          <select
            {...rest}
            {...input}
            className={'form-control ' + (classNameInput || '') + (error && touched ? ' is-error ' : '')}
            id={'form-select-' + name}
            multiple={multiple}
          >
            {!this.findDefault() && defaultLabel && !multiple &&
              <option value={''}>{defaultLabel}</option>
            }
            {list.map((item, i) => {
              if (!item.disabled) {
                return (
                  <option key={i} value={item.value}>{item.label}</option>
                );
              }
              return (
                <option key={i} value={item.value} disabled>{item.label}</option>
              );
            })}
          </select>}
          <Form.Error message={error && touched ? error : ''} />
        </div>
      </Form.Group>
    );
  }
}
export default props => <Field {...props} component={Select} />;
