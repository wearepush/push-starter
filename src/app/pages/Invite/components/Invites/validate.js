import memoize from 'lru-memoize';

const validate = (values) => {
  const errors = {};

  if (values) {
    const emails = values.get('emails');
    const membersArrayErrors = [];
    if (emails) {
      emails.forEach((member, memberIndex) => {
        const memberErrors = {};
        const email = member.get('email');
        if (!member || !email) {
          memberErrors.email = 'Required';
          membersArrayErrors[memberIndex] = memberErrors;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          memberErrors.email = 'Invalid email address';
          membersArrayErrors[memberIndex] = memberErrors;
        }
      });
      if (membersArrayErrors.length > 0) {
        errors.emails = membersArrayErrors;
      }
    }
  }

  return errors;
};

export default memoize(10)(validate);
