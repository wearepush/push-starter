import React, { PureComponent } from 'react';
import { bool, func, number, object, oneOfType, string } from 'prop-types';
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
    defaultValue: bool,
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
    * You can pull out the new value by accessing `event.currentTarget.checked` or `event.currentTarget.getAttribute('aria-checked')`.
    * @param {boolean} checked The `checked` value of the switch
    */
    onChange: func,
    /**
    * @ignore
    */
    onFocus: func,
    /**
    * @ignore
    */
    onKeyDown: func,
    /**
    * The name of the `input` element.
    */
    name: string.isRequired,
    /**
    * The label of the component.
    */
    placeholder: string.isRequired,
    /**
    * @ignore
    */
    tabIndex: oneOfType([number, string]),
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
    onKeyDown: undefined,
    tabIndex: null,
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
    this.onKeyDown = this.onKeyDown.bind(this);
    // this.isChecked = this.isChecked.bind(this);
    // this.isEventValue = this.isEventValue.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    // this.renderCustom = this.renderCustom.bind(this);
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

  onKeyDown(event) {
    if (this.props.disabled) {
      return false;
    }
    const value = this.isEventValue(event);
    this.props.onKeyDown && this.props.onKeyDown(event, value);
    return true;
  }

  isControlled = null;

  // isChecked() {
  //   return this.isControlled ? this.props.checked : this.state.checked;
  // }

  isActive() {
    return this.isControlled ? this.props.active : this.state.active;
  }

  isEventValue(event) { // eslint-disable-line
    // if (!this.props.custom) {
    //   return event.currentTarget.checked;
    // } else if (event.currentTarget.getAttribute('aria-checked') === 'false') {
    //   return true;
    // }
    // return false;
    return event.currentTarget.value;
  }

  renderPlaceholder() {
    return (
      <span className={styles.TextField__placeholder}>
        {this.props.placeholder}
      </span>
    );
  }

  renderDefault() {
    const {
      disabled,
      inputProps,
      inputRef,
      name,
      tabIndex,
      value,
    } = this.props;

    const active = this.isActive();

    return (
      <label
        htmlFor={this.id}
      >
        {this.renderPlaceholder()}
        <input
          {...inputProps}
          className={styles.TextField__input}
          disabled={disabled}
          id={this.id}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          ref={inputRef}
          name={name}
          tabIndex={active ? -1 : tabIndex || 0}
          type="text"
          value={value}
        />
      </label>
    );
  }

  render() {
    const {
      className: classNameProp,
      disabled,
      invalid,
    } = this.props;

    // const empty = this.isEmpty();
    const active = this.isActive();

    const className = cx(styles.Checkbox, {
      [styles[classNameProp]]: !!classNameProp,
      'is-active': active,
      // 'is-empty': empty,
      'is-disabled': disabled,
      'is-invalid': invalid,
      // 'is-unchecked': !checked,
    });

    return (
      <div className={className}>
        {this.renderDefault()}
      </div>
    );
  }
}
