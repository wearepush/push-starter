import React, { Component } from 'react';
import { any, object } from 'prop-types';
import { Field } from 'redux-form/immutable';
import RenderField from './RenderField';

export default class RenderMembers extends Component {
  static propTypes = {
    fields: any,
    meta: object,
  }

  static defaultProps = {
    fields: null,
    meta: null,
  }

  render() {
    const { fields, meta: {error, submitFailed} } = this.props;
    return (
      <div>
        <div>
          <Field
            name="email"
            type="text"
            component={RenderField}
            label="email"
          />
        </div>
        <button type="button" onClick={() => fields.push({})}>Add Member</button>
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
                name={`${member}.firstName`}
                type="text"
                component={RenderField}
                label="First Name"
              />
            </div>
          </div>
        ))}
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
}
