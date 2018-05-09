import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { noop } from 'lodash';
import FormRadio from '../FormRadio.js';
import formStore from '../../../redux/__mocks__/formStore.js';

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
            label="Label"
            name="name"
            placeholder="Placeholder"
            onFocus={onFocusSpy}
            onChange={onChangeSpy}
            onBlur={onBlurSpy}
            value="value"
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
  it('it should render with initial state', () => {
    const renderSpy = jest.fn(() => {});
    const Form = makeForm({ renderSpy });
    const dom = renderForm(Form, {}, {});

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    const inputElement = dom.find('.FormRadio__input');
    expect(inputElement.prop('name')).toBe('name');
    expect(inputElement.prop('value')).toBe('value');
    expect(inputElement.prop('id')).toBe('name-value');
    expect(inputElement.prop('value')).toBe('value');
    expect(inputElement.prop('type')).toBe('radio');

    dom.unmount();
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

    let inputElement = dom.find('.FormRadio__input');
    let iconElement = dom.find('.FormRadio__icon');

    /* check */

    // onFocus
    inputElement.simulate('focus');

    inputElement = dom.find('.FormRadio__input');
    iconElement = dom.find('.FormRadio__icon');
    expect(onFocusSpy).toHaveBeenCalled();

    expect(iconElement.hasClass('is-active')).toBe(true);

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    // onChange
    inputElement.simulate('change', { target: { value: 'value' } });
    expect(onChangeSpy).toHaveBeenCalled();

    inputElement = dom.find('.FormRadio__input');
    expect(inputElement.prop('data-checked')).toBe('true');

    expect(renderSpy).toHaveBeenCalledTimes(2);

    // onBlur
    inputElement.simulate('blur');
    expect(onBlurSpy).toHaveBeenCalled();

    inputElement = dom.find('.FormRadio__input');
    iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-active')).toBe(false);

    /* uncheck */

    // onFocus
    inputElement.simulate('focus');
    inputElement = dom.find('.FormRadio__input');
    iconElement = dom.find('.FormRadio__icon');

    expect(iconElement.hasClass('is-active')).toBe(true);

    expect(onFocusSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(3);

    // onChange
    inputElement.simulate('change', { target: { value: 'value-2' } });

    expect(onChangeSpy).toHaveBeenCalled();
    inputElement = dom.find('.FormRadio__input');
    expect(inputElement.prop('data-checked')).toBe('false');
    expect(renderSpy).toHaveBeenCalledTimes(3);

    // onBlur
    inputElement.simulate('blur');
    expect(onBlurSpy).toHaveBeenCalled();

    inputElement = dom.find('.FormRadio__input');
    iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-active')).toBe(false);

    dom.unmount();
  });

  it('it should render with custom checked icon', () => {
    const iconChecked = (<div className="icon-custom-checked">checked</div>);
    const iconUnChecked = (<div className="icon-custom-unchecked">unchecked</div>);
    const Form = makeForm({ iconChecked, iconUnChecked });
    const dom = renderForm(Form, {}, {});

    const inputElement = dom.find('.FormRadio__input');
    let iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-custom-icon')).toBe(true);
    expect(iconElement.hasClass('is-unchecked')).toBe(true);

    /* check */

    // onFocus
    inputElement.simulate('focus');

    iconElement = dom.find('.FormRadio__icon');

    expect(iconElement.hasClass('is-active')).toBe(true);

    // onChange
    inputElement.simulate('change', { target: { value: 'value' } });

    iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-checked')).toBe(true);
    expect(iconElement.hasClass('is-unchecked')).toBe(false);

    // onBlur
    inputElement.simulate('blur');
    iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-active')).toBe(false);

    /* uncheck */

    // onFocus
    inputElement.simulate('focus');
    iconElement = dom.find('.FormRadio__icon');

    expect(iconElement.hasClass('is-active')).toBe(true);

    // onChange
    inputElement.simulate('change', { target: { value: 'value-2' } });
    iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-unchecked')).toBe(true);
    expect(iconElement.hasClass('is-checked')).toBe(false);

    inputElement.simulate('blur');
    iconElement = dom.find('.FormRadio__icon');
    expect(iconElement.hasClass('is-active')).toBe(false);

    dom.unmount();
  });
});
