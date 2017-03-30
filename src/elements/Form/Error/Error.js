import React, { Component, PropTypes } from 'react';
import {} from './Error.scss';

export default class Error extends Component {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, message } = this.props;
    return (
      <div className="error-text">
        {message !== '' &&
        <div className={'form-error help-block' + (className || '')}>
          {message}
        </div>}
      </div>
    );
  }
}

