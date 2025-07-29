/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
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
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Mock data for patients
const mockPatients = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Smith - (555) 123-4568',
    bloodType: 'O+',
    allergies: 'Penicillin, Peanuts',
    lastVisit: '2024-01-10',
    status: 'Active',
    insurance: 'Blue Cross Blue Shield',
    notes: 'Regular checkups, no major issues',
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Carlos Garcia - (555) 234-5679',
    bloodType: 'A-',
    allergies: 'None',
    lastVisit: '2024-01-08',
    status: 'Active',
    insurance: 'Aetna',
    notes: 'Pregnant - due date March 2024',
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-12-05',
    gender: 'Male',
    address: '789 Pine St, City, State 12345',
    emergencyContact: 'Linda Johnson - (555) 345-6790',
    bloodType: 'B+',
    allergies: 'Latex',
    lastVisit: '2024-01-05',
    status: 'Inactive',
    insurance: 'Cigna',
    notes: 'Moved to different state',
  },
  {
    id: 4,
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@email.com',
    phone: '+1 (555) 456-7890',
    dateOfBirth: '1995-09-18',
    gender: 'Female',
    address: '321 Elm St, City, State 12345',
    emergencyContact: 'David Wang - (555) 456-7891',
    bloodType: 'AB+',
    allergies: 'Shellfish',
    lastVisit: '2024-01-12',
    status: 'Active',
    insurance: 'United Healthcare',
    notes: 'Student athlete, regular sports physicals',
  },
];

const statusColors = {
  Active: 'success',
  Inactive: 'default',
} as const;

const PatientLog: React.FC = () => {
  const [patients] = useState(mockPatients);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Filter patients based on criteria
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesStatus = !filterStatus || patient.status === filterStatus;
      const matchesGender = !filterGender || patient.gender === filterGender;
      const matchesSearch = !searchTerm || 
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm);
      
      return matchesStatus && matchesGender && matchesSearch;
    });
  }, [patients, filterStatus, filterGender, searchTerm]);

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setViewDialogOpen(true);
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Define DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
          {params.row.firstName[0]}{params.row.lastName[0]}
        </Avatar>
      ),
    },
    {
      field: 'fullName',
      headerName: 'Patient Name',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.row.firstName} {params.row.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Age: {calculateAge(params.row.dateOfBirth)}
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
      field: 'gender',
      headerName: 'Gender',
      width: 100,
    },
    {
      field: 'bloodType',
      headerName: 'Blood Type',
      width: 100,
    },
    {
      field: 'lastVisit',
      headerName: 'Last Visit',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'insurance',
      headerName: 'Insurance',
      width: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
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
      width: 140,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => handleViewPatient(params.row)}>
            <ViewIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
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
    setFilterGender('');
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
          Add New Patient
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
              label="Search patients"
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
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
            
            <TextField
              select
              label="Gender"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Genders</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
            
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
          Showing {filteredPatients.length} of {patients.length} patients
        </Typography>
      </Box>

      {/* DataGrid */}
      <Card>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredPatients}
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

      {/* Patient Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Patient Details - {selectedPatient?.firstName} {selectedPatient?.lastName}
        </DialogTitle>
        <DialogContent>
          {selectedPatient && (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>Personal Information</Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Full Name</Typography>
                      <Typography variant="body1">{selectedPatient.firstName} {selectedPatient.lastName}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                      <Typography variant="body1">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()} (Age: {calculateAge(selectedPatient.dateOfBirth)})</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Gender</Typography>
                      <Typography variant="body1">{selectedPatient.gender}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Address</Typography>
                      <Typography variant="body1">{selectedPatient.address}</Typography>
                    </Box>
                  </Stack>
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>Medical Information</Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Blood Type</Typography>
                      <Typography variant="body1">{selectedPatient.bloodType}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Allergies</Typography>
                      <Typography variant="body1">{selectedPatient.allergies}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Insurance</Typography>
                      <Typography variant="body1">{selectedPatient.insurance}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Last Visit</Typography>
                      <Typography variant="body1">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>Contact & Emergency</Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{selectedPatient.email}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">{selectedPatient.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Emergency Contact</Typography>
                    <Typography variant="body1">{selectedPatient.emergencyContact}</Typography>
                  </Box>
                </Stack>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>Notes</Typography>
                <Typography variant="body1">{selectedPatient.notes}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button variant="contained" color="primary">Edit Patient</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientLog;