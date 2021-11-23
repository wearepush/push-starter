import { object, oneOfType, array } from 'prop-types';
import { useRoutes } from 'react-router-dom';

const RootRoutes = ({ routes }) => useRoutes(routes);

RootRoutes.propTypes = {
  routes: oneOfType([array, object]).isRequired,
};

export default RootRoutes;
