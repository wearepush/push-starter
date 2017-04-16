// import React from 'react';
import * as authActions from 'redux/modules/auth';

// import ReactDOM from 'react-dom';
// import { renderIntoDocument } from 'react-addons-test-utils';
// import { expect } from 'chai';
// import { Banner } from 'components';
// import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router';
// import createStore from 'redux/create';
// import ApiClient from 'helpers/ApiClient';
// const client = new ApiClient();

describe('Auth', () => {
  console.log(authActions.logIn);
  // const mockStore = {
  //   info: {
  //     load: () => {},
  //     loaded: true,
  //     loading: false,
  //     data: {
  //       message: 'This came from the api server',
  //       time: Date.now()
  //     }
  //   }
  // };
  // const store = createStore(browserHistory, client, mockStore);
  // const renderer = renderIntoDocument(
  //   <Provider store={store} key="provider">
  //     <Banner />
  //   </Provider>
  // );
  // const dom = ReactDOM.findDOMNode(renderer); // TODO replace findDOMNode method

  // it('should render correctly', () => expect(renderer).to.be.ok);

  // it('should render with correct value', () => {
  //   const text = dom.getElementsByTagName('strong')[0].textContent;
  //   expect(text).to.equal(mockStore.info.data.message);
  // });

  // it('should render with a reload button', () => {
  //   const text = dom.getElementsByTagName('button')[0].textContent;
  //   expect(text).to.be.a('string');
  // });

  // it('should render the correct className', () => {
  //   const styles = require('components/Banner/Banner.scss');
  //   expect(styles.infoBar).to.be.a('string');
  //   expect(dom.className).to.include(styles.infoBar);
  // });
});
