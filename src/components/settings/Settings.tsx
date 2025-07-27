import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  PersonalVideo as PersonalVideoIcon,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [clinicInfo, setClinicInfo] = useState({
    name: 'Advanced Multi Specialty Clinic',
    address: '123 Medical Center Drive, Healthcare City, HC 12345',
    phone: '+1 (555) 123-AMSC',
    email: 'info@amsc-clinic.com',
    website: 'www.amsc-clinic.com',
    license: 'MC-2024-001',
    taxId: '12-3456789',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    paymentReminders: true,
    systemAlerts: true,
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '15:00', closed: false },
    sunday: { open: '09:00', close: '15:00', closed: true },
  });

  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Admin User',
    email: 'admin@amsc-clinic.com',
    role: 'Administrator',
    phone: '+1 (555) 123-4567',
  });

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved');
  };

  const SettingSection = ({ title, icon, children }: any) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          {icon}
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ borderRadius: 2 }}
        >
          Save All Changes
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Main Settings Column */}
        <Box>
          {/* Clinic Information */}
          <SettingSection 
            title="Clinic Information" 
            icon={<BusinessIcon color="primary" />}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Clinic Name"
                value={clinicInfo.name}
                onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={clinicInfo.address}
                onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Phone"
                  value={clinicInfo.phone}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                />
                <TextField
                  label="Email"
                  value={clinicInfo.email}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                <TextField
                  label="Website"
                  value={clinicInfo.website}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, website: e.target.value })}
                />
                <TextField
                  label="License #"
                  value={clinicInfo.license}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, license: e.target.value })}
                />
                <TextField
                  label="Tax ID"
                  value={clinicInfo.taxId}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, taxId: e.target.value })}
                />
              </Box>
            </Stack>
          </SettingSection>

          {/* Business Hours */}
          <SettingSection 
            title="Business Hours" 
            icon={<PersonalVideoIcon color="primary" />}
          >
            <Stack spacing={2}>
              {Object.entries(businessHours).map(([day, hours]) => (
                <Box key={day} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ minWidth: 100, textTransform: 'capitalize' }}>
                    {day}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!hours.closed}
                        onChange={(e) => setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, closed: !e.target.checked }
                        })}
                      />
                    }
                    label="Open"
                  />
                  {!hours.closed && (
                    <>
                      <TextField
                        type="time"
                        size="small"
                        value={hours.open}
                        onChange={(e) => setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, open: e.target.value }
                        })}
                        sx={{ width: 120 }}
                      />
                      <Typography>to</Typography>
                      <TextField
                        type="time"
                        size="small"
                        value={hours.close}
                        onChange={(e) => setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, close: e.target.value }
                        })}
                        sx={{ width: 120 }}
                      />
                    </>
                  )}
                </Box>
              ))}
            </Stack>
          </SettingSection>

          {/* Notifications */}
          <SettingSection 
            title="Notification Preferences" 
            icon={<NotificationsIcon color="primary" />}
          >
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      emailNotifications: e.target.checked
                    })}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      smsNotifications: e.target.checked
                    })}
                  />
                }
                label="SMS Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.appointmentReminders}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      appointmentReminders: e.target.checked
                    })}
                  />
                }
                label="Appointment Reminders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.paymentReminders}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      paymentReminders: e.target.checked
                    })}
                  />
                }
                label="Payment Reminders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.systemAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      systemAlerts: e.target.checked
                    })}
                  />
                }
                label="System Alerts"
              />
            </Stack>
          </SettingSection>
        </Box>

        {/* Sidebar Column */}
        <Box>
          {/* User Profile */}
          <SettingSection 
            title="User Profile" 
            icon={<SecurityIcon color="primary" />}
          >
            <Stack spacing={3} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Role"
                  value={userProfile.role}
                  disabled
                />
              </Stack>
            </Stack>
          </SettingSection>

          {/* System Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                System Information
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Version</Typography>
                  <Typography variant="body1">AMSC Portal v2.1.0</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Last Update</Typography>
                  <Typography variant="body1">January 15, 2024</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Database</Typography>
                  <Typography variant="body1">Connected ✓</Typography>
                </Box>
                <Divider />
                <Button variant="outlined" size="small" fullWidth>
                  Check for Updates
                </Button>
                <Button variant="outlined" size="small" fullWidth color="error">
                  Export Data
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Security Tip:</strong> Regularly update your password and enable two-factor authentication for enhanced security.
            </Typography>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;