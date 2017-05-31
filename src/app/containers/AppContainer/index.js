import React, { Component } from 'react';
import { element } from 'prop-types';
import App from 'app/components/App';

export default class AppContainer extends Component {
  static propTypes = {
    children: element.isRequired,
  };

  render() {
    return <App {...this.props} />;
  }
}
