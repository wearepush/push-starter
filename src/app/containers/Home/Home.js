import React, { PureComponent } from 'react';
import { SignIn } from 'app/components';

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <SignIn />
      </div>
    );
  }
}
