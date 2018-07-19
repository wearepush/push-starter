import React from 'react';
import { shallow } from 'enzyme';
import FormFieldError from '../FormFieldError.js';

describe('FormFieldError', () => {
  it('should render with initial state', () => {
    const error = shallow(
      <FormFieldError
        text="Message with error"
      />
    );

    expect(error.find('.FormFieldError').length).toBe(1);
    expect(error.find('.FormFieldError').text()).toBe('Message with error');
    expect(error.hasClass('is-error')).toBe(true);
  });

  it('should render with warning', () => {
    const error = shallow(
      <FormFieldError
        text="Message with error"
        type="error"
      />
    );
    expect(error.hasClass('is-error')).toBe(true);
  });

  it('should render with warning', () => {
    const error = shallow(
      <FormFieldError
        text="Message with error"
        type="warning"
      />
    );
    expect(error.hasClass('is-warning')).toBe(true);
  });
});
