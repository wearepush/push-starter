import React, { PureComponent } from 'react';
import { array, bool, func, number, object, oneOfType, node, string } from 'prop-types';
import cx from 'classnames';
import styles from './Checkbox.scss';

export default class Checkbox extends PureComponent {
  isControlled = null;

  static propTypes = {
    /**
    * If `true`, the component is active.
    */
    active: bool,
    /**
    * If `true`, the component has custom render.
    */
    custom: bool,
    /**
    * If `true`, the component is checked.
    */
    checked: oneOfType([bool, string]),
    /**
    * The icon to display when the component is checked.
    */
    checkedIcon: node,
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
    defaultChecked: bool,
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
    * The icon to display when the component is unchecked.
    */
    unCheckedIcon: node,
    /**
    * The value of the component.
    */
    value: oneOfType([
      array,
      bool,
      object,
      number,
      string,
    ]),
  };

  static defaultProps = {
    active: false,
    custom: false,
    checked: null,
    checkedIcon: null,
    className: '',
    disabled: false,
    defaultChecked: false,
    inputProps: null,
    inputRef: undefined,
    invalid: false,
    id: '',
    onBlur: undefined,
    onChange: undefined,
    onFocus: undefined,
    tabIndex: null,
    unCheckedIcon: null,
    value: undefined,
  };

  constructor(props, context) {
    super(props, context);

    this.isControlled = props.checked != null;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.checked = props.defaultChecked !== undefined ? props.defaultChecked : false;
      this.state.active = props.active;
    }

    this.id = this.props.id || this.props.name;
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.isEventChecked = this.isEventChecked.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderCustom = this.renderCustom.bind(this);
  }

  state = {};

  onBlur(event) {
    if (this.props.disabled) {
      return false;
    }
    const checked = this.isEventChecked(event);
    if (!this.isControlled) {
      this.setState({ active: false });
    }
    this.props.onBlur && this.props.onBlur(event, checked);
    return true;
  }

  onChange(event) {
    if (this.props.disabled) {
      return false;
    }
    const checked = this.isEventChecked(event);
    if (!this.isControlled) {
      this.setState({ checked });
    }
    this.props.onChange && this.props.onChange(event, checked);
    return true;
  }

  onFocus(event) {
    if (this.props.disabled) {
      return false;
    }
    if (!this.isControlled) {
      this.setState({ active: true });
    }
    const checked = this.isEventChecked(event);
    this.props.onFocus && this.props.onFocus(event, checked);
    return true;
  }

  onKeyDown(event) {
    if (event.keyCode === 13) { // enter
      this.onChange(event);
    }
  }

  isChecked() {
    return this.isControlled ? this.props.checked : this.state.checked;
  }

  isActive() {
    return this.isControlled ? this.props.active : this.state.active;
  }

  isEventChecked(event) {
    if (!this.props.custom) {
      return event.currentTarget.checked;
    } else if (event.currentTarget.getAttribute('aria-checked') === 'false') {
      return true;
    }
    return false;
  }

  renderPlaceholder() {
    return (
      <span className={styles.Checkbox__placeholder}>
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

    const checked = this.isChecked();
    const active = this.isActive();

    return (
      <label
        htmlFor={this.id}
      >
        <input
          {...inputProps}
          checked={checked}
          className={styles.Checkbox__input}
          disabled={disabled}
          id={this.id}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          ref={inputRef}
          name={name}
          tabIndex={active ? -1 : tabIndex || 0}
          type="checkbox"
          value={value}
        />
        {this.renderPlaceholder()}
      </label>
    );
  }

  renderCustom() {
    const {
      checkedIcon,
      disabled,
      inputProps,
      inputRef,
      name,
      tabIndex,
      unCheckedIcon,
      value,
    } = this.props;

    const checked = this.isChecked();
    const active = this.isActive();

    return (
      <label
        htmlFor={this.id}
      >
        <div
          {...inputProps}
          aria-checked={checked}
          className={styles.Checkbox__input}
          disabled={disabled}
          id={this.id}
          role="checkbox"
          onBlur={this.onBlur}
          onClick={this.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          ref={inputRef}
          name={name}
          tabIndex={active ? -1 : tabIndex || 0}
          value={value}
        >
          {checkedIcon && unCheckedIcon ?
            (
              <div
                className={
                  cx(styles.Checkbox__icon, {
                    'is-custom-icon': true,
                    'is-checked': checked,
                    'is-unchecked': !checked,
                    'is-disabled': disabled,
                  })
                }
              >
                {checked ?
                  checkedIcon
                  :
                  unCheckedIcon
                }
              </div>
            )
            :
            (
              <div
                className={
                  cx(styles.Checkbox__icon, {
                    'is-default-icon': true,
                    'is-checked': checked,
                    'is-unchecked': !checked,
                    'is-disabled': disabled,
                  })
                }
              />
            )
          }
          {this.renderPlaceholder()}
        </div>
      </label>
    );
  }

  render() {
    const {
      custom,
      className: classNameProp,
      disabled,
      invalid,
    } = this.props;

    const checked = this.isChecked();
    const active = this.isActive();

    const className = cx(styles.Checkbox, {
      [classNameProp]: !!classNameProp,
      [styles[classNameProp]]: !!styles[classNameProp] && !!classNameProp,
      'is-active': active,
      'is-checked': checked,
      'is-disabled': disabled,
      'is-invalid': invalid,
      'is-unchecked': !checked,
    });

    return (
      <div className={className}>
        {!custom ?
          this.renderDefault()
          :
          this.renderCustom()
        }
      </div>
    );
  }
}
