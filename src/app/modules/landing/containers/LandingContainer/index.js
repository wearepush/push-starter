import React, { Component } from 'react';
import { element } from 'prop-types';
import Landing from 'app/modules/landing/components/Landing';

export default class LandingContainer extends Component {
  static propTypes = {
    children: element.isRequired
  };

  render() {
    return <Landing {...this.props} />;
  }
}
