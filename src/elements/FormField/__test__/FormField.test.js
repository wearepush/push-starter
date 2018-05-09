import React from 'react';
import { shallow } from 'enzyme';
import FormField from '../FormField.js';

describe('FormField', () => {
  it('it should render with initial state', () => {
    const children = (<div>Children</div>);
    const formField = shallow(
      <FormField>
        {children}
      </FormField>
    );
    expect(formField.find('.FormField').length).toBe(1);
    expect(formField.contains(children)).toEqual(true);
  });

  it('it should render with label', () => {
    const children = (<div>Children</div>);
    const formField = shallow(
      <FormField
        name="email"
        label="Email"
      >
        {children}
      </FormField>
    );
    expect(formField.find('.FormField__label').length).toBe(1);
  });

  it('it should render with error', () => {
    const children = (<div>Children</div>);
    const formField = shallow(
      <FormField
        meta={{
          error: 'Message with errror',
          touched: true,
        }}
        name="email"
        label="Email"
      >
        {children}
      </FormField>
    );
    expect(formField.find('.FormField__error').length).toBe(1);
  });

  it('it should render with warning', () => {
    const children = (<div>Children</div>);
    const formField = shallow(
      <FormField
        meta={{
          warning: 'Message with warning',
          touched: true,
        }}
        name="email"
        label="Email"
      >
        {children}
      </FormField>
    );
    expect(formField.find('.FormField__error').length).toBe(1);
  });
});
