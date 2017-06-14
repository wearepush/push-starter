export default {
  path: 'invite',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Invite'));
    });
  },
};
