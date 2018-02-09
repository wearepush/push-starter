import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { clear, load, STATE_KEY as USERS_STATE_KEY } from './../../redux/modules/users';

const mapStateToProps = state => ({
  records: state.getIn([USERS_STATE_KEY, 'records'])
});

const mapDispatchToProps = {
  clear,
  load
};

class Users extends Component {
  static propTypes = {
    clear: func.isRequired,
    load: func.isRequired,
    records: object.isRequired
  }

  static fetchData({ dispatch }) {
    return dispatch(load());
  }

  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    this.props.clear();
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
