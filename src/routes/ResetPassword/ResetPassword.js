import React from 'react';
import { Helmet } from 'react-helmet';
import { ResetPasswordForm } from '../../components';

const ResetPassword = () => {
  const title = 'Redux Starter. ResetPassword';
  const description = 'Redux Form. Sign Up';
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
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
