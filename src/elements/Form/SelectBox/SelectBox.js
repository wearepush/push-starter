import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import SimpleSelect from 'react-select';
import { Field } from 'redux-form';

class SelectBox extends Component {
  static propTypes = {
    // className: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    clearable: PropTypes.bool,
    meta: PropTypes.object,
    input: PropTypes.object,
    list: PropTypes.array
  };

  static defaultProps = {
    // className: '',
    label: '',
    multiple: false,
    searchable: false,
    clearable: false,
  };

  render() {
    const { help, multiple, label, searchable, placeholder, clearable, input, input: { name }, meta: { touched, error }, list, ...rest } = this.props;
    return (
      <Form.Group>
        {label && <div className="Select-label">{label}</div>}
        <SimpleSelect
          {...rest}
          {...input}
          name={name}
          multi={multiple}
          options={list}
          value={input.value}
          onChange={val => val && input.onChange(val && val.value)}
          clearable={clearable}
          searchable={searchable}
          placeholder={placeholder}
        />
        {help && <p className="help-block">{help}</p>}
        <Form.Error message={error && touched ? error : ''} />
      </Form.Group>
    );
  }
}

export default props => <Field {...props} component={SelectBox} />;
