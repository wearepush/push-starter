import React, { Component } from 'react';
import { array, bool, func } from 'prop-types';
import { HelmetWrapper } from 'elements';
import { connect } from 'react-redux';
import { ACTIONS as usersActions, SELECTORS as usersSelectors } from 'modules';

const mapStateToProps = (state) => ({
  loaded: usersSelectors.usersLoaded(state),
  loading: usersSelectors.usersLoading(state),
  users: usersSelectors.usersRecords(state),
});

const mapDispatchToProps = {
  clearUsers: usersActions.clear,
  loadUsers: usersActions.load,
};

class Users extends Component {
  componentDidMount() {
    const { loadUsers } = this.props;
    loadUsers();
  }

  componentWillUnmount() {
    const { clearUsers } = this.props;
    clearUsers();
  }

  render() {
    const { loaded, loading, users } = this.props;
    const title = 'Users';
    const description = 'Sign In';

    return (
      <div>
        <HelmetWrapper title={title} description={description} />
        <div>This is example server page with server side rendering. Check method `fetchData`</div>
        {loading && <div>Loading...</div>}
        {loaded && (
          <div>
            {users.map((c) => (
              <div key={c.id}>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Users.fetchData = ({ dispatch }) => {
  const load = usersActions.load();
  return dispatch(load);
};

Users.propTypes = {
  clearUsers: func.isRequired,
  loaded: bool.isRequired,
  loading: bool.isRequired,
  loadUsers: func.isRequired,
  users: array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
