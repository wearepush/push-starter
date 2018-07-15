import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { array, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { ACTIONS as usersActions, SELECTORS as usersSelectors } from '../../redux/modules/users';

const mapStateToProps = state => ({
  loaded: usersSelectors.usersLoaded(state),
  loading: usersSelectors.usersLoading(state),
  users: usersSelectors.usersRecords(state),
});

const mapDispatchToProps = {
  clearUsers: usersActions.clear,
  loadUsers: usersActions.load,
};

class Users extends Component {
  static fetchData({ dispatch }) {
    return dispatch(usersActions.load());
  }

  static propTypes = {
    clearUsers: func.isRequired,
    loaded: bool.isRequired,
    loading: bool.isRequired,
    loadUsers: func.isRequired,
    users: array.isRequired
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  componentWillUnmount() {
    this.props.clearUsers();
  }

  render() {
    const {
      loaded,
      loading,
      users,
    } = this.props;
    const title = 'Redux Starter. Users';
    const description = 'Redux Form. Sign In';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div>This is example server page with server side rendering. Check method `fetchData`</div>
        {loading &&
          <div>Loading...</div>
        }
        {loaded && (
          <div>
            {
              users.map((c) => (
                <div key={c.id}>
                  <span>{c.name}</span>
                </div>
              ))
            }
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
