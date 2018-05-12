import React, { PureComponent } from 'react';
import { bool, func, node, number, oneOfType, string } from 'prop-types';
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
    component: oneOfType([
      string,
      func
    ]),
    /**
    * If `true`, the base button will be disabled.
    */
    disabled: bool,
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
    * @ignore
    */
    type: string,
  };

  static defaultProps = {
    buttonRef: undefined,
    className: '',
    component: 'button',
    disabled: false,
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
    } else {
      buttonProps.role = 'button';
    }

    const className = cx(styles.Button, {
      [styles[classNameProp]]: !!classNameProp,
      'is-disabled': disabled,
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
        tabIndex={disabled ? '-1' : tabIndex}
        {...buttonProps}
        {...other}
      >
        {children}
      </ComponentProp>
    );
  }
}
