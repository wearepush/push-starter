const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // console.log(values);

  if (!values.members || !values.members.length) {
    errors.members = {_error: 'At least one member must be entered'};
  } else {
    const membersArrayErrors = [];
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.firstName) {
        memberErrors.firstName = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });

    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
    console.log(membersArrayErrors);
  }
  return errors;
};

export default validate;
