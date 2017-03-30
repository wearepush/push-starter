import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import styles from './Input.scss';
import cx from 'classnames';
import { getCx } from 'utils/cx';

import { Field } from 'redux-form';

class Input extends Component {
  static propTypes = {
    autoComplete: PropTypes.bool,
    className: PropTypes.string,
    classNameInput: PropTypes.oneOf(PropTypes.string, PropTypes.object),
    classNameLabel: PropTypes.oneOf(PropTypes.string, PropTypes.object),
    classNameGroup: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
    input: PropTypes.object,
    caption: PropTypes.string,
    error_hidden: PropTypes.bool
  }

  static defaultProps = {
    autoComplete: false,
    className: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { autoComplete, className, classNameInput, classNameLabel, input, input: { name }, meta: { error, touched, active }, label, caption, error_hidden, classNameGroup, ...rest } = this.props;
    const cxClassName = getCx(classNameInput, styles);
    const cxClassNameLabel = getCx(classNameLabel, styles);
    return (
      <Form.Group className={classNameGroup}>
        <div
          className={cx(className, styles.input, { 'has-error': error && touched })}
        >
          {label &&
            <label
              className={
                cx(
                  styles.input__label,
                  {
                    [styles['input__label--is-active']]: active,
                    [styles['input__label--has-value']]: !!input.value,
                    [styles['input__label--is-error']]: error && touched
                  },
                  cxClassNameLabel
                )
              }
              htmlFor={'form-input-' + name}
            >
              {label}
            </label>
          }
          <div className={styles.input__wrapper}>
            <input
              {...rest}
              {...input}
              autoComplete={autoComplete ? 'on' : 'off'}
              className={
                cx(styles.input, {
                  'form-control': true,
                  'is-error': error && touched,
                  ...cxClassName
                })
              }
              id={'form-input-' + name}
            />
            {caption && <div className={styles.input__caprion}>{caption}</div>}
            {!error_hidden && <Form.Error message={error && touched ? error : ''} />}
          </div>

        </div>
      </Form.Group>
    );
  }
}

export default props=> <Field {...props} component={Input} />; // eslint-disable-line
