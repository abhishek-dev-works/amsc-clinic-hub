import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import AppointmentsManagement from './appointments/AppointmentsManagement';
import AppointmentDetails from '../pages/AppointmentDetails';
import PatientLog from './patients/PatientLog';
import ServicesManagement from './services/ServicesManagement';
import RevenueTracking from './revenue/RevenueTracking';
import BillingInvoices from './billing/BillingInvoices';
import Settings from './settings/Settings';

export const AMSCRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<AppointmentsManagement />} />
      <Route path="/appointments/:id" element={<AppointmentDetails />} />
      <Route path="/patients" element={<PatientLog />} />
      <Route path="/services" element={<ServicesManagement />} />
      <Route path="/revenue" element={<RevenueTracking />} />
      <Route path="/billing" element={<BillingInvoices />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};