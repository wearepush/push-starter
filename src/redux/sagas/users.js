import { put, takeEvery } from 'redux-saga/effects';
import { loadUsers, loadUsersSuccess, loadUsersFailed } from '../reducers/users/users';

function* fetchUsers(action, { client }) {
  try {
    const { data } = yield client.get('/api/users');
    yield put({ type: loadUsersSuccess.type, data });
  } catch (error) {
    yield put({ type: loadUsersFailed.type, error });
  }
}

export function* fetchUsersSaga(props) {
  yield takeEvery(loadUsers.type, (...args) => fetchUsers(...args, props));
}
