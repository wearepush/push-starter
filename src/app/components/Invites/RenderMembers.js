import React, { Component } from 'react';
import { object } from 'prop-types';
import { fromJS } from 'immutable';
import { Field } from 'redux-form/immutable';
import RenderField from './RenderField';

export default class RenderMembers extends Component {
  static propTypes = {
    fields: object,
    meta: object,
  }

  static defaultProps = {
    fields: null,
    meta: null,
  }

  constructor() {
    super();
    this.addFields = this.addFields.bind(this);
  }

  addFields() {
    const { fields } = this.props;
    if (fields.length < 10) {
      fields.push(fromJS({}));
    }
  }

  render() {
    const { fields, meta: { error, submitFailed } } = this.props;
    return (
      <div>
        {submitFailed && error && <span>{error}</span>}
        {fields.map((member, index) => (
          <div key={index}>
            <div>
              <Field
                name={`${member}.email`}
                type="text"
                component={RenderField}
                label={`email.${index}`}
              />
            </div>
            <button
              type="button"
              title="Remove Member"
              onClick={() => fields.remove(index)}
            >
              x
            </button>
          </div>
        ))}
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
}
