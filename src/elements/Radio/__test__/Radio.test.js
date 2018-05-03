/* eslint-disable prefer-destructuring */
import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../Radio.js';

describe('Radio', () => {
  describe('default props', () => {
    it('should render with active prop', () => {
      const radio = shallow(
        <Radio
          active
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      const instance = radio.instance();
      const state = instance.state;
      expect(state.active).toBe(true);
      expect(radio.hasClass('is-active')).toBe(true);
    });

    it('should render with invalid prop', () => {
      const radio = shallow(
        <Radio
          invalid
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.hasClass('is-invalid')).toBe(true);
    });

    it('should render with disabled prop', () => {
      const onBlurSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const onFocusSpy = jest.fn();
      const radio = shallow(
        <Radio
          disabled
          onBlur={onBlurSpy}
          onChange={onChangeSpy}
          onFocus={onFocusSpy}
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.hasClass('is-disabled')).toBe(true);

      const inputElement = radio.find('.Radio__input');

      // input unchecked

      inputElement.simulate('focus', { currentTarget: { checked: true } });
      expect(onFocusSpy).not.toHaveBeenCalled();
      expect(radio.instance().state).toEqual({ checked: false, active: false });

      inputElement.simulate('change', { currentTarget: { checked: true } });
      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(radio.instance().state).toEqual({ checked: false, active: false });

      inputElement.simulate('blur', { currentTarget: { checked: true } });
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(radio.instance().state).toEqual({ checked: false, active: false });
    });

    it('should render with checked prop', () => {
      const radio = shallow(
        <Radio
          checked
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.hasClass('is-checked')).toBe(true);
    });

    it('should render with unchecked prop', () => {
      const radio = shallow(
        <Radio
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.hasClass('is-unchecked')).toBe(true);
    });

    it('should render with className prop', () => {
      const radio = shallow(
        <Radio
          className="Radio__test"
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.hasClass('Radio__test')).toBe(true);
    });

    it('should render with input props', () => {
      const radio = shallow(
        <Radio
          inputProps={{
            'data-test': true
          }}
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.find('.Radio__input').prop('data-test')).toBe(true);
    });

    it('should render with input ref prop', () => {
      const radio = shallow(
        <Radio
          inputRef={() => {}}
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.instance().props.inputRef).not.toBe(undefined);
    });

    it('shouldn\'t render with input ref prop', () => {
      const radio = shallow(
        <Radio
          name="name"
          placeholder="placeholder"
          value="0"
        />
      );
      expect(radio.instance().props.inputRef).toBe(undefined);
    });
  });

  describe('default radio', () => {
    describe('init state and props', () => {
      it('should render with initial state', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('name')).toBe('name');
        expect(inputElement.prop('id')).toBe('name-"0"');
        expect(inputElement.prop('value')).toBe('0');
        expect(inputElement.prop('type')).toBe('radio');
      });

      it('should render with disabled prop', () => {
        const radio = shallow(
          <Radio
            disabled
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('disabled')).toBe(true);
      });

      it('should render with tabIndex prop', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            tabIndex="-10"
            value="0"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('tabIndex')).toBe('-10');
      });

      it('should render with value type array', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value={[1, 2, 3]}
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toEqual([1, 2, 3]);
      });

      it('should render with value type bool', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toBe(true);
      });

      it('should render with value type object', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value={{ test: true }}
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toEqual({ test: true });
      });

      it('should render with value type number', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value={1}
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toEqual(1);
      });

      it('should render with value type string', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toBe('test');
      });
    });

    describe('uncontrolled', () => {
      it('should render with initial state', () => {
        const radio = shallow(
          <Radio
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const instance = radio.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(false);
        expect(state.active).toBe(false);
      });

      it('should render with checked initial state', () => {
        const radio = shallow(
          <Radio
            defaultChecked
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const instance = radio.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(true);
        expect(state.active).toBe(false);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const radio = shallow(
          <Radio
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );

        const inputElement = radio.find('.Radio__input');

        // input unchecked

        inputElement.simulate('focus', { currentTarget: { checked: true } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: true } }, '0');
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('change', { currentTarget: { checked: true } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: true } }, '0');
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('blur', { currentTarget: { checked: true } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: true } }, '0');
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: true, active: false });

        // input checked

        inputElement.simulate('focus', { currentTarget: { checked: false } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, '0');
        expect(onFocusSpy).toHaveBeenCalledTimes(2);
        expect(radio.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('change', { currentTarget: { checked: false } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, '0');
        expect(onChangeSpy).toHaveBeenCalledTimes(2);
        expect(radio.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('blur', { currentTarget: { checked: false } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, '0');
        expect(onBlurSpy).toHaveBeenCalledTimes(2);
        expect(radio.instance().state).toEqual({ checked: false, active: false });
      });
    });

    describe('controlled', () => {
      it('should render with initial state', () => {
        const radio = shallow(
          <Radio
            checked
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const instance = radio.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(true);
        expect(state.checked).toBe(undefined);
        expect(state.active).toBe(undefined);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const radio = shallow(
          <Radio
            checked
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );

        const inputElement = radio.find('.Radio__input');

        inputElement.simulate('focus', { currentTarget: { checked: false } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, '0');
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({});

        inputElement.simulate('change', { currentTarget: { checked: false } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, '0');
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({});

        inputElement.simulate('blur', { currentTarget: { checked: false } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, '0');
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({});
      });
    });
  });

  describe('custom radio', () => {
    describe('init state and props', () => {
      it('should render with initial state', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('name')).toBe('name');
        expect(inputElement.prop('id')).toBe('name-"0"');
        expect(inputElement.prop('value')).toBe('0');
        expect(inputElement.prop('role')).toBe('radio');
      });

      it('should render with disabled prop', () => {
        const radio = shallow(
          <Radio
            custom
            disabled
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('disabled')).toBe(true);
      });

      it('should render with tabIndex prop', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            tabIndex="-10"
            value="0"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('tabIndex')).toBe('-10');
      });

      it('should render with value type array', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value={[1, 2, 3]}
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toEqual([1, 2, 3]);
      });

      it('should render with value type bool', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toBe(true);
      });

      it('should render with value type object', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value={{ test: true }}
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toEqual({ test: true });
      });

      it('should render with value type number', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value={1}
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toEqual(1);
      });

      it('should render with value type string', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const inputElement = radio.find('.Radio__input');
        expect(inputElement.prop('value')).toBe('test');
      });

      it('should render with custom icon', () => {
        const radio = shallow(
          <Radio
            custom
            checkedIcon={<div className="test-checkedIcon">checkedIcon</div>}
            name="name"
            placeholder="placeholder"
            unCheckedIcon={<div className="test-uncheckedIcon">uncheckedIcon</div>}
            value="test"
          />
        );
        const uncheckedIcon = radio.find('.test-uncheckedIcon');
        expect(uncheckedIcon.length).toBe(1);

        const inputElement = radio.find('.Radio__input');
        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'false' } });

        const checkedIcon = radio.find('.test-checkedIcon');
        expect(checkedIcon.length).toBe(1);
      });
    });

    describe('uncontrolled', () => {
      it('should render with initial state', () => {
        const radio = shallow(
          <Radio
            custom
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const instance = radio.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(false);
        expect(state.active).toBe(false);
      });

      it('should render with checked initial state', () => {
        const radio = shallow(
          <Radio
            custom
            defaultChecked
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const instance = radio.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(true);
        expect(state.active).toBe(false);
      });

      it('should handle onKeyDown', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const radio = shallow(
          <Radio
            custom
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );

        const inputElement = radio.find('.Radio__input');

        // input unchecked

        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'false' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('keydown', { keyCode: 13, currentTarget: { getAttribute: () => 'false' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'true' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: true, active: false });
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const radio = shallow(
          <Radio
            custom
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );

        const inputElement = radio.find('.Radio__input');

        // input unchecked

        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'false' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'false' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'true' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({ checked: true, active: false });

        // input checked
        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'true' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(2);
        expect(radio.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'true' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(2);
        expect(radio.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'false' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(2);
        expect(radio.instance().state).toEqual({ checked: false, active: false });
      });
    });

    describe('controlled', () => {
      it('should render with initial state', () => {
        const radio = shallow(
          <Radio
            checked
            custom
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );
        const instance = radio.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(true);
        expect(state.checked).toBe(undefined);
        expect(state.active).toBe(undefined);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const radio = shallow(
          <Radio
            checked
            custom
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
            value="0"
          />
        );

        const inputElement = radio.find('.Radio__input');

        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'false' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({});

        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'false' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({});

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'true' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(radio.instance().state).toEqual({});
      });
    });
  });
});
