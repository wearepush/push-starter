/* eslint-disable */
import React, { Component } from 'react';
import { bool, node, string, oneOf, oneOfType, arrayOf } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

const Trigger = ({ text }) => (<span>{text}</span>);

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
    * The node for control list's visibility.
    */
    trigger: oneOfType([
      node,
      string
    ]).isRequired,
    /**
    * The additional class name for trigger.
    */
    triggerClassName: string,
  };

  static defaultProps = {
    isOpen: undefined,
    isSelfClosed: undefined,
    children: undefined,
    triggerClassName: '',
    dropMenuClassName: '',
    dropPosition: 'bl'
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : false
    };
    this.containerInstance = React.createRef();
    this.isControled = props.isOpen !== undefined;
  }

  componentDidMount() {
    if (this.isControled) return;
    window.addEventListener('click', this.changeMenuHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControled) return;
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  componentWillUnmount() {
    if (this.isControled) return;
    window.removeEventListener('click', this.changeMenuHandler);
  }

  changeMenuHandler = (e) => {
    const { isOpen } = this.state;
    const $target = e.target;
    const container = this.containerInstance;
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
    if (!this.containerInstance || !isOpen || !children) return null;
    return (
      <div
        onClick={this.selfClosedHandler}
        className={
          cx(styles.dropdown__menu, {
            'is-open': isOpen,
            [`is-${dropPosition}`]: !!dropPosition,
            [dropMenuClassName]: !!dropMenuClassName,
          })
        }
      >
        {
          React.Children.map(children, (child, i) => <div className={styles['dropdown__menu-item']} key={i.toString()}>{child}</div>)
        }
      </div>);
  }

  render() {
    const { isOpen } = this.state;
    const { trigger: TriggerProp, triggerClassName } = this.props;
    return (
      <div
        ref={this.containerInstance}
        className={
          cx(styles.dropdown, {
            'is-open': isOpen
          })
        }
      >
        <div
          role="button"
          tabIndex={0}
          onClick={this.clickTriggerHandler}
          onKeyDown={() => { }}
          className={
            cx(styles.drppdown__trigger, {
              [triggerClassName]: !!triggerClassName,
            })
          }
        >
          {typeof TriggerProp === 'object' ?
            TriggerProp
            :
            typeof TriggerProp === 'string' ?
              <Trigger text={TriggerProp} />
              :
              null
          }
        </div>
        {this.renderDrop()}
      </div>
    );
  }
}
