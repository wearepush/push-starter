/* eslint-disable prefer-destructuring */
import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../TextArea.js';

describe('TextArea', () => {
  describe('default props', () => {
    it('should render with active prop', () => {
      const input = shallow(
        <TextArea
          active
          name="name"
          placeholder="placeholder"
        />
      );
      const instance = input.instance();
      const state = instance.state;
      expect(state.active).toBe(true);
      expect(input.hasClass('is-active')).toBe(true);
    });

    it('should render with invalid prop', () => {
      const input = shallow(
        <TextArea
          invalid
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-invalid')).toBe(true);
    });

    it('should render with valid prop', () => {
      const input = shallow(
        <TextArea
          valid
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-valid')).toBe(true);
    });

    it('should render with disabled prop', () => {
      const onBlurSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const onFocusSpy = jest.fn();
      const input = shallow(
        <TextArea
          disabled
          onBlur={onBlurSpy}
          onChange={onChangeSpy}
          onFocus={onFocusSpy}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-disabled')).toBe(true);

      const inputElement = input.find('.TextArea__input');

      inputElement.simulate('focus');
      expect(onFocusSpy).not.toHaveBeenCalled();
      expect(input.instance().state).toEqual({ value: undefined, active: false });

      inputElement.simulate('change', { currentTarget: { value: '0' } });
      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(input.instance().state).toEqual({ value: undefined, active: false });

      inputElement.simulate('blur');
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(input.instance().state).toEqual({ value: undefined, active: false });
    });

    it('should render with defaultValue prop', () => {
      const input = shallow(
        <TextArea
          defaultValue="0"
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-not-empty')).toBe(true);
    });

    it('should render with empty prop', () => {
      const input = shallow(
        <TextArea
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-empty')).toBe(true);
    });

    it('should render with className prop', () => {
      const input = shallow(
        <TextArea
          className="TextArea__test"
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('TextArea__test')).toBe(true);
    });

    it('should render with input props', () => {
      const input = shallow(
        <TextArea
          inputProps={{
            'data-test': true
          }}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.find('.TextArea__input').prop('data-test')).toBe(true);
    });

    it('should render with input ref prop', () => {
      const input = shallow(
        <TextArea
          inputRef={() => {}}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.instance().props.inputRef).not.toBe(undefined);
    });

    it('shouldn\'t render with input ref prop', () => {
      const input = shallow(
        <TextArea
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.instance().props.inputRef).toBe(undefined);
    });
  });

  describe('default input', () => {
    describe('init state and props', () => {
      it('should render with initial state', () => {
        const input = shallow(
          <TextArea
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = input.find('.TextArea__input');
        expect(inputElement.prop('name')).toBe('name');
        expect(inputElement.prop('id')).toBe('name');
        expect(inputElement.prop('value')).toBe(undefined);
      });

      it('should render with disabled prop', () => {
        const input = shallow(
          <TextArea
            disabled
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = input.find('.TextArea__input');
        expect(inputElement.prop('disabled')).toBe(true);
      });

      it('should render with tabIndex prop', () => {
        const input = shallow(
          <TextArea
            name="name"
            placeholder="placeholder"
            tabIndex="-10"
          />
        );
        const inputElement = input.find('.TextArea__input');
        expect(inputElement.prop('tabIndex')).toBe('-10');
      });

      it('should render with value type number', () => {
        const input = shallow(
          <TextArea
            name="name"
            placeholder="placeholder"
            value={1}
          />
        );
        const inputElement = input.find('.TextArea__input');
        expect(inputElement.prop('value')).toEqual(1);
      });

      it('should render with value type string', () => {
        const input = shallow(
          <TextArea
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const inputElement = input.find('.TextArea__input');
        expect(inputElement.prop('value')).toBe('test');
      });
    });

    describe('events', () => {
      it('should handle onKeyPress, onKeyDown, onKeyUp', () => {
        const onKeyPressSpy = jest.fn();
        const onKeyDownSpy = jest.fn();
        const onKeyUpSpy = jest.fn();
        const input = shallow(
          <TextArea
            onKeyPress={onKeyPressSpy}
            onKeyDown={onKeyDownSpy}
            onKeyUp={onKeyUpSpy}
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = input.find('.TextArea__input');

        inputElement.simulate('keypress', { currentTarget: { value: 'test' } });
        expect(onKeyPressSpy).toHaveBeenCalledTimes(1);
        expect(onKeyPressSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test' } }, 'test');

        inputElement.simulate('keydown', { currentTarget: { value: 'test' } });
        expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
        expect(onKeyDownSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test' } }, 'test');

        inputElement.simulate('keyup', { currentTarget: { value: 'test' } });
        expect(onKeyUpSpy).toHaveBeenCalledTimes(1);
        expect(onKeyUpSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test' } }, 'test');
      });

      it('shouldn\'t handle onKeyPress, onKeyDown, onKeyUp when disabled', () => {
        const onKeyPressSpy = jest.fn();
        const onKeyDownSpy = jest.fn();
        const onKeyUpSpy = jest.fn();
        const input = shallow(
          <TextArea
            disabled
            onKeyPress={onKeyPressSpy}
            onKeyDown={onKeyDownSpy}
            onKeyUp={onKeyUpSpy}
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = input.find('.TextArea__input');

        inputElement.simulate('keypress', { currentTarget: { value: 'test' } });
        expect(onKeyPressSpy).not.toHaveBeenCalled();

        inputElement.simulate('keydown', { currentTarget: { value: 'test' } });
        expect(onKeyDownSpy).not.toHaveBeenCalled();

        inputElement.simulate('keyup', { currentTarget: { value: 'test' } });
        expect(onKeyUpSpy).not.toHaveBeenCalled();
      });
    });

    describe('uncontrolled', () => {
      it('should render with initial state', () => {
        const input = shallow(
          <TextArea
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = input.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.active).toBe(false);
      });

      it('should render with defaultValue initial state', () => {
        const input = shallow(
          <TextArea
            defaultValue="test"
            name="name"
            placeholder="placeholder"
          />
        );
        const instance = input.instance();
        const state = instance.state;

        expect(instance.isControlled).toBe(false);
        expect(state.value).toBe('test');
        expect(state.active).toBe(false);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const input = shallow(
          <TextArea
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = input.find('.TextArea__input');

        inputElement.simulate('focus', { currentTarget: { value: undefined } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { value: undefined } }, undefined);
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(input.instance().state).toEqual({ value: undefined, active: true });

        inputElement.simulate('change', { currentTarget: { value: 'test' } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test' } }, 'test');
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(input.instance().state).toEqual({ value: 'test', active: true });

        inputElement.simulate('blur', { currentTarget: { value: 'test' } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test' } }, 'test');
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(input.instance().state).toEqual({ value: 'test', active: false });
      });
    });

    describe('controlled', () => {
      it('should render with initial state', () => {
        const input = shallow(
          <TextArea
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const instance = input.instance();
        const state = instance.state;

        const inputElement = input.find('.TextArea__input');

        expect(inputElement.prop('value')).toBe('test');
        expect(instance.isControlled).toBe(true);
        expect(state.value).toBe(undefined);
        expect(state.active).toBe(undefined);
      });

      it('should handle onFocus, onChange, onBlur', () => {
        const onBlurSpy = jest.fn();
        const onChangeSpy = jest.fn();
        const onFocusSpy = jest.fn();
        const input = shallow(
          <TextArea
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );

        const inputElement = input.find('.TextArea__input');

        inputElement.simulate('focus', { currentTarget: { value: undefined } });
        expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { value: undefined } }, undefined);
        expect(onFocusSpy).toHaveBeenCalledTimes(1);
        expect(input.instance().state).toEqual({ });

        inputElement.simulate('change', { currentTarget: { value: 'test2' } });
        expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test2' } }, 'test2');
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(input.instance().state).toEqual({});

        inputElement.simulate('blur', { currentTarget: { value: 'test2' } });
        expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { value: 'test2' } }, 'test2');
        expect(onBlurSpy).toHaveBeenCalledTimes(1);
        expect(input.instance().state).toEqual({});
      });
    });
  });
});
