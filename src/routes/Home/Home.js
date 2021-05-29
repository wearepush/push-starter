import React from 'react';
import { connect } from 'react-redux';
import { SignInForm } from 'components';
import { HelmetWrapper } from 'elements';

console.log('config', process.env);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const Home = () => {
  const title = 'Home';
  const description = 'Sign In';
  return (
    <div>
      <HelmetWrapper title={title} description={description} />
      <SignInForm />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
