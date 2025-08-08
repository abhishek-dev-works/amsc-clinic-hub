import { all, fork } from 'redux-saga/effects';
import { authSaga } from './sagas/authSaga';
import { appointmentsSaga } from './sagas/appointmentsSaga';
import { billingSaga } from './sagas/billingSaga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(appointmentsSaga),
    fork(billingSaga),
  ]);
}