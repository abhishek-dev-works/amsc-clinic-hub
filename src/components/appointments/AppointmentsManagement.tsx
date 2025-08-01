import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Chip,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAppointmentsRequest } from '../../store/slices/appointmentsSlice';

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: 'John Smith',
    patientPhone: '+1 (555) 123-4567',
    patientEmail: 'john.smith@email.com',
    appointmentDate: '2024-01-15',
    appointmentTime: '10:00 AM',
    service: 'General Consultation',
    doctor: 'Dr. Sarah Johnson',
    status: 'Confirmed',
    duration: 30,
    notes: 'Follow-up appointment for blood pressure monitoring',
  },
  {
    id: 2,
    patientName: 'Maria Garcia',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'maria.garcia@email.com',
    appointmentDate: '2024-01-15',
    appointmentTime: '11:30 AM',
    service: 'Cardiology Consultation',
    doctor: 'Dr. Michael Chen',
    status: 'Pending',
    duration: 45,
    notes: 'Initial consultation for chest pain symptoms',
  },
  {
    id: 3,
    patientName: 'Robert Johnson',
    patientPhone: '+1 (555) 345-6789',
    patientEmail: 'robert.johnson@email.com',
    appointmentDate: '2024-01-16',
    appointmentTime: '2:00 PM',
    service: 'Dermatology Check-up',
    doctor: 'Dr. Emily Davis',
    status: 'Completed',
    duration: 25,
    notes: 'Annual skin cancer screening',
  },
  {
    id: 4,
    patientName: 'Lisa Wang',
    patientPhone: '+1 (555) 456-7890',
    patientEmail: 'lisa.wang@email.com',
    appointmentDate: '2024-01-16',
    appointmentTime: '3:30 PM',
    service: 'Orthopedic Consultation',
    doctor: 'Dr. James Wilson',
    status: 'Cancelled',
    duration: 40,
    notes: 'Knee pain evaluation - rescheduled by patient',
  },
  {
    id: 5,
    patientName: 'David Brown',
    patientPhone: '+1 (555) 567-8901',
    patientEmail: 'david.brown@email.com',
    appointmentDate: '2024-01-17',
    appointmentTime: '9:00 AM',
    service: 'Physical Therapy',
    doctor: 'Dr. Amanda Rodriguez',
    status: 'Confirmed',
    duration: 60,
    notes: 'Post-surgery rehabilitation session',
  },
  {
    id: 6,
    patientName: 'Jennifer Lee',
    patientPhone: '+1 (555) 678-9012',
    patientEmail: 'jennifer.lee@email.com',
    appointmentDate: '2024-01-17',
    appointmentTime: '1:00 PM',
    service: 'Gynecology Consultation',
    doctor: 'Dr. Patricia Martinez',
    status: 'Confirmed',
    duration: 35,
    notes: 'Annual wellness exam',
  },
];

const statusColors = {
  Confirmed: 'success',
  Pending: 'warning',
  Completed: 'info',
  Cancelled: 'error',
} as const;

const AppointmentsManagement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { appointments, isLoading, filters } = useAppSelector(state => state.appointments);
  
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAppointmentsRequest());
  }, [dispatch]);

  // Get unique doctors for filter dropdown
  const uniqueDoctors = useMemo(() => {
    const doctors = appointments.map(apt => apt.doctor);
    return [...new Set(doctors)].sort();
  }, [appointments]);

  // Filter appointments based on criteria
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesStatus = !filterStatus || appointment.status === filterStatus;
      const matchesDoctor = !filterDoctor || appointment.doctor === filterDoctor;
      const matchesDate = !filterDate || appointment.appointmentDate === filterDate;
      const matchesSearch = !searchTerm || 
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesDoctor && matchesDate && matchesSearch;
    });
  }, [appointments, filterStatus, filterDoctor, filterDate, searchTerm]);

  // Define DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'patientName',
      headerName: 'Patient Name',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary">
            <PhoneIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <EmailIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
    {
      field: 'appointmentDate',
      headerName: 'Date',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'appointmentTime',
      headerName: 'Time',
      width: 100,
    },
    {
      field: 'service',
      headerName: 'Service',
      width: 180,
    },
    {
      field: 'doctor',
      headerName: 'Doctor',
      width: 160,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {params.value} min
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={statusColors[params.value as keyof typeof statusColors]}
          size="small"
          variant="filled"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton 
            size="small" 
            color="primary"
            onClick={() => navigate(`/appointments/${params.row.id}`)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const clearFilters = () => {
    setFilterStatus('');
    setFilterDoctor('');
    setFilterDate('');
    setSearchTerm('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          New Appointment
        </Button>
      </Box>

      {/* Filters Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Filters & Search
          </Typography>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
            <TextField
              label="Search patients/services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 250 }}
            />
            
            <TextField
              select
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
            
            <TextField
              select
              label="Doctor"
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Doctors</MenuItem>
              {uniqueDoctors.map((doctor) => (
                <MenuItem key={doctor} value={doctor}>
                  {doctor}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              type="date"
              label="Date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150 }}
            />
            
            <Button
              variant="outlined"
              onClick={clearFilters}
              size="medium"
              sx={{ minWidth: 120 }}
            >
              Clear Filters
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </Typography>
      </Box>

      {/* DataGrid */}
      <Card>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredAppointments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'background.paper',
                borderBottom: '2px solid',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default AppointmentsManagement;