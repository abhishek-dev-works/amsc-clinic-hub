import { all, fork } from 'redux-saga/effects';
import { authSaga } from './sagas/authSaga';
import { appointmentsSaga } from './sagas/appointmentsSaga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(appointmentsSaga),
  ]);
}