import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from './auth/LoginPage';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './dashboard/Dashboard';
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
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Appointments Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coming in Phase 2 - Advanced appointments with MUIX DataGrid
            </Typography>
          </Box>
        );
      case 'billing':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Billing & Invoices
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coming in Phase 2 - Invoice generation and management
            </Typography>
          </Box>
        );
      case 'revenue':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Revenue Tracking
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coming in Phase 2 - Detailed revenue analytics
            </Typography>
          </Box>
        );
      case 'patients':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Patient Log
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coming in Phase 2 - Patient management system
            </Typography>
          </Box>
        );
      case 'services':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Services Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coming in Phase 2 - CRUD operations for treatments
            </Typography>
          </Box>
        );
      case 'settings':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coming in Phase 2 - Clinic profile and configuration
            </Typography>
          </Box>
        );
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