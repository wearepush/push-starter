import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';

import { SignIn } from '../components';

export default class Home extends PureComponent {
  render() {
    const title = 'Redux Starter. Home';
    const description = 'Redux Form. Sign In';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <SignIn />
      </div>
    );
  }
}
