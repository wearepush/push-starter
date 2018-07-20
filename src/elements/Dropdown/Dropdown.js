import React, { Component } from 'react';
import { bool, node, string, oneOf, oneOfType, arrayOf } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

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
     * The flag for the controlled dropdown.
     * If isOpen is true the dropdown list will be open and
     * component will be controlled
     */
    isOpen: bool,
    /**
    * The node for control list's visibility.
    */
    trigger: node.isRequired,
    /**
    * The additional class name for trigger.
    */
    triggerClassName: string,
  };

  static defaultProps = {
    children: undefined,
    dropMenuClassName: '',
    dropPosition: 'bl',
    isOpen: undefined,
    triggerClassName: ''
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
    document.addEventListener('click', this.changeMenuHandler);
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
    const $target = e.target;
    const container = this.containerInstance;
    if ($target !== container && !container.current.contains($target) && this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  clickTriggerHandler = () => {
    if (this.isControled) return;
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  renderDrop = () => {
    const { isOpen } = this.state;
    const { children, dropPosition, dropMenuClassName } = this.props;
    if (!this.containerInstance || !isOpen || !children) return null;
    return (
      <div
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
    const { trigger, triggerClassName } = this.props;
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
            cx(styles.dropdown__trigger, {
              [triggerClassName]: !!triggerClassName,
            })
          }
        >
          {trigger}
        </div>
        {this.renderDrop()}
      </div>
    );
  }
}
