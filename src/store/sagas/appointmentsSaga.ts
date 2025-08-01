import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { appointmentsAPI, Appointment } from '../../api/mockApi';
import {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchAppointmentRequest,
  fetchAppointmentSuccess,
  fetchAppointmentFailure,
  createAppointmentRequest,
  createAppointmentSuccess,
  createAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
} from '../slices/appointmentsSlice';

// Fetch appointments saga
function* fetchAppointmentsSaga() {
  try {
    const response: { data: Appointment[] } = yield call(appointmentsAPI.getAppointments);
    yield put(fetchAppointmentsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchAppointmentsFailure(error.message || 'Failed to fetch appointments'));
  }
}

// Fetch single appointment saga
function* fetchAppointmentSaga(action: PayloadAction<number>) {
  try {
    const response: { data: Appointment } = yield call(appointmentsAPI.getAppointment, action.payload);
    yield put(fetchAppointmentSuccess(response.data));
  } catch (error: any) {
    yield put(fetchAppointmentFailure(error.message || 'Failed to fetch appointment'));
  }
}

// Create appointment saga
function* createAppointmentSaga(action: PayloadAction<Omit<Appointment, 'id'>>) {
  try {
    const response: { data: Appointment } = yield call(appointmentsAPI.createAppointment, action.payload);
    yield put(createAppointmentSuccess(response.data));
  } catch (error: any) {
    yield put(createAppointmentFailure(error.message || 'Failed to create appointment'));
  }
}

// Update appointment saga
function* updateAppointmentSaga(action: PayloadAction<{ id: number; appointment: Partial<Appointment> }>) {
  try {
    const response: { data: Appointment } = yield call(
      appointmentsAPI.updateAppointment,
      action.payload.id,
      action.payload.appointment
    );
    yield put(updateAppointmentSuccess(response.data));
  } catch (error: any) {
    yield put(updateAppointmentFailure(error.message || 'Failed to update appointment'));
  }
}

// Delete appointment saga
function* deleteAppointmentSaga(action: PayloadAction<number>) {
  try {
    yield call(appointmentsAPI.deleteAppointment, action.payload);
    yield put(deleteAppointmentSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteAppointmentFailure(error.message || 'Failed to delete appointment'));
  }
}

// Watcher saga
export function* appointmentsSaga() {
  yield takeEvery(fetchAppointmentsRequest.type, fetchAppointmentsSaga);
  yield takeEvery(fetchAppointmentRequest.type, fetchAppointmentSaga);
  yield takeEvery(createAppointmentRequest.type, createAppointmentSaga);
  yield takeEvery(updateAppointmentRequest.type, updateAppointmentSaga);
  yield takeEvery(deleteAppointmentRequest.type, deleteAppointmentSaga);
}