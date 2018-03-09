import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { noop } from 'lodash';
import FormTextField from '../FormTextField.js';
import formStore from '../../../redux/__mocks__/formStore.js';

let store;
beforeEach(() => {
  store = formStore;
});

describe('FormTextField', () => {
  const makeForm = ({
    renderSpy = noop,
    onFocusSpy = noop,
    onChangeSpy = noop,
    onBlurSpy = noop,
  }) => (
    class Form extends Component {
      render() {
        renderSpy(this.props);
        return (
          <form>
            <FormTextField
              label="Email"
              name="email"
              onFocus={onFocusSpy}
              onChange={onChangeSpy}
              onBlur={onBlurSpy}
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

  it('it should render with initial state', () => {
    const renderSpy = jest.fn(() => {});
    const Form = makeForm({ renderSpy });
    const dom = renderForm(Form, {}, {});

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    const inputElement = dom.find('.FormTextField input');
    expect(inputElement.prop('name')).toBe('email');
    expect(inputElement.prop('id')).toBe('email');
    expect(inputElement.prop('value')).toBe('');
    expect(inputElement.prop('type')).toBe('text');
  });

  it('it should handle onFocus, onChange, onBlur', () => {
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

    let inputElement = dom.find('.FormTextField input');

    // onFocus
    inputElement.simulate('focus');

    inputElement = dom.find('.FormTextField input');
    expect(onFocusSpy).toHaveBeenCalled();

    expect(inputElement.hasClass('is-active')).toBe(true);

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    // onChange
    inputElement.simulate('change', { target: { value: 'test@test.com' } });
    expect(onChangeSpy).toHaveBeenCalled();

    expect(inputElement.instance().value).toBe('test@test.com');

    expect(renderSpy).toHaveBeenCalledTimes(2);

    // onBlur
    inputElement.simulate('blur');
    expect(onBlurSpy).toHaveBeenCalled();

    inputElement = dom.find('.FormTextField input');
    expect(inputElement.hasClass('is-active')).toBe(false);
  });
});
