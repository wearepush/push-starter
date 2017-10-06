import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  const title = 'Redux Starter. About';
  const description = 'About project';
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
      {'About'}
    </div>
  );
};

export default About;
