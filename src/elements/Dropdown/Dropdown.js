import React, { Component } from 'react';
import { array, bool, node, string } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

export default class Dropdown extends Component {
  static propTypes = {
    children: array,
    trigger: node.isRequired,
    isOpen: bool,
    dropPosition: string
  }

  static defaultProps = {
    isOpen: undefined,
    trigger: undefined,
    children: [],
    dropPosition: 'bl' // can be -> bl, br, tl, tr
  }

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
    if ($target !== container && !container.contains($target) && this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  clickTriggerHandler = () => {
    if (this.isControled) return;
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  renderDrop = () => {
    const { isOpen } = this.state;
    const { children, dropPosition } = this.props;
    if (!this.containerInstance || !isOpen) return null;
    return (
      <ul
        className={cx(styles.dropdown__menu, {
          'is-open': isOpen,
          [`is-${dropPosition}`]: !!dropPosition
        })}
      >
        {
          children.length > 0 ?
            children.map((child, index) => <li className={styles['dropdown__menu-item']} key={index}>{child}</li>) :
            <li>No data</li>
        }
      </ul>);
  }

  render() {
    const { isOpen } = this.state;
    const { trigger } = this.props;
    return (
      <div
        ref={this.containerInstance}
        className={cx(styles.dropdown, {
          [styles['dropdown--is-open']]: isOpen
        })}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={this.clickTriggerHandler}
          onKeyDown={() => { }}
          className={styles.drppdown__trigger}
        >
          {trigger}
        </div>
        {this.renderDrop()}
      </div>
    );
  }
}
