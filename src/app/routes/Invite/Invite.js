import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Invites } from './../../components';

export default class Invite extends PureComponent {
  render() {
    const title = 'Redux Starter. Invite Friends';
    const description = 'Redux Form. Invite';
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
        <Invites />
      </div>
    );
  }
}
