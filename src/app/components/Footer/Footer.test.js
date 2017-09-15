import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer/Footer';

test('<Footer />', () => {
  const footer = shallow(
    <Footer />
  );
  expect(footer.find('div').length).toBe(1);
});
