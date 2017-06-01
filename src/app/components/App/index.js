import React, { PureComponent } from 'react';
import { element } from 'prop-types';

export default class App extends PureComponent {
  static propTypes = {
    children: element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}
