import { call, put, takeEvery, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from '../../api/mockApi';
import { RootState } from '../index';
import {
  generateInvoiceRequest,
  generateInvoiceSuccess,
  generateInvoiceFailure,
  getServiceCostRequest,
  getServiceCostSuccess,
  getServiceCostFailure,
  ServiceCost,
  Invoice,
} from '../slices/billingSlice';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate invoice saga
function* generateInvoiceSaga(action: PayloadAction<Appointment>) {
  try {
    const appointment = action.payload;
    
    // Get billing state from store
    const billingState: ReturnType<typeof import('../slices/billingSlice').default> = yield select(
      (state: RootState) => state.billing
    );

    // Find service cost
    const serviceCost = billingState.servicesCosts.find(
      (cost: ServiceCost) => cost.serviceName === appointment.service
    );

    if (!serviceCost) {
      throw new Error(`Service cost not found for: ${appointment.service}`);
    }

    // Simulate API delay
    yield call(delay, 1000);

    // Generate invoice ID
    const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Calculate amounts
    const subtotal = serviceCost.cost;
    const taxRate = 0.08; // 8% tax
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;

    // Create invoice
    const invoice: Invoice = {
      id: invoiceId,
      appointmentId: appointment.id,
      appointmentData: {
        id: appointment.id,
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,
        patientPhone: appointment.patientPhone,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        service: appointment.service,
        doctor: appointment.doctor,
        status: appointment.status,
        duration: appointment.duration,
      },
      servicesCosts: [serviceCost],
      clinicInfo: billingState.clinicInfo,
      totalAmount: subtotal,
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      createdAt: new Date().toISOString(),
      status: 'draft',
    };

    yield put(generateInvoiceSuccess(invoice));
  } catch (error: any) {
    yield put(generateInvoiceFailure(error.message || 'Failed to generate invoice'));
  }
}

// Get service cost saga
function* getServiceCostSaga(action: PayloadAction<string>) {
  try {
    const serviceName = action.payload;
    
    // Get billing state from store
    const billingState: ReturnType<typeof import('../slices/billingSlice').default> = yield select(
      (state: RootState) => state.billing
    );

    // Find service cost
    const serviceCost = billingState.servicesCosts.find(
      (cost: ServiceCost) => cost.serviceName === serviceName
    );

    if (!serviceCost) {
      throw new Error(`Service cost not found for: ${serviceName}`);
    }

    // Simulate API delay
    yield call(delay, 500);

    yield put(getServiceCostSuccess(serviceCost));
  } catch (error: any) {
    yield put(getServiceCostFailure(error.message || 'Failed to get service cost'));
  }
}

// Watcher saga
export function* billingSaga() {
  yield takeEvery(generateInvoiceRequest.type, generateInvoiceSaga);
  yield takeEvery(getServiceCostRequest.type, getServiceCostSaga);
}