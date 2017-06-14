import React, { Component } from 'react';
import { object } from 'prop-types';
import { Input } from 'elements';

export default class Members extends Component {
  static propTypes = {
    fields: object,
    meta: object,
  };

  static defaultProps = {
    fields: null,
    meta: null,
  };

  render() {
    const { fields, meta: { error, submitFailed } } = this.props;
    return (
      <div>
        {submitFailed && error && <span>{error}</span>}
        {fields.map((member, index) => (
          <div key={index}>
            <div>
              <Input
                name={`${member}.email`}
                type="email"
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
