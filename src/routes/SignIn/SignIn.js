import React from 'react';
import { SignInForm } from 'components';
import { HelmetWrapper } from 'elements';

const SignIn = () => {
  const title = 'SignIn';
  const description = 'Redux Form';

  return (
    <div>
      <HelmetWrapper title={title} description={description} />
      <SignInForm />
    </div>
  );
};

export default SignIn;
