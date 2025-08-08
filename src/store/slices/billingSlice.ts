import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from '../../api/mockApi';

export interface ServiceCost {
  id: number;
  serviceName: string;
  cost: number;
  description: string;
}

export interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxId: string;
}

export interface Invoice {
  id: string;
  appointmentId: number;
  appointmentData: Omit<Appointment, 'notes'>;
  servicesCosts: ServiceCost[];
  clinicInfo: ClinicInfo;
  totalAmount: number;
  taxAmount: number;
  grandTotal: number;
  createdAt: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface BillingState {
  currentInvoice: Invoice | null;
  invoices: Invoice[];
  servicesCosts: ServiceCost[];
  clinicInfo: ClinicInfo;
  isLoading: boolean;
  error: string | null;
}

const mockServicesCosts: ServiceCost[] = [
  { id: 1, serviceName: 'General Consultation', cost: 150, description: 'Standard consultation with physician' },
  { id: 2, serviceName: 'Cardiology Consultation', cost: 300, description: 'Specialized cardiology consultation' },
  { id: 3, serviceName: 'Dental Cleaning', cost: 120, description: 'Professional dental cleaning service' },
  { id: 4, serviceName: 'X-Ray', cost: 80, description: 'Digital X-ray imaging' },
  { id: 5, serviceName: 'Blood Test', cost: 60, description: 'Complete blood panel analysis' },
  { id: 6, serviceName: 'Physical Therapy', cost: 90, description: 'Physical therapy session' },
  { id: 7, serviceName: 'Dermatology Consultation', cost: 200, description: 'Dermatological examination and consultation' },
  { id: 8, serviceName: 'Ultrasound', cost: 250, description: 'Ultrasound imaging and diagnosis' },
];

const mockClinicInfo: ClinicInfo = {
  name: 'Advanced Medical Specialty Clinic',
  address: '123 Health Avenue, Medical District, City, State 12345',
  phone: '+1 (555) 123-4567',
  email: 'billing@amsc.com',
  taxId: 'TX-123456789',
};

const initialState: BillingState = {
  currentInvoice: null,
  invoices: [],
  servicesCosts: mockServicesCosts,
  clinicInfo: mockClinicInfo,
  isLoading: false,
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    // Generate invoice
    generateInvoiceRequest: (state, action: PayloadAction<Appointment>) => {
      state.isLoading = true;
      state.error = null;
    },
    generateInvoiceSuccess: (state, action: PayloadAction<Invoice>) => {
      state.isLoading = false;
      state.currentInvoice = action.payload;
      state.invoices.push(action.payload);
      state.error = null;
    },
    generateInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Get service cost
    getServiceCostRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    getServiceCostSuccess: (state, action: PayloadAction<ServiceCost>) => {
      state.isLoading = false;
      state.error = null;
    },
    getServiceCostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update invoice status
    updateInvoiceStatus: (state, action: PayloadAction<{ invoiceId: string; status: Invoice['status'] }>) => {
      const { invoiceId, status } = action.payload;
      const invoice = state.invoices.find(inv => inv.id === invoiceId);
      if (invoice) {
        invoice.status = status;
      }
      if (state.currentInvoice?.id === invoiceId) {
        state.currentInvoice.status = status;
      }
    },

    // Clear current invoice
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  generateInvoiceRequest,
  generateInvoiceSuccess,
  generateInvoiceFailure,
  getServiceCostRequest,
  getServiceCostSuccess,
  getServiceCostFailure,
  updateInvoiceStatus,
  clearCurrentInvoice,
  clearError,
} = billingSlice.actions;

export default billingSlice.reducer;