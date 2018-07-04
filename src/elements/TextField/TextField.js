/* eslint-disable */

import React, { PureComponent } from 'react';
import { bool, func, number, object, oneOfType, oneOf, string } from 'prop-types';
import cx from 'classnames';
import styles from './TextField.scss';

export default class TextField extends PureComponent {
  static propTypes = {
    /**
    * If `true`, the component is active.
    */
    active: bool,
    /**
    * @ignore
    */
    className: string,
    /**
    * If `true`, the switch will be disabled.
    */
    disabled: bool,
    /**
    * @ignore
    */
    defaultValue: oneOfType([
      number,
      string,
    ]),
    /**
    * Properties applied to the `input` element.
    */
    inputProps: object,
    /**
    * Use that property to pass a ref callback to the native input component.
    */
    inputRef: func,
    /**
    * If `true`, the component is invalid.
    */
    invalid: bool,
    /**
    * The id of the `input` element.
    */
    id: string,
    /**
    * @ignore
    */
    onBlur: func,
    /**
    * Callback fired when the state is changed.
    *
    * @param {object} event The event source of the callback.
    * You can pull out the new value by accessing `event.currentTarget.value`.
    * @param {string} value The `value` of the input
    */
    onChange: func,
    /**
    * @ignore
    */
    onFocus: func,
    /**
    * @ignore
    */
    onKeyPress: func,
    /**
    * @ignore
    */
    onKeyDown: func,
    /**
    * @ignore
    */
    onKeyUp: func,
    /**
    * The name of the `input` element.
    */
    name: string.isRequired,
    /**
    * The placeholder of the component.
    */
    placeholder: string,
    /**
    * @ignore
    */
    tabIndex: oneOfType([
      number,
      string,
    ]),
    /**
    * The type of the input.
    */
    type: oneOf([
      'date',
      'email',
      'number',
      'password',
      'text',
    ]),
    /**
    * The value of the component.
    */
    value: oneOfType([
      number,
      string,
    ]),
  };

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    defaultValue: undefined,
    inputProps: null,
    inputRef: undefined,
    invalid: false,
    id: '',
    onBlur: undefined,
    onChange: undefined,
    onFocus: undefined,
    onKeyPress: undefined,
    onKeyDown: undefined,
    onKeyUp: undefined,
    placeholder: '',
    tabIndex: null,
    type: 'text',
    value: undefined,
  };

  constructor(props, context) {
    super(props, context);

    this.isControlled = props.value != null;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.value = props.defaultValue !== undefined ? props.defaultValue : undefined;
      this.state.active = props.active;
    }

    this.id = this.props.id || this.props.name;
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
  }

  state = {};

  onBlur(event) {
    if (this.props.disabled) {
      return false;
    }
    const value = this.isEventValue(event);
    if (!this.isControlled) {
      this.setState({ active: false });
    }
    this.props.onBlur && this.props.onBlur(event, value);
    return true;
  }

  onChange(event) {
    if (this.props.disabled) {
      return false;
    }
    const value = this.isEventValue(event);
    if (!this.isControlled) {
      if (this.props.type === 'number' && Number.isNaN(value)) {
        return false;
      }
      this.setState({ value });
    }
    this.props.onChange && this.props.onChange(event, value);
    return true;
  }

  onFocus(event) {
    if (this.props.disabled) {
      return false;
    }
    if (!this.isControlled) {
      this.setState({ active: true });
    }
    const value = this.isEventValue(event);
    this.props.onFocus && this.props.onFocus(event, value);
    return true;
  }

  onKeyPress(event) {
    if (this.props.disabled) {
      return false;
    }
    const value = this.isEventValue(event);
    this.props.onKeyPress && this.props.onKeyPress(event, value);
    return true;
  }

  onKeyDown(event) {
    if (this.props.disabled) {
      return false;
    }
    const value = this.isEventValue(event);
    if (this.props.type === 'number' && event.keyCode >= 65 && event.keyCode <= 90) {
      event.preventDefault();
      this.setState({ value });
      return false;
    }
    this.props.onKeyDown && this.props.onKeyDown(event, value);
    return true;
  }

  onKeyUp(event) {
    if (this.props.disabled) {
      return false;
    }
    const value = this.isEventValue(event);
    this.props.onKeyUp && this.props.onKeyUp(event, value);
    return true;
  }

  isControlled = null;

  isEmpty() {
    if (this.props.type === 'number') {
      return this.isControlled ?
        this.props.value !== 0 && !this.props.value
        :
        this.state.value !== 0 && !this.state.value;
    }
    return this.isControlled ? !this.props.value : !this.state.value;
  }

  isActive() {
    return this.isControlled ? this.props.active : this.state.active;
  }

  isEventValue(event) {
    if (this.props.type === 'number') {
      return parseInt(event.currentTarget.value, 10);
    }
    return event.currentTarget.value;
  }

  renderDefault() {
    const {
      defaultValue,
      disabled,
      inputProps,
      inputRef,
      invalid,
      name,
      placeholder,
      tabIndex,
      type,
      value,
    } = this.props;

    const active = this.isActive();
    const empty = this.isEmpty();

    return (
      <input
        {...inputProps}
        className={
          cx(styles.TextField__input, {
            'is-active': active,
            'is-disabled': disabled,
            'is-empty': empty,
            'is-invalid': invalid,
            'is-not-empty': !empty,
          })
        }
        defaultValue={defaultValue}
        disabled={disabled}
        id={this.id}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onKeyPress={this.onKeyPress}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        tabIndex={active ? -1 : tabIndex || 0}
        type={type}
        value={value}
      />
    );
  }

  render() {
    const {
      className: classNameProp,
      disabled,
      invalid,
    } = this.props;

    const active = this.isActive();
    const empty = this.isEmpty();
    const className = cx(styles.TextField, {
      [classNameProp]: !!classNameProp,
      [styles[classNameProp]]: !!styles[classNameProp] && !!classNameProp,
      'is-active': active,
      'is-empty': empty,
      'is-disabled': disabled,
      'is-invalid': invalid,
      'is-not-empty': !empty,
    });

    return (
      <div className={className}>
        {this.renderDefault()}
      </div>
    );
  }
}
