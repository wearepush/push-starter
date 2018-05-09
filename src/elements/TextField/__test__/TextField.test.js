/* eslint-disable prefer-destructuring */
import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../TextField.js';

describe('TextField', () => {
  describe('default props', () => {
    it('should render with type prop text', () => {
      const input = shallow(
        <TextField
          name="name"
          placeholder="placeholder"
        />
      );
      const inputElement = input.find('.TextField__input');
      expect(inputElement.prop('type')).toBe('text');
    });

    it('should render with type prop number', () => {
      const input = shallow(
        <TextField
          name="name"
          placeholder="placeholder"
          type="number"
        />
      );
      const inputElement = input.find('.TextField__input');
      expect(inputElement.prop('type')).toBe('number');
    });

    it('should render with type prop date', () => {
      const input = shallow(
        <TextField
          name="name"
          placeholder="placeholder"
          type="date"
        />
      );
      const inputElement = input.find('.TextField__input');
      expect(inputElement.prop('type')).toBe('date');
    });

    it('should render with type prop email', () => {
      const input = shallow(
        <TextField
          name="name"
          placeholder="placeholder"
          type="email"
        />
      );
      const inputElement = input.find('.TextField__input');
      expect(inputElement.prop('type')).toBe('email');
    });

    it('should render with type prop password', () => {
      const input = shallow(
        <TextField
          name="name"
          placeholder="placeholder"
          type="password"
        />
      );
      const inputElement = input.find('.TextField__input');
      expect(inputElement.prop('type')).toBe('password');
    });

    it('should render with active prop', () => {
      const input = shallow(
        <TextField
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
        <TextField
          invalid
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-invalid')).toBe(true);
    });

    it('should render with disabled prop', () => {
      const onBlurSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const onFocusSpy = jest.fn();
      const input = shallow(
        <TextField
          disabled
          onBlur={onBlurSpy}
          onChange={onChangeSpy}
          onFocus={onFocusSpy}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-disabled')).toBe(true);

      const inputElement = input.find('.TextField__input');

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
        <TextField
          defaultValue="0"
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-not-empty')).toBe(true);
    });

    it('should render with empty prop', () => {
      const input = shallow(
        <TextField
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('is-empty')).toBe(true);
    });

    it('should render with className prop', () => {
      const input = shallow(
        <TextField
          className="TextField__test"
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.hasClass('TextField__test')).toBe(true);
    });

    it('should render with input props', () => {
      const input = shallow(
        <TextField
          inputProps={{
            'data-test': true
          }}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.find('.TextField__input').prop('data-test')).toBe(true);
    });

    it('should render with input ref prop', () => {
      const input = shallow(
        <TextField
          inputRef={() => {}}
          name="name"
          placeholder="placeholder"
        />
      );
      expect(input.instance().props.inputRef).not.toBe(undefined);
    });

    it('shouldn\'t render with input ref prop', () => {
      const input = shallow(
        <TextField
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
          <TextField
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = input.find('.TextField__input');
        expect(inputElement.prop('name')).toBe('name');
        expect(inputElement.prop('id')).toBe('name');
        expect(inputElement.prop('value')).toBe(undefined);
        expect(inputElement.prop('type')).toBe('text');
      });

      it('should render with disabled prop', () => {
        const input = shallow(
          <TextField
            disabled
            name="name"
            placeholder="placeholder"
          />
        );
        const inputElement = input.find('.TextField__input');
        expect(inputElement.prop('disabled')).toBe(true);
      });

      it('should render with tabIndex prop', () => {
        const input = shallow(
          <TextField
            name="name"
            placeholder="placeholder"
            tabIndex="-10"
          />
        );
        const inputElement = input.find('.TextField__input');
        expect(inputElement.prop('tabIndex')).toBe('-10');
      });

      it('should render with value type number', () => {
        const input = shallow(
          <TextField
            name="name"
            placeholder="placeholder"
            value={1}
          />
        );
        const inputElement = input.find('.TextField__input');
        expect(inputElement.prop('value')).toEqual(1);
      });

      it('should render with value type string', () => {
        const input = shallow(
          <TextField
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const inputElement = input.find('.TextField__input');
        expect(inputElement.prop('value')).toBe('test');
      });
    });

    describe('uncontrolled', () => {
      it('should render with initial state', () => {
        const input = shallow(
          <TextField
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
          <TextField
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
          <TextField
            onBlur={onBlurSpy}
            onChange={onChangeSpy}
            onFocus={onFocusSpy}
            name="name"
            placeholder="placeholder"
          />
        );

        const inputElement = input.find('.TextField__input');

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
          <TextField
            name="name"
            placeholder="placeholder"
            value="test"
          />
        );
        const instance = input.instance();
        const state = instance.state;

        const inputElement = input.find('.TextField__input');

        expect(inputElement.prop('value')).toBe('test');
        expect(instance.isControlled).toBe(true);
        expect(state.value).toBe(undefined);
        expect(state.active).toBe(undefined);
      });

      // it('should handle onFocus, onChange, onBlur', () => {
      //   const onBlurSpy = jest.fn();
      //   const onChangeSpy = jest.fn();
      //   const onFocusSpy = jest.fn();
      //   const input = shallow(
      //     <TextField
      //       checked
      //       onBlur={onBlurSpy}
      //       onChange={onChangeSpy}
      //       onFocus={onFocusSpy}
      //       name="name"
      //       placeholder="placeholder"
      //     />
      //   );

      //   const inputElement = input.find('.TextField__input');

      //   inputElement.simulate('focus', { currentTarget: { checked: false } });
      //   expect(onFocusSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
      //   expect(onFocusSpy).toHaveBeenCalledTimes(1);
      //   expect(input.instance().state).toEqual({});

      //   inputElement.simulate('change', { currentTarget: { checked: false } });
      //   expect(onChangeSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
      //   expect(onChangeSpy).toHaveBeenCalledTimes(1);
      //   expect(input.instance().state).toEqual({});

      //   inputElement.simulate('blur', { currentTarget: { checked: false } });
      //   expect(onBlurSpy).toHaveBeenCalledWith({ currentTarget: { checked: false } }, false);
      //   expect(onBlurSpy).toHaveBeenCalledTimes(1);
      //   expect(input.instance().state).toEqual({});
      // });
    });
  });
});
