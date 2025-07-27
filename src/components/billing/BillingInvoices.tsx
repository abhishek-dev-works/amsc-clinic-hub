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
  Alert,
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
  Receipt as ReceiptIcon,
  Send as SendIcon,
  Download as DownloadIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

// Mock data for invoices
const mockInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    patientName: 'John Smith',
    patientEmail: 'john.smith@email.com',
    serviceDate: '2024-01-15',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    services: ['General Consultation', 'Blood Test'],
    subtotal: 230,
    tax: 18.40,
    total: 248.40,
    status: 'Paid',
    paymentMethod: 'Credit Card',
    insurance: 'Blue Cross Blue Shield',
    insuranceCovered: 180,
    patientResponsible: 68.40,
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    patientName: 'Maria Garcia',
    patientEmail: 'maria.garcia@email.com',
    serviceDate: '2024-01-16',
    issueDate: '2024-01-16',
    dueDate: '2024-02-15',
    services: ['Cardiology Consultation'],
    subtotal: 300,
    tax: 24,
    total: 324,
    status: 'Pending',
    paymentMethod: '',
    insurance: 'Aetna',
    insuranceCovered: 240,
    patientResponsible: 84,
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-003',
    patientName: 'Robert Johnson',
    patientEmail: 'robert.johnson@email.com',
    serviceDate: '2024-01-17',
    issueDate: '2024-01-17',
    dueDate: '2024-02-16',
    services: ['Dermatology Check-up', 'Prescription'],
    subtotal: 220,
    tax: 17.60,
    total: 237.60,
    status: 'Overdue',
    paymentMethod: '',
    insurance: 'Cigna',
    insuranceCovered: 160,
    patientResponsible: 77.60,
  },
  {
    id: 4,
    invoiceNumber: 'INV-2024-004',
    patientName: 'Lisa Wang',
    patientEmail: 'lisa.wang@email.com',
    serviceDate: '2024-01-18',
    issueDate: '2024-01-18',
    dueDate: '2024-02-17',
    services: ['Physical Therapy Session'],
    subtotal: 120,
    tax: 9.60,
    total: 129.60,
    status: 'Draft',
    paymentMethod: '',
    insurance: 'United Healthcare',
    insuranceCovered: 96,
    patientResponsible: 33.60,
  },
];

const statusColors = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
  Draft: 'default',
} as const;

const BillingInvoices: React.FC = () => {
  const [invoices] = useState(mockInvoices);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateRange, setFilterDateRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter invoices based on criteria
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesStatus = !filterStatus || invoice.status === filterStatus;
      const matchesSearch = !searchTerm || 
        invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [invoices, filterStatus, searchTerm]);

  // Calculate summary stats
  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'Paid').reduce((sum, invoice) => sum + invoice.total, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === 'Pending').reduce((sum, invoice) => sum + invoice.total, 0);
  const overdueAmount = filteredInvoices.filter(inv => inv.status === 'Overdue').reduce((sum, invoice) => sum + invoice.total, 0);

  // Define DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'invoiceNumber',
      headerName: 'Invoice #',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(params.row.issueDate).toLocaleDateString()}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'patientName',
      headerName: 'Patient',
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.patientEmail}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'services',
      headerName: 'Services',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          {params.value.slice(0, 2).map((service: string, index: number) => (
            <Typography key={index} variant="caption" display="block">
              {service}
            </Typography>
          ))}
          {params.value.length > 2 && (
            <Typography variant="caption" color="text.secondary">
              +{params.value.length - 2} more
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={500}>
          ${params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'patientResponsible',
      headerName: 'Patient Due',
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" fontWeight={500} color="primary.main">
          ${params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
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
      width: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" title="View/Edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="info" title="Download PDF">
            <DownloadIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="secondary" title="Send Email">
            <SendIcon fontSize="small" />
          </IconButton>
          {params.row.status !== 'Paid' && (
            <IconButton size="small" color="success" title="Record Payment">
              <PaymentIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      ),
    },
  ];

  const clearFilters = () => {
    setFilterStatus('');
    setFilterDateRange('');
    setSearchTerm('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Billing & Invoices
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<ReceiptIcon />}
          >
            Generate Report
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
          >
            Create Invoice
          </Button>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Amount</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              ${totalAmount.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Paid</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
              ${paidAmount.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Pending</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
              ${pendingAmount.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Overdue</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
              ${overdueAmount.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Payment Integration Info */}
      <Alert severity="info" sx={{ mb: 3 }}>
        💳 <strong>Ready for payment integration?</strong> This system can be enhanced with Stripe for secure online payments. 
        Contact support to enable credit card processing for patient payments.
      </Alert>

      {/* Filters Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Filters & Search
          </Typography>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch">
            <TextField
              label="Search invoices/patients"
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
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Overdue">Overdue</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </TextField>
            
            <TextField
              select
              label="Date Range"
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Dates</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
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
          Showing {filteredInvoices.length} of {invoices.length} invoices
        </Typography>
      </Box>

      {/* DataGrid */}
      <Card>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredInvoices}
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

export default BillingInvoices;