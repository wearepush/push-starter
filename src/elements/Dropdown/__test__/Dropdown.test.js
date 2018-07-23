/* eslint-disable prefer-destructuring */
import ReactDOM from 'react-dom';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Dropdown from '../Dropdown.js';

const Button = () => (<span>button</span>);
const menuList = [1, 2, 3];

describe('Dropdown', () => {
  describe('default props', () => {
    it('should render dropdown', () => {
      const dropdown = shallow(
        <Dropdown
          button={<Button />}
        />
      );
      expect(dropdown.find('.Dropdown__button').length).toEqual(1);
      expect(dropdown.find(Button).length).toEqual(1);
      expect(dropdown.prop('dropPosition')).toEqual(undefined);
      expect(dropdown.prop('isOpen')).toEqual(undefined);
      expect(dropdown.prop('buttonClassName')).toEqual(undefined);
    });
  });

  describe('render dropdown menu', () => {
    it('should render dropdown menu after click', () => {
      const dropdown = mount(
        <Dropdown
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Button).simulate('click');
      expect(dropdown.find('.dropdown__menu').length).toEqual(1);
      dropdown.unmount();
    });
  });

  describe('render dropdown menu with unique classNames', () => {
    it('should set up unique classes', () => {
      const dropdown = mount(
        <Dropdown
          className='drop'
          dropMenuClassName='my-menu-classname'
          buttonClassName='my-button-classname'
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Button).simulate('click');
      expect(dropdown.find(Button).hasClass('my-button-classname'));
      expect(dropdown.find('.dropdown__menu').hasClass('my-menu-classname'));
      expect(dropdown.hasClass('drop'));
      dropdown.unmount();
    });
  });

  describe('dropdown menu is open', () => {
    it('should render dropdown menu when component have isOpen prop', () => {
      const dropdown = mount(
        <Dropdown
          isOpen
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      expect(dropdown.find('.dropdown__menu').length).toEqual(1);
      dropdown.unmount();
    });

  });

  describe('close dropdown menu', () => {
    it('should close dropdown menu when clicking outside component', () => {

      const dropdown = mount(
        <Dropdown
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );

      dropdown.find(Button).simulate('click');
      expect(dropdown.find('.dropdown__menu').length).toEqual(1);

      document.body.addEventListener('click', () => { });
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, true);
      document.body.dispatchEvent(evt)

      dropdown.update();
      expect(dropdown.find('.dropdown__menu').length).toEqual(0);
      dropdown.unmount();
    });
  });

  describe('close dropdown menu selfclosed component', () => {
    it('should close dropdown menu when clicking on list element', () => {
      const dropdown = mount(
        <Dropdown
          isSelfClosed
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span className='menu-item' key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Button).simulate('click');
      expect(dropdown.find('.dropdown__menu').length).toEqual(1);
      const listElem = dropdown.find('.menu-item').last();
      listElem.simulate('click');
      dropdown.update();
      expect(dropdown.find('.dropdown__menu').length).toEqual(0);
      dropdown.unmount();
    });
  });

  describe('render default button', () => {
    it('should render default button when setup "string" in button prop', () => {
      const dropdown = mount(
        <Dropdown
          button='btn'
        >
          {
            menuList.map((el, i) => <span className='menu-item' key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      expect(dropdown.find('div.Dropdown__default_button').length).toEqual(1);
      dropdown.unmount();
    });
  });


  describe('should be controlled component', () => {
    it('should be controlled component if parent do setState', () => {
      const dropdown = shallow(
        <Dropdown
          button='btn'
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span className='menu-item' key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      
      dropdown.setProps({test: true});
      dropdown.update();
      expect(dropdown.state().isOpen).toBe(undefined);
      dropdown.unmount();
    });
  });

});