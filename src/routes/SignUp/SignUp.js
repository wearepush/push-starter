import React from 'react';
import { SignUpForm } from 'components';
import { HelmetWrapper } from 'elements';

const SignUp = () => {
  const title = 'Redux Starter. SignUp';
  const description = 'Redux Form';
  return (
    <div>
      <HelmetWrapper title={title} description={description} />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
