import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { noop } from 'lodash';
import formStore from '../../../redux/__mocks__/formStore.js';
import { Radio, FormField, FormRadio } from '../../index.js';

let store;
beforeEach(() => {
  store = formStore;
});

const makeForm = ({
  renderSpy = noop,
  onFocusSpy = noop,
  onChangeSpy = noop,
  onBlurSpy = noop,
  iconChecked = null,
  iconUnChecked = null,
}) => (
  class Form extends Component {
    render() {
      renderSpy(this.props);
      return (
        <form>
          <FormRadio
            iconChecked={iconChecked}
            iconUnChecked={iconUnChecked}
            label="Remember"
            name="remember"
            placeholder="Remember"
            onFocus={onFocusSpy}
            onChange={onChangeSpy}
            onBlur={onBlurSpy}
            value="0"
          />
        </form>
      );
    }
  }
);

const renderForm = (Form, formState, config = {}) => {
  const Decorated = reduxForm({ form: 'testForm', ...config })(Form);
  return mount(
    <Provider store={store}>
      <Decorated />
    </Provider>
  );
};

describe('FormRadio', () => {
  it('should render checkbox with initial state', () => {
    const renderSpy = jest.fn(() => {});
    const Form = makeForm({ renderSpy });
    const dom = renderForm(Form, {}, {});

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    expect(dom.find(Radio).length).toBe(1);
    expect(dom.find(FormField).length).toBe(1);

    dom.unmount();
  });

  it('should handle onFocus, onChange, onBlur', () => {
    const renderSpy = jest.fn(() => {});
    const onFocusSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const onBlurSpy = jest.fn();
    const Form = makeForm({
      renderSpy,
      onFocusSpy,
      onChangeSpy,
      onBlurSpy
    });
    const dom = renderForm(Form, {}, {});

    const inputElement = dom.find('.Radio__input');

    // onFocus
    inputElement.simulate('focus');

    expect(onFocusSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    // onChange
    inputElement.simulate('change', { target: { value: '0' } });
    expect(onChangeSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(2);

    // onBlur
    inputElement.simulate('blur');
    expect(onBlurSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(3);

    dom.unmount();
  });
});
