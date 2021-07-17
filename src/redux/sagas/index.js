/* eslint-disable */

import { all, fork } from 'redux-saga/effects';
import { fetchUserSaga } from './users';

export const rootSaga = function* root() {
  yield all([fork(fetchUserSaga)]);
};
