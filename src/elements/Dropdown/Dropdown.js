/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { bool, node, number, string, oneOf, oneOfType, arrayOf } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

export const DropdownTrigger = ({
  className: classNameProp,
  isOpen,
  text,
}) => {
  const className = cx(styles.Drppdown__default_button, {
    [classNameProp]: !!classNameProp,
    [styles[classNameProp]]: !!styles[classNameProp] && !!classNameProp,
    'is-open': isOpen,
  });

  return (
    <div
      className={className}
    >
      {text}
    </div>
  );
};

DropdownTrigger.propTypes = {
  className: string,
  isOpen: bool,
  text: string.isRequired,
};

DropdownTrigger.defaultProps = {
  className: '',
  isOpen: false,
};

export default class Dropdown extends Component {
  static propTypes = {
    /**
    * The childrens or a child for the dropdown list.
    */
    children: oneOfType([
      arrayOf(node),
      node
    ]),
    /**
    * @ignore
    */
    className: string,
    /**
    * The additional class name for trigger.
    */
    classNameTrigger: string,
    /**
    * The additional class name for default button.
    */
    classNameDefaultButton: string,
    /**
    * The additional class names setup list position.
    */
    dropPosition: oneOf([
      'bl',
      'br',
      'tl',
      'tr'
    ]),
    /**
     * The additional class name for dropdown list.
     */
    dropMenuClassName: string,
    /**
     * The flag for self close after clicked on menu item
     */
    isSelfClosed: bool,
    /**
     * The flag for the controlled dropdown.
     * If isOpen is true the dropdown list will be open and
     * component will be controlled
     */
    isOpen: bool,
    /**
    * @ignore
    */
    tabIndex: oneOfType([number, string]),
    /**
    * The node for control list's visibility.
    */
    trigger: oneOfType([
      node,
      string
    ]).isRequired,
  };

  static defaultProps = {
    children: undefined,
    className: '',
    classNameTrigger: '',
    dropMenuClassName: '',
    classNameDefaultButton: '',
    dropPosition: 'bl',
    isOpen: undefined,
    isSelfClosed: false,
    tabIndex: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : false
    };
    this.containerRef = React.createRef();
    this.isControled = props.isOpen !== undefined;
  }

  componentDidMount() {
    if (this.isControled) return;
    document.body.addEventListener('click', this.changeMenuHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControled) return;
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  componentWillUnmount() {
    if (this.isControled) return;
    document.removeEventListener('click', this.changeMenuHandler);
  }

  changeMenuHandler = (e) => {
    const { isOpen } = this.state;
    const $target = e.target;
    const container = this.containerRef;
    if ($target !== container && !container.current.contains($target) && isOpen) {
      this.setState({ isOpen: false });
    }
  }

  clickTriggerHandler = () => {
    if (this.isControled) return;
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  selfClosedHandler = () => {
    if (this.props.isSelfClosed && this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
  }

  renderDrop = () => {
    const { isOpen } = this.state;
    const { children, dropPosition, dropMenuClassName } = this.props;
    if (!this.containerRef || !isOpen || !children) return null;
    return (
      <div
        className={
          cx(styles.dropdown__menu, {
            'is-open': isOpen,
            [`is-${dropPosition}`]: !!dropPosition,
            [dropMenuClassName]: !!dropMenuClassName,
          })
        }
        role="list"
        onClick={this.selfClosedHandler}
      >
        {
          React.Children.map(children, (child, i) => (
            <div
              className={styles['dropdown__menu-item']}
              key={i.toString()}
              role="listitem"
            >
              {child}
            </div>
          ))
        }
      </div>);
  }

  renderTrigger = () => {
    const { trigger } = this.props;
    switch (typeof trigger) {
      case 'object':
        return trigger;
      case 'string':
        return (
          <DropdownTrigger
            className={this.props.classNameDefaultButton}
            isOpen={this.isControled ? this.props.isOpen : this.state.isOpen}
            text={trigger}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { isOpen } = this.state;
    const {
      className: classNameProp,
      tabIndex,
      classNameTrigger: classNameTriggerProp,
    } = this.props;

    const className = cx(styles.Dropdown, {
      [classNameProp]: !!classNameProp,
      [styles[classNameProp]]: !!styles[classNameProp] && !!classNameProp,
      'is-open': isOpen,
    });

    const classNameTrigger = cx(styles.Drppdown__trigger, {
      [classNameTriggerProp]: !!classNameTriggerProp,
      [styles[classNameTriggerProp]]: !!styles[classNameTriggerProp] && !!classNameTriggerProp,
      'is-open': isOpen,
    });

    return (
      <div
        ref={this.containerRef}
        className={className}
      >
        <div
          role="button"
          tabIndex={isOpen ? -1 : tabIndex || 0}
          onClick={this.clickTriggerHandler}
          className={classNameTrigger}
        >
          {this.renderTrigger()}
        </div>
        {this.renderDrop()}
      </div>
    );
  }
}
