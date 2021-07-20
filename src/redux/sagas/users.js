import { call, put, takeEvery } from 'redux-saga/effects';
import { loadUsers, loadUsersSuccess, loadUsersFailed } from '../reducers/users/users';

export function* fetchUsersSaga({ client }) {
  try {
    const { data } = yield call(client.get, '/api/users');
    yield put(loadUsersSuccess(data));
  } catch (error) {
    yield put(loadUsersFailed(error));
  }
}

export function* watchUsersFork(props) {
  yield takeEvery(loadUsers.type, fetchUsersSaga, props);
}
