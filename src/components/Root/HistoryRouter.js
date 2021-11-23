import { object, node, string } from 'prop-types';
import { useLayoutEffect, useState, createElement } from 'react';
import { Router } from 'react-router-dom';

const HistoryRouter = ({ basename, children, store }) => {
  const history = store.createReduxHistory(store);
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);
  return createElement(Router, { // eslint-disable-line
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
  });
};

HistoryRouter.propTypes = {
  basename: string, // eslint-disable-line
  children: node.isRequired,
  store: object.isRequired,
};

export default HistoryRouter;
