import React, { PureComponent } from 'react';
import { bool, func, node, number, oneOfType, oneOf, string } from 'prop-types';
import cx from 'classnames';
import styles from './Button.scss';

export default class Button extends PureComponent {
  static propTypes = {
    /**
    * Use that property to pass a ref callback to the native button component.
    */
    buttonRef: func,
    /**
    * The content of the button.
    */
    children: node.isRequired,
    /**
     * @ignore
     */
    className: string,
    /**
    * The component used for the root node.
    * Either a string to use a DOM element or a component.
    * The default value is a `button`.
    */
    component: string,
    /**
    * If `true`, the base button will be disabled.
    */
    disabled: bool,
    /**
    * If `true`, the button will take up the full width of its container.
    */
    fullWidth: bool,
    /**
    * @ignore
    */
    onBlur: func,
    /**
    * @ignore
    */
    onClick: func,
    /**
    * @ignore
    */
    onFocus: func,
    /**
    * @ignore
    */
    onKeyDown: func,
    /**
    * @ignore
    */
    onKeyUp: func,
    /**
    * @ignore
    */
    onMouseDown: func,
    /**
    * @ignore
    */
    onMouseLeave: func,
    /**
    * @ignore
    */
    onMouseUp: func,
    /**
    * @ignore
    */
    onTouchEnd: func,
    /**
    * @ignore
    */
    onTouchMove: func,
    /**
    * @ignore
    */
    onTouchStart: func,
    /**
    * @ignore
    */
    role: string,
    /**
    * @ignore
    */
    tabIndex: oneOfType([
      number,
      string
    ]),
    /**
    * The size of the button.
    */
    size: oneOf([
      'small',
      'medium',
      'large'
    ]),
    /**
    * @ignore
    */
    type: string,
  };

  static defaultProps = {
    buttonRef: undefined,
    className: '',
    component: 'button',
    disabled: false,
    fullWidth: false,
    onBlur: undefined,
    onClick: undefined,
    onFocus: undefined,
    onKeyDown: undefined,
    onKeyUp: undefined,
    onMouseDown: undefined,
    onMouseLeave: undefined,
    onMouseUp: undefined,
    onTouchEnd: undefined,
    onTouchMove: undefined,
    onTouchStart: undefined,
    role: 'button',
    size: 'medium',
    tabIndex: 0,
    type: 'button',
  };

  render() {
    const {
      buttonRef,
      children,
      className: classNameProp,
      component,
      disabled,
      fullWidth,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      role,
      size,
      tabIndex,
      type,
      ...other
    } = this.props;

    let ComponentProp = component;

    if (!ComponentProp) {
      if (other.href) {
        ComponentProp = 'a';
      } else {
        ComponentProp = 'button';
      }
    }

    const buttonProps = {};

    if (ComponentProp === 'button') {
      buttonProps.type = type || 'button';
      buttonProps.disabled = disabled;
      buttonProps.role = undefined;
    } else {
      buttonProps.role = 'button';
    }

    const className = cx(styles.Button, {
      [classNameProp]: !!classNameProp,
      [styles[classNameProp]]: !!styles[classNameProp] && !!classNameProp,
      'is-disabled': disabled,
      'is-full-width': fullWidth,
      [`is-size-${size}`]: !!size,
      'is-link': !!other.href,
    });

    return (
      <ComponentProp
        className={className}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        ref={buttonRef}
        role={role}
        tabIndex={disabled ? -1 : parseInt(tabIndex, 10)}
        {...buttonProps}
        {...other}
      >
        {children}
      </ComponentProp>
    );
  }
}
