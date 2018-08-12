import memoize from 'lru-memoize';
import { createValidator, required, email, match } from '../../utils/validation';

const validate = createValidator({
  name: [required],
  email: [required, email],
  password: [required],
  repeat_password: [required, match('password')],
  agree: [required],
});
export default memoize(10)(validate);
