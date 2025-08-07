import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { 
  fetchAppointmentRequest, 
  updateAppointmentRequest, 
  clearSelectedAppointment 
} from '../store/slices/appointmentsSlice';
import { Appointment } from '../api/mockApi';

const services = [
  'General Consultation',
  'Cardiology Consultation',
  'Dermatology Check-up',
  'Orthopedic Consultation',
  'Physical Therapy',
  'Gynecology Consultation',
  'Ophthalmology Exam',
  'Mental Health Counseling',
  'Endocrinology Consultation',
  'Pediatric Consultation',
  'Urology Consultation',
  'Neurology Consultation',
  'Sports Medicine',
  'Rheumatology Consultation',
  'Gastroenterology',
  'Pulmonology Consultation',
  'Oncology Consultation',
  'Allergy Testing',
  'Plastic Surgery Consultation',
  'Nutrition Counseling',
];

const doctors = [
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Davis',
  'Dr. James Wilson',
  'Dr. Amanda Rodriguez',
  'Dr. Patricia Williams',
  'Dr. Richard Lee',
  'Dr. Lisa Thompson',
  'Dr. Kevin Park',
  'Dr. Michelle Garcia',
  'Dr. Steven Brown',
  'Dr. Mark Johnson',
  'Dr. Jennifer White',
  'Dr. Robert Kim',
  'Dr. Maria Gonzalez',
  'Dr. David Martinez',
  'Dr. Susan Davis',
  'Dr. Andrew Wilson',
  'Dr. Catherine Moore',
  'Dr. Laura Phillips',
];

const statuses = ['Confirmed', 'Pending', 'Completed', 'Cancelled'] as const;

const EditAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { selectedAppointment, isLoading, error } = useAppSelector(state => state.appointments);

  const [formData, setFormData] = useState<Partial<Appointment>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentRequest(parseInt(id, 10)));
    }
    
    return () => {
      dispatch(clearSelectedAppointment());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedAppointment) {
      setFormData(selectedAppointment);
    }
  }, [selectedAppointment]);

  const handleBack = () => {
    navigate(`/appointments/${id}`);
  };

  const handleCancel = () => {
    navigate(`/appointments/${id}`);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.patientName?.trim()) {
      errors.patientName = 'Patient name is required';
    }

    if (!formData.patientPhone?.trim()) {
      errors.patientPhone = 'Patient phone is required';
    }

    if (!formData.patientEmail?.trim()) {
      errors.patientEmail = 'Patient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      errors.patientEmail = 'Please enter a valid email address';
    }

    if (!formData.appointmentDate) {
      errors.appointmentDate = 'Appointment date is required';
    }

    if (!formData.appointmentTime) {
      errors.appointmentTime = 'Appointment time is required';
    }

    if (!formData.service) {
      errors.service = 'Service is required';
    }

    if (!formData.doctor) {
      errors.doctor = 'Doctor is required';
    }

    if (!formData.status) {
      errors.status = 'Status is required';
    }

    if (!formData.duration || formData.duration <= 0) {
      errors.duration = 'Duration must be greater than 0';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm() || !id) return;

    dispatch(updateAppointmentRequest({
      id: parseInt(id, 10),
      appointment: formData
    }));

    // Navigate back to details page after saving
    navigate(`/appointments/${id}`);
  };

  const handleInputChange = (field: keyof Appointment, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading appointment details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Details
        </Button>
      </Box>
    );
  }

  if (!selectedAppointment) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Appointment not found
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Appointments
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Edit Appointment
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            color="primary"
          >
            Save Changes
          </Button>
        </Stack>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Patient Information */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Patient Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Patient Name"
                    value={formData.patientName || ''}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    error={!!validationErrors.patientName}
                    helperText={validationErrors.patientName}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Patient Phone"
                    value={formData.patientPhone || ''}
                    onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                    error={!!validationErrors.patientPhone}
                    helperText={validationErrors.patientPhone}
                    required
                  />
                </Box>
                
                <TextField
                  fullWidth
                  label="Patient Email"
                  type="email"
                  value={formData.patientEmail || ''}
                  onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                  error={!!validationErrors.patientEmail}
                  helperText={validationErrors.patientEmail}
                  required
                />
              </Box>
            </Box>

            {/* Appointment Details */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Appointment Details
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={formData.appointmentDate || ''}
                    onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                    error={!!validationErrors.appointmentDate}
                    helperText={validationErrors.appointmentDate}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Time"
                    value={formData.appointmentTime || ''}
                    onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                    error={!!validationErrors.appointmentTime}
                    helperText={validationErrors.appointmentTime}
                    placeholder="e.g., 10:00 AM"
                    required
                  />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <FormControl fullWidth error={!!validationErrors.service} required>
                    <InputLabel>Service</InputLabel>
                    <Select
                      value={formData.service || ''}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      label="Service"
                    >
                      {services.map(service => (
                        <MenuItem key={service} value={service}>
                          {service}
                        </MenuItem>
                      ))}
                    </Select>
                    {validationErrors.service && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {validationErrors.service}
                      </Typography>
                    )}
                  </FormControl>
                  
                  <FormControl fullWidth error={!!validationErrors.doctor} required>
                    <InputLabel>Doctor</InputLabel>
                    <Select
                      value={formData.doctor || ''}
                      onChange={(e) => handleInputChange('doctor', e.target.value)}
                      label="Doctor"
                    >
                      {doctors.map(doctor => (
                        <MenuItem key={doctor} value={doctor}>
                          {doctor}
                        </MenuItem>
                      ))}
                    </Select>
                    {validationErrors.doctor && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {validationErrors.doctor}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Duration (minutes)"
                    type="number"
                    value={formData.duration || ''}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                    error={!!validationErrors.duration}
                    helperText={validationErrors.duration}
                    inputProps={{ min: 1, max: 300 }}
                    required
                  />
                  
                  <FormControl fullWidth error={!!validationErrors.status} required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      label="Status"
                    >
                      {statuses.map(status => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                    {validationErrors.status && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {validationErrors.status}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={4}
                  value={formData.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes about the appointment..."
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditAppointment;