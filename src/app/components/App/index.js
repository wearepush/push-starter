import React, { PureComponent } from 'react';
import { element } from 'prop-types';
import 'app/styles/global';
import Wrapper from './Wrapper';

export default class App extends PureComponent {
  static propTypes = {
    children: element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        {children}
      </Wrapper>
    );
  }
}
