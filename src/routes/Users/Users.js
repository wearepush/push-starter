import React, { Component } from 'react';
import { array, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { HelmetWrapper } from '../../elements';
import { getUsersLoaded, getUsersLoading, getUsersRecords } from '../../redux/modules/users/usersSelectors';
import { clearUsers, loadUsers } from '../../redux/modules/users/users';

const mapStateToProps = (state) => ({
  loaded: getUsersLoaded(state),
  loading: getUsersLoading(state),
  users: getUsersRecords(state),
});

const mapDispatchToProps = {
  loadUsers,
  clearUsers,
};

class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  componentWillUnmount() {
    this.props.clearUsers();
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
  const load = loadUsers();
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
