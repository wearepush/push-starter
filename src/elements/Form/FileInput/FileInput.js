import React, {Component, PropTypes} from 'react'; // eslint-disable-line
import Dropzone from 'react-dropzone';
import { Form } from 'elements';
import {} from './FileInput.scss';
import { Field } from 'redux-form';
import { nFormatter } from 'utils/helpers';

class FileInput extends Component {
  static propTypes = {
    default_text: PropTypes.string,
    selected_text: PropTypes.string,
    label: PropTypes.string,
    dropzone_options: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    error_hidden: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    selected_text: 'replace',
    default_text: 'upload'
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { default_text, className, selected_text, label, input: { value, onChange }, dropzone_options, meta: { error, touched }, error_hidden } = this.props;
    return (
      <div className={`input-file ${className || ''}`}>
        {label && <p>{label}</p>}
        <Dropzone
          {...dropzone_options}
          onDrop={f => onChange(f)}
        >
          {!!value.length && value.map((c, i) => <span key={i}>{c.name + ` (${nFormatter(c.size, 0)}b) `}</span>)}
          <strong>{value.length ? selected_text : default_text}</strong>
        </Dropzone>
        {!error_hidden && <Form.Error message={error && touched ? error : ''} />}
      </div>
    );
  }
}
export default props => <Field {...props} component={FileInput} />;
