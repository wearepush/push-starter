import React from 'react';
import { Helmet } from 'react-helmet';
import { SignInForm } from 'components';

const SignIn = () => {
  const title = 'Redux Starter. SignIn';
  const description = 'Redux Form';
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
      <SignInForm />
    </div>
  );
};

export default SignIn;
