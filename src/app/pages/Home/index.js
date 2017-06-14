export default {
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./containers/Home'),
      });
    });
  },
};
