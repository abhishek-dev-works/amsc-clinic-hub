import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authAPI, LoginCredentials } from '../../api/mockApi';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  validateTokenRequest,
  validateTokenSuccess,
  validateTokenFailure,
} from '../slices/authSlice';

// Login saga
function* loginSaga(action: PayloadAction<LoginCredentials>) {
  try {
    const response: { data: { user: any; token: string } } = yield call(authAPI.login, action.payload);
    
    // Store token in localStorage
    localStorage.setItem('amsc_auth_token', response.data.token);
    localStorage.setItem('amsc_user_data', JSON.stringify(response.data.user));
    
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

// Logout saga
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    
    // Remove token from localStorage
    localStorage.removeItem('amsc_auth_token');
    localStorage.removeItem('amsc_user_data');
    
    yield put(logoutSuccess());
  } catch (error) {
    // Even if logout fails, clear local state
    localStorage.removeItem('amsc_auth_token');
    localStorage.removeItem('amsc_user_data');
    yield put(logoutSuccess());
  }
}

// Validate token saga
function* validateTokenSaga(action: PayloadAction<string>) {
  try {
    const response: { data: { user: any } } = yield call(authAPI.validateToken, action.payload);
    yield put(validateTokenSuccess(response.data.user));
  } catch (error) {
    // Remove invalid token
    localStorage.removeItem('amsc_auth_token');
    localStorage.removeItem('amsc_user_data');
    yield put(validateTokenFailure());
  }
}

// Watcher saga
export function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(logoutRequest.type, logoutSaga);
  yield takeEvery(validateTokenRequest.type, validateTokenSaga);
}