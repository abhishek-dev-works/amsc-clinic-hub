import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  LocalHospital as LocalHospitalIcon,
  Schedule as ScheduleIcon,
  Notes as NotesIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAppointmentRequest, clearSelectedAppointment } from '../store/slices/appointmentsSlice';

const statusColors = {
  Confirmed: 'success',
  Pending: 'warning',
  Completed: 'info',
  Cancelled: 'error',
} as const;

const AppointmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { selectedAppointment, isLoading, error } = useAppSelector(state => state.appointments);

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentRequest(parseInt(id, 10)));
    }
    
    return () => {
      dispatch(clearSelectedAppointment());
    };
  }, [id, dispatch]);

  const handleBack = () => {
    navigate('/appointments');
  };

  const handleEdit = () => {
    console.log('Edit appointment:', selectedAppointment?.id);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = () => {
    console.log('Delete appointment:', selectedAppointment?.id);
    // TODO: Show confirmation dialog and delete
  };

  const handleContact = (type: 'phone' | 'email') => {
    if (!selectedAppointment) return;
    
    if (type === 'phone') {
      window.open(`tel:${selectedAppointment.patientPhone}`);
    } else {
      window.open(`mailto:${selectedAppointment.patientEmail}`);
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
          Back to Appointments
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
            Appointment Details
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            color="primary"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            color="error"
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Main Information */}
        <Box sx={{ flex: 2 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedAppointment.service}
                </Typography>
                <Chip
                  label={selectedAppointment.status}
                  color={statusColors[selectedAppointment.status]}
                  size="medium"
                  variant="filled"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                {/* Patient Information */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      Patient Information
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    {selectedAppointment.patientName}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleContact('phone')}
                    >
                      <PhoneIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ py: 1 }}>
                      {selectedAppointment.patientPhone}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleContact('email')}
                    >
                      <EmailIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ py: 1 }}>
                      {selectedAppointment.patientEmail}
                    </Typography>
                  </Stack>
                </Box>

                {/* Appointment Details */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      Appointment Details
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at {selectedAppointment.appointmentTime}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedAppointment.duration} minutes
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Doctor Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospitalIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Doctor Information
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {selectedAppointment.doctor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedAppointment.service}
              </Typography>
            </CardContent>
          </Card>

          {/* Notes */}
          {selectedAppointment.notes && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotesIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Notes
                  </Typography>
                </Box>
                
                <Typography variant="body1">
                  {selectedAppointment.notes}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Side Panel */}
        <Box sx={{ flex: 1, maxWidth: { md: 300 } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                Quick Actions
              </Typography>
              
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Edit Appointment
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PhoneIcon />}
                  onClick={() => handleContact('phone')}
                >
                  Call Patient
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EmailIcon />}
                  onClick={() => handleContact('email')}
                >
                  Email Patient
                </Button>
                
                <Divider />
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  color="error"
                >
                  Delete Appointment
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentDetails;