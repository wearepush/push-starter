/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { bool, node, number, string, oneOf, oneOfType, arrayOf } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

export const DropdownButton = ({
  className: classNameProp,
  isOpen,
  text,
}) => {
  const className = cx(styles.Dropdown__default_button, {
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

DropdownButton.propTypes = {
  className: string,
  isOpen: bool,
  text: string.isRequired,
};

DropdownButton.defaultProps = {
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
    * The additional class name for button.
    */
    classNameButton: string,
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
    * type of relay to open drop
    */
    trigger: oneOf([
      'hover',
      'click'
    ]),
    /**
    * The node for control list's visibility.
    */
    button: oneOfType([
      node,
      string
    ]).isRequired,
  };

  static defaultProps = {
    children: undefined,
    className: '',
    classNameButton: '',
    dropMenuClassName: '',
    classNameDefaultButton: '',
    dropPosition: 'bl',
    isOpen: undefined,
    isSelfClosed: false,
    tabIndex: null,
    trigger: 'click'
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : false
    };
    this.containerRef = React.createRef();
    this.isControled = props.isOpen !== undefined;
    this.isHoverTrigger = props.trigger === 'hover';
  }

  componentDidMount() {
    if (this.isControled || this.isHoverTrigger) return;
    document.body.addEventListener('click', this.changeMenuHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControled || this.isHoverTrigger) return;
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  componentWillUnmount() {
    if (this.isControled || this.isHoverTrigger) return;
    document.body.removeEventListener('click', this.changeMenuHandler);
  }

  changeMenuHandler = (e) => {
    const { isOpen } = this.state;
    const $target = e.target;
    const container = this.containerRef;
    if ($target !== container && container && container.current && !container.current.contains($target) && isOpen) {
      this.setState({ isOpen: false });
    }
  }

  clickButtonHandler = () => {
    if (this.isControled || this.isHoverTrigger) return;
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  hoverButtonEnterHandler = () => {
    if (this.isControled || !this.isHoverTrigger || this.state.isOpen) return;
    this.setState({
      isOpen: true
    });
  }

  hoverButtonLeaveHandler = () => {
    if (this.isControled || !this.isHoverTrigger || !this.state.isOpen) return;
    this.setState({
      isOpen: false
    });
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
          cx(styles.Dropdown__list, {
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
              className={styles.Dropdown__item}
              key={i.toString()}
              role="listitem"
            >
              {child}
            </div>
          ))
        }
      </div>);
  }

  renderButton = () => {
    const { button } = this.props;
    if (typeof button === 'object') {
      return button;
    } else {
      return (
        <DropdownButton
          className={this.props.classNameDefaultButton}
          isOpen={this.isControled ? this.props.isOpen : this.state.isOpen}
          text={button}
        />
      );
    }
  }

  render() {
    const { isOpen } = this.state;
    const {
      className: classNameProp,
      tabIndex,
      classNameButton: classNameButtonProp,
    } = this.props;

    const className = cx(styles.Dropdown, {
      [classNameProp]: !!classNameProp,
      [styles[classNameProp]]: !!styles[classNameProp] && !!classNameProp,
      'is-open': isOpen,
    });

    const classNameButton = cx(styles.Dropdown__button, {
      [classNameButtonProp]: !!classNameButtonProp,
      [styles[classNameButtonProp]]: !!styles[classNameButtonProp] && !!classNameButtonProp,
      'is-open': isOpen,
    });

    return (
      <div
        ref={this.containerRef}
        className={className}
        onMouseLeave={this.hoverButtonLeaveHandler}
      >
        <div
          role="button"
          tabIndex={isOpen ? -1 : tabIndex || 0}
          onClick={this.clickButtonHandler}
          onMouseEnter={this.hoverButtonEnterHandler}
          className={classNameButton}
        >
          {this.renderButton()}
        </div>
        {this.renderDrop()}
      </div>
    );
  }
}
