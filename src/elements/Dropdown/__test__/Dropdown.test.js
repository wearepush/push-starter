/* eslint-disable prefer-destructuring */
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
      const props = dropdown.instance().props;
      expect(props.isOpen).toEqual(undefined);
      expect(props.className).toBe('');
      expect(props.classNameDefaultButton).toBe('');
      expect(props.dropPosition).toBe('bl');
      expect(props.isSelfClosed).toEqual(false);
      expect(props.tabIndex).toBe(null);
      expect(props.trigger).toBe('click');
    });
  });

  describe('uncontroled', () => {
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
      expect(dropdown.find('.Dropdown__list').length).toEqual(1);
      dropdown.unmount();
    });

    it('should set up unique classes', () => {
      const dropdown = mount(
        <Dropdown
          className="drop"
          dropListClassName="my-menu-classname"
          buttonClassName="my-button-classname"
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Button).simulate('click');
      expect(dropdown.find(Button).hasClass('my-button-classname'));
      expect(dropdown.find('.Dropdown__list').hasClass('my-menu-classname'));
      expect(dropdown.hasClass('drop'));
      dropdown.unmount();
    });

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
      expect(dropdown.find('.Dropdown__list').length).toEqual(1);
      document.body.addEventListener('click', () => { });
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', false, true);
      document.body.dispatchEvent(evt);
      dropdown.update();
      expect(dropdown.find('.Dropdown__list').length).toEqual(0);
      dropdown.unmount();
    });

    it('should close dropdown menu when clicking on list element', () => {
      const dropdown = mount(
        <Dropdown
          isSelfClosed
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span className="menu-item" key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      dropdown.find(Button).simulate('click');
      expect(dropdown.find('.Dropdown__list').length).toEqual(1);
      const listElem = dropdown.find('.menu-item').last();
      listElem.simulate('click');
      dropdown.update();
      expect(dropdown.find('.Dropdown__list').length).toEqual(0);
      dropdown.unmount();
    });
    it('should render default button when setup "string" in button prop', () => {
      const dropdown = mount(
        <Dropdown
          button="btn"
        >
          {
            menuList.map((el, i) => <span className="menu-item" key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );
      expect(dropdown.find('div.Dropdown__default_button').length).toEqual(1);
      dropdown.unmount();
    });


    it('should open onMouseEnter and close after onMouseLeave', () => {
      const dropdown = mount(
        <Dropdown
          button="btn"
          trigger="hover"
        >
          {
            menuList.map((el, i) => <span className="menu-item" key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );

      const btn = dropdown.find('.Dropdown__button');
      btn.simulate('mouseenter');
      dropdown.update();
      expect(dropdown.find('.Dropdown__list').length).toEqual(1);
      dropdown.simulate('mouseleave');
      dropdown.update();
      expect(dropdown.find('.Dropdown__list').length).toEqual(0);
      dropdown.unmount();
    });
  });

  describe('controled', () => {
    it('should be controlled component if parent do setState', () => {
      const dropdown = shallow(
        <Dropdown
          button={<Button />}
        >
          {
            menuList.map((el, i) => <span className="menu-item" key={i.toString()}>{el}</span>)
          }
        </Dropdown>
      );

      dropdown.setProps({ test: true });
      dropdown.update();
      expect(dropdown.state().isOpen).toBe(undefined);
      dropdown.unmount();
    });

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
      expect(dropdown.find('.Dropdown__list').length).toEqual(1);
      dropdown.unmount();
    });
  });
});
