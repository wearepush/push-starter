/*eslint-disable */
import React, { Component } from 'react';
import Trigger from 'rc-trigger';
import { array, bool, node } from 'prop-types';
import styles from './Dropdown.scss';
import 'rc-trigger/assets/index.css';


const builtinPlacements = {
  left: {
    points: ['cr', 'cl'],
  },
  right: {
    points: ['cl', 'cr'],
  },
  top: {
    points: ['bc', 'tc'],
  },
  bottom: {
    points: ['tc', 'bc'],
  },
  topLeft: {
    points: ['bl', 'tl'],
  },
  topRight: {
    points: ['br', 'tr'],
  },
  bottomRight: {
    points: ['tr', 'br'],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
  },
};

function saveRef(name, component) {
  this[name] = component;
}

export default class Dropdown extends Component {
  static propTypes = {
    children: array.isRequired,
    isOpen: bool,
    trigger: node
  }

  static defaultProps = {
    isOpen: undefined,
    trigger: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : false
    };
    this.isControled = props.isOpen !== undefined;
    this.saveContainerRef = saveRef.bind(this, 'containerInstance');
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControled) return;
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { children, trigger } = this.props;
    const isVisible = this.isControled ? isOpen : undefined;
    return (
      <div
        ref={this.saveContainerRef}
        className={`${styles.dropdown} ${isOpen ? ' is-open' : ''}`}
      >
        <Trigger
          getPopupContainer={() => this.containerInstance}
          action={['click']}
          popupPlacement="bottom"
          builtinPlacements={builtinPlacements}
          popupClassName={styles.dropdown__menu}
          //popupVisible={isVisible}
          popup={
            <ul>
              {
                children.map((child, index) => <li key={index}>{child}</li>)
              }
            </ul>
          }
        >
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            className={styles.drppdown__trigger_wrap}
          >
            {
              trigger
            }
          </div>
        </Trigger>
      </div>
    );
  }
}
