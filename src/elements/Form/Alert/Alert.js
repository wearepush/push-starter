import React, { Component, PropTypes } from 'react';

export default class Alert extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, title } = this.props;
    return (
      <div>
        {title && <div className={`alert ${className}`}>{title}</div>}
      </div>
    );
  }
}
