import memoize from 'lru-memoize';
import { createValidator, required, match } from '../../utils/validation';

const validate = createValidator({
  password: [required],
  repeat_password: [required, match('password')],
});
export default memoize(10)(validate);
