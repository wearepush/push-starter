import memoize from 'lru-memoize';
import { createValidator, required, email } from '../../utils/validation';

const SignInFormValidation = createValidator({
  username: [required, email],
  password: [required],
  description: [required],
  gender: [required],
  remember: [required],
});
export default memoize(10)(SignInFormValidation);
