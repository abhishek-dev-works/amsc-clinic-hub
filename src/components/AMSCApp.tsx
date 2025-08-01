import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from './auth/LoginPage';
import AdminLayout from './layout/AdminLayout';
import { AMSCRouter } from './AMSCRouter';
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

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={logout}
    >
      <AMSCRouter />
    </AdminLayout>
  );
};