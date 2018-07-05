import React, { Component } from 'react';
import { detect } from 'detect-browser';

export default function withDevice(WrappedComponent) {
  class HOC extends Component {
    componentDidMount() {
      require('current-device');
      const { name, version } = detect();
      const browserName = name.toLowerCase();
      const versionVersion = `v${parseInt(version, 10)}`;
      const className = `${browserName} ${versionVersion}`;
      const currentClassNames = document.documentElement.className.replace(/^\s+|\s+$/g, '');
      document.documentElement.className = (currentClassNames && currentClassNames + ' ') + className;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return HOC;
}
