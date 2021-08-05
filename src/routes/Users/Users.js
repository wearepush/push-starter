import React, { Component } from 'react';
import { array, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { HelmetWrapper } from '../../elements';
import { getUsersLoaded, getUsersLoading, getUsersRecords } from '../../redux/reducers/users/usersSelectors';
import { clearUsers, loadUsers } from '../../redux/reducers/users/users';

const mapStateToProps = (state) => ({
  loaded: getUsersLoaded(state),
  loading: getUsersLoading(state),
  users: getUsersRecords(state),
});

const mapDispatchToProps = {
  clearUsers,
  loadUsers,
};

class Users extends Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.loadUsers();
    }
    // TODO: TEMP DATA TO SET INIT STATE FROM COOKIE
    // DO NOT FORGET TO CLEANUP createSSR.js
    Cookies.set('testData', JSON.stringify({ name: 'initial data from cookie' }));
  }

  componentWillUnmount() {
    this.props.clearUsers();
  }

  render() {
    const { loaded, loading, users } = this.props;
    return (
      <div>
        <HelmetWrapper title="Users" description="Sign In" />
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

async function fetchData(store) {
  store.dispatch(loadUsers());
  store.dispatch(store.stopSaga());
  await store.runSaga.toPromise();
}

Users.fetchData = fetchData;

Users.propTypes = {
  clearUsers: func.isRequired,
  loaded: bool.isRequired,
  loading: bool.isRequired,
  loadUsers: func.isRequired,
  users: array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
