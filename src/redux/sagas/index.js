import { all, fork } from 'redux-saga/effects';
import { fetchUsersSaga } from './users';

export const rootSaga = function* root(props) {
  // pass props from the strore.js
  yield all([fork(() => fetchUsersSaga(props))]);
};
