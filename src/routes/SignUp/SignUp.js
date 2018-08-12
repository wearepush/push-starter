import React from 'react';
import { Helmet } from 'react-helmet';
import { SignUpForm } from 'components';

const SignUp = () => {
  const title = 'Redux Starter. SignUp';
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
      <SignUpForm />
    </div>
  );
};

export default SignUp;
