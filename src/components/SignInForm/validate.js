import memoize from 'lru-memoize';
import { createValidator, required, email } from '../../utils/validation';

const validate = createValidator({
  email: [required, email],
  password: [required],
});
export default memoize(10)(validate);
