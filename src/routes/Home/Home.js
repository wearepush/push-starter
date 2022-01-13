import React from 'react';
import { connect } from 'react-redux';
// import { SignInForm } from '../../components';
import { Button } from 'push-ui';
import { HelmetWrapper } from '../../elements';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const Home = () => {
  const title = 'Home';
  const description = 'Sign In';
  return (
    <div>
      <HelmetWrapper title={title} description={description} />
      {/* <SignInForm /> */}
      <Button>+++++++++</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
