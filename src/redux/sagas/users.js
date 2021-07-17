/* eslint-disable */

import { call, put, takeEvery } from 'redux-saga/effects';
// import Api from '...';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  // try {
  //   const user = yield call(Api.fetchUser, action.payload.userId);
  //   yield put({ type: 'USER_FETCH_SUCCEEDED', user: user });
  // } catch (e) {
  //   yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  // }

  yield put({ type: 'USER_FETCH_FAILED' });
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* fetchUserSaga() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}
