import React from 'react';
import { string, bool, node } from 'prop-types';
import Helmet from 'react-helmet';

function HelmetWrapper({
  title,
  description,
  sitePrefix,
  disableSitePrefix,
  children
}) {
  const nextTitle = !disableSitePrefix ? `${sitePrefix} | ${title}` : title;
  const nextDescr = !disableSitePrefix ? `${sitePrefix} | ${description}` : description;

  return (
    <Helmet>
      <title>{nextTitle}</title>
      <meta name="description" content={nextDescr} />
      <meta property="og:title" content={nextTitle} />
      <meta property="og:description" content={nextDescr} />
      <meta property="twitter:title" content={nextTitle} />
      <meta property="twitter:description" content={nextDescr} />
      {children}
    </Helmet>
  );
}

HelmetWrapper.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  sitePrefix: string,
  disableSitePrefix: bool,
  children: node
};

HelmetWrapper.defaultProps = {
  sitePrefix: 'Redux Starter'
};

export default HelmetWrapper;
