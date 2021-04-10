import React, { Component } from 'react';
import { object } from 'prop-types';
import GoogleAnalytics from 'react-ga';
// import { googleAnaliticsId } from '../config/default';

let googleAnaliticsId;

if (googleAnaliticsId) {
  GoogleAnalytics.initialize(googleAnaliticsId);
}

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      if (googleAnaliticsId) {
        const { location } = this.props;
        const page = location.pathname;
        trackPage(page);
      }
    }

    componentDidUpdate(nextProps) {
      if (googleAnaliticsId) {
        const { location } = this.props;
        const currentPage = location.pathname;
        const nextPage = nextProps.location.pathname;

        if (currentPage !== nextPage) {
          trackPage(nextPage);
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  if (typeof WrappedComponent.fetchData !== 'undefined') {
    HOC.fetchData = WrappedComponent.fetchData;
  }

  HOC.propTypes = {
    location: object.isRequired,
  };

  return HOC;
}
