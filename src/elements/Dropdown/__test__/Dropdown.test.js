/* eslint-disable prefer-destructuring */
import ReactDOM from 'react-dom';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Dropdown from '../Dropdown.js';

const Trigger = () => (<span>trigger</span>);
const menuList = [1, 2, 3];

describe('Dropdown', () => {
  describe('default props', () => {
    it('should render dropdown', () => {
      const dropdown = shallow(
        <Dropdown
          trigger={<Trigger />}
        />
      );
      expect(dropdown.find('.dropdown__trigger').length).toEqual(1);
      expect(dropdown.find(Trigger).length).toEqual(1);
      expect(dropdown.prop('dropPosition')).toEqual(undefined);
      expect(dropdown.prop('isOpen')).toEqual(undefined);
      expect(dropdown.prop('triggerClassName')).toEqual(undefined);
    });
  });
  describe('render dropdown menu', () => {
    it('should render dropdown menu after click', () => {
      const dropdown = mount(
        <Dropdown
          trigger={<Trigger />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Trigger).simulate('click');
      expect(dropdown.find('.dropdown__menu').length).toEqual(1);
    });
  });
  describe('render dropdown menu with unique classNames', () => {
    it('should set up unique classes', () => {
      const dropdown = mount(
        <Dropdown
          dropMenuClassName='my-menu-classname'
          triggerClassName='my-trigger-classname'
          trigger={<Trigger />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Trigger).simulate('click');
      expect(dropdown.find(Trigger).hasClass('my-trigger-classname'));
      expect(dropdown.find('.dropdown__menu').hasClass('my-menu-classname'));
    });
  });
  describe('dropdown menu is open', () => {
    it('should render dropdown menu when component have isOpen prop', () => {
      const dropdown = mount(
        <Dropdown
          isOpen
          trigger={<Trigger />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      expect(dropdown.find('.dropdown__menu').length).toEqual(1);
    });
  });
  describe('close dropdown menu', () => {
    it('should close dropdown menu when clicking outside component', () => {
      const map = {}
      document.addEventListener = jest.fn((event, cb) => {
        map[event] = cb
      });
      const layout = mount(
        <div>
          <button id="outside">Outside button</button>
          <Dropdown
            trigger={<Trigger />}
          >
            {
              menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
            }
          </Dropdown>
        </div>
      );
      let outsideButton = layout.find('#outside');
      layout.find(Trigger).simulate('click');
      expect(layout.find('.dropdown__menu').length).toEqual(1);
      outsideButton.simulate('click');
      map.click({
        target: ReactDOM.findDOMNode(outsideButton.instance())
      });
      expect(layout.find('.dropdown__menu').length).toEqual(0);
    });
  });
});