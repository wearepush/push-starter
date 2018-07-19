import React, { Component } from 'react';
import { bool, node, string, oneOf, oneOfType, arrayOf } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

export default class Dropdown extends Component {
  static propTypes = {
    trigger: node.isRequired,
    isOpen: bool,
    children: oneOfType([
      arrayOf(node),
      node
    ]),
    triggerClassName: string,
    dropMenuClassName: string,
    dropPosition: oneOf([
      'bl',
      'br',
      'tl',
      'tr'
    ]),
  };

  static defaultProps = {
    isOpen: undefined,
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
            cx(styles.drppdown__trigger, {
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
