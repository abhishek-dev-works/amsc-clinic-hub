import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from '../../api/mockApi';

export interface AppointmentsState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    doctor: string;
    date: string;
    searchTerm: string;
  };
}

const initialState: AppointmentsState = {
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  error: null,
  filters: {
    status: '',
    doctor: '',
    date: '',
    searchTerm: '',
  },
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    // Fetch appointments
    fetchAppointmentsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action: PayloadAction<Appointment[]>) => {
      state.isLoading = false;
      state.appointments = action.payload;
      state.error = null;
    },
    fetchAppointmentsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetch single appointment
    fetchAppointmentRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAppointmentSuccess: (state, action: PayloadAction<Appointment>) => {
      state.isLoading = false;
      state.selectedAppointment = action.payload;
      state.error = null;
    },
    fetchAppointmentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Create appointment
    createAppointmentRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createAppointmentSuccess: (state, action: PayloadAction<Appointment>) => {
      state.isLoading = false;
      state.appointments.push(action.payload);
      state.error = null;
    },
    createAppointmentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update appointment
    updateAppointmentRequest: (state, action: PayloadAction<{ id: number; appointment: Partial<Appointment> }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateAppointmentSuccess: (state, action: PayloadAction<Appointment>) => {
      state.isLoading = false;
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
      if (state.selectedAppointment?.id === action.payload.id) {
        state.selectedAppointment = action.payload;
      }
      state.error = null;
    },
    updateAppointmentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete appointment
    deleteAppointmentRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteAppointmentSuccess: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.appointments = state.appointments.filter(apt => apt.id !== action.payload);
      if (state.selectedAppointment?.id === action.payload) {
        state.selectedAppointment = null;
      }
      state.error = null;
    },
    deleteAppointmentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Filters
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setDoctorFilter: (state, action: PayloadAction<string>) => {
      state.filters.doctor = action.payload;
    },
    setDateFilter: (state, action: PayloadAction<string>) => {
      state.filters.date = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        doctor: '',
        date: '',
        searchTerm: '',
      };
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear selected appointment
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
  },
});

export const {
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
  setStatusFilter,
  setDoctorFilter,
  setDateFilter,
  setSearchTerm,
  clearFilters,
  clearError,
  clearSelectedAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;