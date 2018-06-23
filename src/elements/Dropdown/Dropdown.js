import React, { Component } from 'react';
import { array, bool, node } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

function saveRef(name, component) {
  this[name] = component;
}

export default class Dropdown extends Component {
  static propTypes = {
    children: array.isRequired,
    trigger: node.isRequired,
    isOpen: bool,
  }

  static defaultProps = {
    isOpen: undefined,
    trigger: undefined,
    children: []
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : false
    };
    this.isControled = props.isOpen !== undefined;
    this.saveContainerRef = saveRef.bind(this, 'containerInstance');
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
    if ($target !== this.containerInstance && !this.containerInstance.contains($target) && this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  clickTriggerHandler = () => {
    if (this.isControled) return;
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    const { children, trigger } = this.props;
    return (
      <div
        ref={this.saveContainerRef}
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
          {
            trigger
          }
        </div>
        <ul
          className={cx(styles.dropdown__menu, {
            [styles['dropdown__menu--is-open']]: isOpen
          })}
        >
          {
            children.map((child, index) => <li className={styles['dropdown__menu-item']} key={index}>{child}</li>)
          }
        </ul>
      </div>
    );
  }
}
