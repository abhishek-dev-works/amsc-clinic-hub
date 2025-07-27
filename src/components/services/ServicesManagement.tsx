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
  Switch,
  FormControlLabel,
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
  MedicalServices as ServiceIcon,
} from '@mui/icons-material';

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: 'General Consultation',
    category: 'Primary Care',
    duration: 30,
    price: 150,
    description: 'Basic medical consultation and examination',
    isActive: true,
    department: 'General Medicine',
    requirements: 'None',
  },
  {
    id: 2,
    name: 'Cardiology Consultation',
    category: 'Specialty Care',
    duration: 45,
    price: 300,
    description: 'Comprehensive heart and cardiovascular examination',
    isActive: true,
    department: 'Cardiology',
    requirements: 'Referral required',
  },
  {
    id: 3,
    name: 'Dermatology Check-up',
    category: 'Specialty Care',
    duration: 30,
    price: 200,
    description: 'Skin examination and treatment consultation',
    isActive: true,
    department: 'Dermatology',
    requirements: 'None',
  },
  {
    id: 4,
    name: 'Physical Therapy Session',
    category: 'Therapy',
    duration: 60,
    price: 120,
    description: 'Rehabilitation and physical therapy treatment',
    isActive: true,
    department: 'Physical Therapy',
    requirements: 'Doctor prescription',
  },
  {
    id: 5,
    name: 'Blood Test Panel',
    category: 'Laboratory',
    duration: 15,
    price: 80,
    description: 'Comprehensive blood chemistry analysis',
    isActive: true,
    department: 'Laboratory',
    requirements: 'Fasting required',
  },
  {
    id: 6,
    name: 'X-Ray Imaging',
    category: 'Imaging',
    duration: 20,
    price: 100,
    description: 'Digital X-ray imaging service',
    isActive: false,
    department: 'Radiology',
    requirements: 'Doctor order',
  },
];

const categoryColors = {
  'Primary Care': 'primary',
  'Specialty Care': 'secondary',
  'Therapy': 'success',
  'Laboratory': 'warning',
  'Imaging': 'info',
} as const;

const ServicesManagement: React.FC = () => {
  const [services] = useState(mockServices);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories and departments for filters
  const uniqueCategories = useMemo(() => {
    const categories = services.map(service => service.category);
    return [...new Set(categories)].sort();
  }, [services]);

  const uniqueDepartments = useMemo(() => {
    const departments = services.map(service => service.department);
    return [...new Set(departments)].sort();
  }, [services]);

  // Filter services based on criteria
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = !filterCategory || service.category === filterCategory;
      const matchesDepartment = !filterDepartment || service.department === filterDepartment;
      const matchesStatus = !filterStatus || 
        (filterStatus === 'active' && service.isActive) ||
        (filterStatus === 'inactive' && !service.isActive);
      const matchesSearch = !searchTerm || 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [services, filterCategory, filterDepartment, filterStatus, searchTerm]);

  // Define DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: '',
      width: 60,
      sortable: false,
      renderCell: () => (
        <ServiceIcon color="primary" />
      ),
    },
    {
      field: 'name',
      headerName: 'Service Name',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.duration} min
          </Typography>
        </Box>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={categoryColors[params.value as keyof typeof categoryColors]}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={500}>
          ${params.value}
        </Typography>
      ),
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
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
          variant="filled"
        />
      ),
    },
    {
      field: 'requirements',
      headerName: 'Requirements',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
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
    setFilterCategory('');
    setFilterDepartment('');
    setFilterStatus('');
    setSearchTerm('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Services Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          Add New Service
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
              label="Search services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 250 }}
            />
            
            <TextField
              select
              label="Category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              select
              label="Department"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Departments</MenuItem>
              {uniqueDepartments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              select
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
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
          Showing {filteredServices.length} of {services.length} services
        </Typography>
      </Box>

      {/* DataGrid */}
      <Card>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredServices}
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

export default ServicesManagement;