import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import RenderField from './RenderField';

export default class RenderMembers extends PureComponent {
  static propTypes = {
    fields: object,
    meta: object,
  }

  static defaultProps = {
    fields: null,
    meta: null,
  }

  componentDidMount() {
    const { fields } = this.props;
    fields.push(fromJS({}));
    fields.push(fromJS({}));
    fields.push(fromJS({}));
  }

  render() {
    const { fields, meta: { error, submitFailed } } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={() => fields.push(fromJS({}))}
        >
          add email
        </button>
        {submitFailed && error && <span>{error}</span>}
        {fields.map((member, index) => (
          <div key={index}>
            <button
              type="button"
              title="Remove Member"
              onClick={() => fields.remove(index)}
            />
            <div>
              <Field
                name={`${member}.email`}
                type="text"
                component={RenderField}
                label="email"
              />
            </div>
          </div>
        ))}
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
}
