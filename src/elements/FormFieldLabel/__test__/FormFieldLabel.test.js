import React from 'react';
import { shallow } from 'enzyme';
import FormFieldLabel from '../FormFieldLabel.js';

describe('FormFieldLabel', () => {
  it('it should render with initial state', () => {
    const label = shallow(
      <FormFieldLabel
        htmlFor="email"
        label="Email"
      />
    );
    expect(label.find('.FormFieldLabel').length).toBe(1);
    expect(label.find('.FormFieldLabel').text()).toBe('Email');
    expect(label.prop('htmlFor')).toBe('email');
  });

  it('it should render with active state', () => {
    const label = shallow(
      <FormFieldLabel
        active
        htmlFor="email"
        label="Email"
      />
    );
    expect(label.find('.FormFieldLabel').hasClass('is-active')).toBe(true);
  });

  it('it should render with invalid state', () => {
    const label = shallow(
      <FormFieldLabel
        invalid
        htmlFor="email"
        label="Email"
      />
    );
    expect(label.find('.FormFieldLabel').hasClass('is-invalid')).toBe(true);
  });
});
