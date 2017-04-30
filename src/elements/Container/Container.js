// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import { getCx } from 'utils/cx';
import styles from './Container.scss';

type Props = {
  className?: string | {},
  children: any,
};

export default class Container extends Component {
  static defaultProps = {
    className: '',
    children: null
  };

  props: Props;

  render() {
    const { children, className } = this.props;
    const cxClassName = getCx(className, styles);

    return (
      <div
        className={
          cx(styles.container, {
            ...cxClassName
          })
        }
      >
        {children}
      </div>
    );
  }
}
