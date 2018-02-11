import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { clearUsers, loadUsers, getUsersRecords } from './../../redux/modules/users';

const mapStateToProps = state => ({
  records: getUsersRecords(state)
});

const mapDispatchToProps = {
  clearUsers,
  loadUsers
};

class Users extends Component {
  static propTypes = {
    clearUsers: func.isRequired,
    loadUsers: func.isRequired,
    records: object.isRequired
  }

  static fetchData({ dispatch }) {
    return dispatch(loadUsers());
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  componentWillUnmount() {
    this.props.clearUsers();
  }

  render() {
    const {
      records
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
        <div>
          {
            records.map((c) => (
              <div key={c.get('id')}>
                <span>{c.get('name')}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
