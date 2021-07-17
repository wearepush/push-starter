import { all, fork } from 'redux-saga/effects';
import { fetchUsersSaga } from './users';

export default function* rootSaga(props) {
  // pass props from the strore.js
  yield all([fork(() => fetchUsersSaga(props))]);
}
