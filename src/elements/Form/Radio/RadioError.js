import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setError, clearError } from 'redux/modules/formErrors';

@connect(state => (
  {
    errors: state.formErrors
  }
  ),
  {
    setError,
    clearError
  })
export default class RadioError extends Component {
  static propTypes = {
    errors: PropTypes.object,
    setError: PropTypes.func,
    clearError: PropTypes.func,
    field: PropTypes.string,
    error: PropTypes.string,
  }

  componentDidMount() {
    const { errors, error, field } = this.props;
    if (errors && !errors[field]) {
      this.props.setError(field, error);
    }
  }

  componentWillUnmount() {
    const { errors, field } = this.props;
    if (errors && errors[field]) {
      this.props.clearError(field);
    }
  }

  render() {
    return null;
  }
}
