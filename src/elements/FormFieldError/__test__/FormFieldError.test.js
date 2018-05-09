import React from 'react';
import { shallow } from 'enzyme';
import FormFieldError from '../FormFieldError.js';

describe('FormFieldError', () => {
  it('it should render with initial state', () => {
    const error = shallow(
      <FormFieldError
        error="Message with error"
      />
    );
    expect(error.find('.FormFieldError').length).toBe(1);
    expect(error.find('.FormFieldError').text()).toBe('Message with error');
  });
});
