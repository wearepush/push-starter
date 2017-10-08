/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { SignIn } from './../../components';
import * as authActions from './../../redux/modules/auth';

const mapStateToProps = state => ({
  users: state.getIn(['auth', 'users'])
});

const mapDispatchToProps = {
  fetchUsers: authActions.fetchUsers
};

class Home extends Component {
  static propTypes = {
    // fetchUsers: func.isRequired,
    users: object.isRequired
  }

  static fetchData({ dispatch }) {
    return dispatch(authActions.fetchUsers());
  }

  componentDidMount() {
    // this.props.fetchUsers();
    console.log('!!!!!');
  }

  render() {
    const title = 'Redux Starter. Home';
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
        <SignIn />
        <div>
          {
            this.props.users.map(item => (
              <div key={item.get('id')}>
                <span>{item.get('name')}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
