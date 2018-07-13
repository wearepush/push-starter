import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { noop } from 'lodash';
import formStore from '../../../redux/__mocks__/formStore.js';
import { Button, FormButton } from '../../index.js';

let store;
beforeEach(() => {
  store = formStore;
});

const makeForm = ({
  renderSpy = noop,
  onClickSpy = noop,
}) => (
  class Form extends Component {
    render() {
      renderSpy(this.props);
      return (
        <form>
          <FormButton
            form="test"
            onClick={onClickSpy}
          >
            Remote Button
          </FormButton>
        </form>
      );
    }
  }
);

const renderForm = (Form, formState, config = {}) => {
  const Decorated = reduxForm({ form: 'testForm', ...config })(Form);
  return mount(
    <Provider store={store}>
      <Decorated />
    </Provider>
  );
};

describe('FormButton', () => {
  it('should render checkbox with initial state', () => {
    const renderSpy = jest.fn(() => {});
    const Form = makeForm({ renderSpy });
    const dom = renderForm(Form, {}, {});

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);

    expect(dom.find(Button).length).toBe(1);

    dom.unmount();
  });

  it('should handle onClick', () => {
    const renderSpy = jest.fn(() => {});
    const onClickSpy = jest.fn();
    const Form = makeForm({
      renderSpy,
      onClickSpy,
    });
    const dom = renderForm(Form, {}, {});

    const inputElement = dom.find('.Button');

    // onClick
    inputElement.simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledTimes(1);


    dom.unmount();
  });
});
