import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../api/mockApi';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    // Logout actions
    logoutRequest: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Token validation
    validateTokenRequest: (state) => {
      state.isLoading = true;
    },
    validateTokenSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    validateTokenFailure: (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set token from localStorage
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  validateTokenRequest,
  validateTokenSuccess,
  validateTokenFailure,
  clearError,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;