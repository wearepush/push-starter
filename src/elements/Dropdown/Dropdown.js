import React, { Component } from 'react';
import { array, bool, node } from 'prop-types';
import cx from 'classnames';
import styles from './Dropdown.scss';

export default class Dropdown extends Component {
  static propTypes = {
    children: array,
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
    const container = this.containerInstance.current;
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
    const { children } = this.props;
    if (!this.containerInstance.current || !isOpen) return null;
    return (
      <ul
        className={cx(styles.dropdown__menu, {
          [styles['dropdown__menu--is-open']]: isOpen
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
