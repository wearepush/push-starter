import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { noop } from 'lodash';
import FormSelect from '../FormSelect.js';
import formStore from '../../../redux/__mocks__/formStore.js';

let store;
beforeEach(() => {
  store = formStore;
});

const makeForm = ({
  multiple = false,
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
          <FormSelect
            multiple={multiple}
            label="Age"
            name="age"
            placeholder="Select Age"
            options={[
              { label: '< 18', value: '18' },
              { label: '18-25', value: '18-25', disabled: true },
              { label: '25+', value: '25' },
            ]}
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

describe('FormSelect', () => {
  describe('single', () => {
    it('it should render with initial state', () => {
      const renderSpy = jest.fn(() => {});
      const Form = makeForm({ renderSpy });
      const dom = renderForm(Form, {}, {});

      expect(renderSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalledTimes(1);

      const selectElement = dom.find('.FormSelect select');
      expect(selectElement.prop('name')).toBe('age');
      expect(selectElement.prop('id')).toBe('age');
      expect(selectElement.prop('value')).toBe('');
      expect(selectElement.prop('type')).toBe('select');

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

      let selectElement = dom.find('.FormSelect select');

      // onFocus
      selectElement.simulate('focus');

      selectElement = dom.find('.FormSelect select');
      expect(onFocusSpy).toHaveBeenCalled();

      expect(selectElement.hasClass('is-active')).toBe(true);

      expect(renderSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalledTimes(1);

      // onChange
      selectElement.simulate('change', { target: { value: '18' } });
      expect(onChangeSpy).toHaveBeenCalled();

      expect(selectElement.instance().value).toBe('18');

      expect(renderSpy).toHaveBeenCalledTimes(2);

      // onBlur
      selectElement.simulate('blur');
      expect(onBlurSpy).toHaveBeenCalled();

      selectElement = dom.find('.FormSelect select');
      expect(selectElement.hasClass('is-active')).toBe(false);

      dom.unmount();
    });
  });

  describe('multiple', () => {
    it('it should render with initial state', () => {
      const renderSpy = jest.fn(() => {});
      const multiple = true;
      const Form = makeForm({ renderSpy, multiple });
      const dom = renderForm(Form, {}, {});

      expect(renderSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalledTimes(1);

      const selectElement = dom.find('.FormSelect select');
      expect(selectElement.prop('name')).toBe('age');
      expect(selectElement.prop('id')).toBe('age');
      expect(selectElement.prop('multiple')).toBe(true);
      expect(selectElement.prop('value')).toEqual([]);
      expect(selectElement.prop('type')).toBe('select-multiple');

      dom.unmount();
    });

    it('it should handle onFocus, onChange, onBlur', () => {
      const renderSpy = jest.fn(() => {});
      const multiple = true;
      const onFocusSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const onBlurSpy = jest.fn();
      const Form = makeForm({
        multiple,
        renderSpy,
        onFocusSpy,
        onChangeSpy,
        onBlurSpy
      });
      const dom = renderForm(Form, {}, {});

      let selectElement = dom.find('.FormSelect select');

      // onFocus
      selectElement.simulate('focus');

      selectElement = dom.find('.FormSelect select');
      expect(onFocusSpy).toHaveBeenCalled();

      expect(selectElement.hasClass('is-active')).toBe(true);

      expect(renderSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalledTimes(1);

      // onChange
      selectElement.simulate('change', { target: { value: '18' } });
      expect(onChangeSpy).toHaveBeenCalled();

      console.log(selectElement.instance().value);

      expect(selectElement.instance().value).toEqual('18');

      expect(renderSpy).toHaveBeenCalledTimes(2);

      // onBlur
      selectElement.simulate('blur');
      expect(onBlurSpy).toHaveBeenCalled();

      selectElement = dom.find('.FormSelect select');
      expect(selectElement.hasClass('is-active')).toBe(false);

      dom.unmount();
    });
  });
});
