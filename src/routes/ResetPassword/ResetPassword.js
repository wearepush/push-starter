import React from 'react';
import { ResetPasswordForm } from 'components';
import { HelmetWrapper } from 'elements';

const ResetPassword = () => {
  const title = 'ResetPassword';
  const description = 'Redux Form';

  return (
    <div>
      <HelmetWrapper title={title} description={description} />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
