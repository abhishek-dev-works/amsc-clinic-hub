import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from './auth/LoginPage';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './dashboard/Dashboard';
import AppointmentsManagement from './appointments/AppointmentsManagement';
import PatientLog from './patients/PatientLog';
import ServicesManagement from './services/ServicesManagement';
import RevenueTracking from './revenue/RevenueTracking';
import BillingInvoices from './billing/BillingInvoices';
import Settings from './settings/Settings';
import { Box, CircularProgress, Typography } from '@mui/material';

export const AMSCApp: React.FC = () => {
  const { user, isLoading, error, login, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Loading state
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Loading AMSC Admin Portal...
        </Typography>
      </Box>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={login} 
        error={error} 
      />
    );
  }

  // Render main admin interface
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <AppointmentsManagement />;
      case 'billing':
        return <BillingInvoices />;
      case 'revenue':
        return <RevenueTracking />;
      case 'patients':
        return <PatientLog />;
      case 'services':
        return <ServicesManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={logout}
    >
      {renderContent()}
    </AdminLayout>
  );
};