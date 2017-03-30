// @flow
import React, { Component } from 'react';
import styles from './Button.scss';
import cx from 'classnames';
import { getCx } from 'utils/cx';

type Props = {
  children: any,
  className?: string | {},
  disabled: boolean,
  onClick: () => {},
  node: string,
  type: 'button' | 'submit'
};

export default class Button extends Component {
  static defaultProps = {
    children: null,
    disabled: false,
    onClick: () => {},
    node: 'button',
    type: 'button'
  };

  props: Props;

  render() {
    const { className, children, disabled, onClick, node: Node, type } = this.props;
    const cxClassName = getCx(className, styles);

    return (
      <Node
        type={type}
        disabled={disabled}
        className={
          cx(styles.button, {
            btn: true,
            ...cxClassName
          })
        }
        onClick={onClick}
      >
        {children}
      </Node>
    );
  }
}

