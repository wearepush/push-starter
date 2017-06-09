const validate = values => {
  const errors = {};

  const email = values.get('email');

  if (values && !email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }


  // const members = values.get('members');


  if (!values.members || !values.members.length) {
    errors.members = {_error: 'At least one member must be entered'};
  } else {
    const membersArrayErrors = [];
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.email) {
        memberErrors.email = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });
    // console.log(membersArrayErrors);
    if (membersArrayErrors.length > 0) {
      // console.log(membersArrayErrors);
      errors.members = membersArrayErrors;
    }
  }

  return errors;
};

export default validate;
