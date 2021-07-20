import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import { ApiClient } from '../../../helpers';

import { STATE_KEY, loadUsers, loadUsersSuccess, loadUsersFailed } from '../../reducers/users/users';
import { watchUsersFork, fetchUsersSaga } from '../users';

const client = new ApiClient();

describe(`${STATE_KEY} sagas`, () => {
  describe('watchUsersFork', () => {
    it('it should dispatch success', () => {
      testSaga(watchUsersFork, { client })
        .next()
        .takeEvery(loadUsers.type, fetchUsersSaga, { client })
        .finish()
        .isDone();
    });
  });

  describe('fetchUsersSaga', () => {
    it('it should dispatch success', () => {
      const data = { records: [{ id: 1 }] };
      return expectSaga(fetchUsersSaga, { client })
        .provide([[call(client.get, '/api/users'), { data }]])
        .put(loadUsersSuccess(data))
        .dispatch(loadUsers())
        .run();
    });
    it('it should dispatch error', () => {
      const data = { error: 'error' };
      return expectSaga(fetchUsersSaga, { client })
        .provide([[call(client.get, '/api/users'), throwError(data)]])
        .put(loadUsersFailed(data))
        .dispatch(loadUsers())
        .run();
    });
  });
});
