/* eslint-disable prefer-destructuring */
import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../Checkbox.js';

describe('Checkbox', () => {
  describe('default props', () => {
    it('should render with active prop', () => {
      const checkbox = shallow(
        <Checkbox
          active
          name="name"
          placeholder="placeholder"
        />
      );
      const instance = checkbox.instance();
      const state = instance.state;
      expect(state.active).toBe(true);
      expect(checkbox.hasClass('is-active')).toBe(true);
    });

    it('should render with invalid prop', () => {
      const checkbox = shallow(
        <Checkbox
          invalid
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.hasClass('is-invalid')).toBe(true);
    });

    it('should render with disabled prop', () => {
      const onBlurSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const onFocusSpy = jest.fn();
      const checkbox = shallow(
        <Checkbox
          disabled
          onBlur={onBlurSpy}
          onChange={onChangeSpy}
          onFocus={onFocusSpy}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.hasClass('is-disabled')).toBe(true);

      const inputElement = checkbox.find('.Checkbox__input');

      // input unchecked

      inputElement.simulate('focus', { currentTarget: { checked: true } });
      expect(onFocusSpy).not.toHaveBeenCalled();
      expect(checkbox.instance().state).toEqual({ checked: false, active: false });

      inputElement.simulate('change', { currentTarget: { checked: true } });
      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(checkbox.instance().state).toEqual({ checked: false, active: false });

      inputElement.simulate('blur', { currentTarget: { checked: true } });
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(checkbox.instance().state).toEqual({ checked: false, active: false });
    });

    it('should render with checked prop', () => {
      const checkbox = shallow(
        <Checkbox
          checked
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.hasClass('is-checked')).toBe(true);
    });

    it('should render with unchecked prop', () => {
      const checkbox = shallow(
        <Checkbox
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.hasClass('is-unchecked')).toBe(true);
    });

    it('should render with className prop', () => {
      const checkbox = shallow(
        <Checkbox
          className="Checkbox__test"
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.hasClass('Checkbox__test')).toBe(true);
    });

    it('should render with input props', () => {
      const checkbox = shallow(
        <Checkbox
          inputProps={{
            'data-test': true
          }}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.find('.Checkbox__input').prop('data-test')).toBe(true);
    });

    it('should render with input ref prop', () => {
      const checkbox = shallow(
        <Checkbox
          inputRef={() => {}}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.instance().props.inputRef).not.toBe(undefined);
    });

    it('shouldn\'t render with input ref prop', () => {
      const checkbox = shallow(
        <Checkbox
          name="name"
          placeholder="placeholder"
        />
      );
      expect(checkbox.instance().props.inputRef).toBe(undefined);
    });
  });

  describe('default checkbox', () => {
    describe('init state and props', () => {
      it('should render with initial state', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('name')).toBe('name');
        expect(inputElement.prop('id')).toBe('name');
        expect(inputElement.prop('value')).toBe(undefined);
        expect(inputElement.prop('type')).toBe('checkbox');
      });

      it('should render with disabled prop', () => {
        const checkbox = shallow(
          <Checkbox
            disabled
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('disabled')).toBe(true);
      });

      it('should render with tabIndex prop', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
            tabIndex="-10"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('tabIndex')).toBe('-10');
      });

      it('should render with value type array', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
            value={[1, 2, 3]}
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toEqual([1, 2, 3]);
      });

      it('should render with value type bool', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
            value
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toBe(true);
      });

      it('should render with value type object', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
            value={{ test: true }}
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toEqual({ test: true });
      });

      it('should render with value type number', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
            value={1}
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toEqual(1);
      });

      it('should render with value type string', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toBe('test');
      });
    });

    describe('uncontrolled', () => {
      it('should render with initial state', () => {
        const checkbox = shallow(
          <Checkbox
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = checkbox.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(false);
        expect(state.active).toBe(false);
      });

      it('should render with checked initial state', () => {
        const checkbox = shallow(
          <Checkbox
            defaultChecked
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = checkbox.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(true);
        expect(state.active).toBe(false);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const checkbox = shallow(
          <Checkbox
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = checkbox.find('.Checkbox__input');

        // input unchecked

        inputElement.simulate('focus', { currentTarget: { checked: true } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: true } }, true);
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('change', { currentTarget: { checked: true } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: true } }, true);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('blur', { currentTarget: { checked: true } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: true } }, true);
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: true, active: false });

        // input checked

        inputElement.simulate('focus', { currentTarget: { checked: false } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
        expect(onFocusSpy).toHaveBeenCalledTimes(2);
        expect(checkbox.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('change', { currentTarget: { checked: false } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
        expect(onChangeSpy).toHaveBeenCalledTimes(2);
        expect(checkbox.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('blur', { currentTarget: { checked: false } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
        expect(onBlurSpy).toHaveBeenCalledTimes(2);
        expect(checkbox.instance().state).toEqual({ checked: false, active: false });
      });
    });

    describe('controlled', () => {
      it('should render with initial state', () => {
        const checkbox = shallow(
          <Checkbox
            checked
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = checkbox.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(true);
        expect(state.checked).toBe(undefined);
        expect(state.active).toBe(undefined);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const checkbox = shallow(
          <Checkbox
            checked
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = checkbox.find('.Checkbox__input');

        inputElement.simulate('focus', { currentTarget: { checked: false } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({});

        inputElement.simulate('change', { currentTarget: { checked: false } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({});

        inputElement.simulate('blur', { currentTarget: { checked: false } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({});
      });
    });
  });

  describe('custom checkbox', () => {
    describe('init state and props', () => {
      it('should render with initial state', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('name')).toBe('name');
        expect(inputElement.prop('id')).toBe('name');
        expect(inputElement.prop('value')).toBe(undefined);
        expect(inputElement.prop('role')).toBe('checkbox');
      });

      it('should render with disabled prop', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            disabled
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('disabled')).toBe(true);
      });

      it('should render with tabIndex prop', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
            tabIndex="-10"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('tabIndex')).toBe('-10');
      });

      it('should render with value type array', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
            value={[1, 2, 3]}
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toEqual([1, 2, 3]);
      });

      it('should render with value type bool', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
            value
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toBe(true);
      });

      it('should render with value type object', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
            value={{ test: true }}
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toEqual({ test: true });
      });

      it('should render with value type number', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
            value={1}
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toEqual(1);
      });

      it('should render with value type string', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const inputElement = checkbox.find('.Checkbox__input');
        expect(inputElement.prop('value')).toBe('test');
      });

      it('should render with custom icon', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            checkedIcon={<div className="test-checkedIcon">checkedIcon</div>}
            name="name"
            placeholder="placeholder"
            unCheckedIcon={<div className="test-uncheckedIcon">uncheckedIcon</div>}
            value="test"
          />
        );
        const uncheckedIcon = checkbox.find('.test-uncheckedIcon');
        expect(uncheckedIcon.length).toBe(1);

        const inputElement = checkbox.find('.Checkbox__input');
        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'false' } });

        const checkedIcon = checkbox.find('.test-checkedIcon');
        expect(checkedIcon.length).toBe(1);
      });
    });

    describe('uncontrolled', () => {
      it('should render with initial state', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = checkbox.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(false);
        expect(state.active).toBe(false);
      });

      it('should render with checked initial state', () => {
        const checkbox = shallow(
          <Checkbox
            custom
            defaultChecked
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = checkbox.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.checked).toBe(true);
        expect(state.active).toBe(false);
      });

      it('should handle onKeyDown', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const checkbox = shallow(
          <Checkbox
            custom
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = checkbox.find('.Checkbox__input');

        // input unchecked

        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'false' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('keydown', { keyCode: 13, currentTarget: { getAttribute: () => 'false' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'true' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: true, active: false });
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const checkbox = shallow(
          <Checkbox
            custom
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = checkbox.find('.Checkbox__input');

        // input unchecked

        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'false' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'false' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'true' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({ checked: true, active: false });

        // input checked
        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'true' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(2);
        expect(checkbox.instance().state).toEqual({ checked: true, active: true });

        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'true' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(2);
        expect(checkbox.instance().state).toEqual({ checked: false, active: true });

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'false' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(2);
        expect(checkbox.instance().state).toEqual({ checked: false, active: false });
      });
    });

    describe('controlled', () => {
      it('should render with initial state', () => {
        const checkbox = shallow(
          <Checkbox
            checked
            custom
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = checkbox.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(true);
        expect(state.checked).toBe(undefined);
        expect(state.active).toBe(undefined);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const checkbox = shallow(
          <Checkbox
            checked
            custom
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = checkbox.find('.Checkbox__input');

        inputElement.simulate('focus', { currentTarget: { getAttribute: () => 'false' } });
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({});

        inputElement.simulate('click', { currentTarget: { getAttribute: () => 'false' } });
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({});

        inputElement.simulate('blur', { currentTarget: { getAttribute: () => 'true' } });
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(checkbox.instance().state).toEqual({});
      });
    });
  });
});
