import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from 'app/components/App';

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return <App {...this.props} />;
  }
}
