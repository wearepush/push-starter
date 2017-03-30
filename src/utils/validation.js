import cardValidator from 'card-validator';

const isEmpty = value => value === undefined || value === null || value === ''; // eslint-disable-line
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]; // eslint-disable-line

export function email(value) { // eslint-disable-line
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) { // eslint-disable-line
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function cardNumber(value) { // eslint-disable-line
  if (!cardValidator.number(value).isValid) {
    return 'Card number is invalid';
  }
}

export function cardCVV(value) { // eslint-disable-line
  if (!cardValidator.cvv(value).isValid) {
    return 'CVV number is invalid';
  }
}

export function cardExpirationYear(value) { // eslint-disable-line
  if (!cardValidator.expirationYear(value).isValid) {
    return 'Expiration Year invalid';
  }
}

export function cardExpirationMonth(value) { // eslint-disable-line
  if (!cardValidator.expirationMonth(value).isValid) {
    return 'Expiration Month invalid';
  }
}

export function minLength(min) {
  return (value) => { // eslint-disable-line
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return (value) => { // eslint-disable-line
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) { // eslint-disable-line
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function dateRange(value = {}) { // eslint-disable-line
  if (!value.startDate && value.endDate) return 'Must be a valid start date';
  if (!value.endDate && value.startDate) return 'Must be a valid end date';
  if (!value.startDate && !value.endDate) return 'Must be a valid date range';
}

export function oneOf(enumeration) {
  return (value) => { // eslint-disable-line
    if (!~enumeration.indexOf(value)) { // eslint-disable-line
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => { // eslint-disable-line
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules, section, activate) {
  return (data = {}) => {
    data = section && data.section ? data[section] : data;
    if (activate && typeof data[activate] !== 'undefined') {
      if (!data[activate]) {
        return {};
      }
    }
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

