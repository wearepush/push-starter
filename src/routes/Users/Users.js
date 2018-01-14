import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import * as recordsActions from './../../redux/modules/records';

const branch = 'users';

const mapStateToProps = state => ({
  records: state.getIn([branch, 'records'])
});

const mapDispatchToProps = {
  clear: recordsActions.clear,
  load: recordsActions.load
};

class Users extends Component {
  static propTypes = {
    clear: func.isRequired,
    load: func.isRequired,
    records: object.isRequired
  }

  static fetchData({ dispatch }) {
    return dispatch(recordsActions.load(branch));
  }

  componentDidMount() {
    this.props.load(branch);
  }

  componentWillUnmount() {
    this.props.clear(branch);
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
            records.map(item => (
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
