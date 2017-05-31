import React, { PureComponent } from 'react';
import { element } from 'prop-types';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import Wrapper from './Wrapper';

export default class Landing extends PureComponent {
  static propTypes = {
    children: element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        <Header />
        {children}
        <Footer />
      </Wrapper>
    );
  }
}
