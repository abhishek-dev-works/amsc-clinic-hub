import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  Event,
  CheckCircle,
  Schedule,
  Person,
  MoreVert,
} from '@mui/icons-material';

// Mock data for dashboard
const todayStats = {
  totalAppointments: 12,
  completed: 8,
  remaining: 4,
  revenue: 15750,
};

const todayAppointments = [
  {
    id: 1,
    patientName: 'John Smith',
    time: '09:00 AM',
    category: 'Dental',
    treatment: 'Root Canal',
    status: 'completed',
    phone: '+91 98765 43210',
  },
  {
    id: 2,
    patientName: 'Sarah Johnson',
    time: '10:30 AM',
    category: 'Dermatology',
    treatment: 'Chemical Peeling',
    status: 'completed',
    phone: '+91 98765 43211',
  },
  {
    id: 3,
    patientName: 'Michael Davis',
    time: '11:15 AM',
    category: 'Retina',
    treatment: 'Eye Pressure Test',
    status: 'upcoming',
    phone: '+91 98765 43212',
  },
  {
    id: 4,
    patientName: 'Emily Wilson',
    time: '02:00 PM',
    category: 'Dental',
    treatment: 'Cleaning',
    status: 'upcoming',
    phone: '+91 98765 43213',
  },
  {
    id: 5,
    patientName: 'David Brown',
    time: '03:30 PM',
    category: 'Dermatology',
    treatment: 'Acne Treatment',
    status: 'upcoming',
    phone: '+91 98765 43214',
  },
];

const newRequests = [
  {
    id: 1,
    patientName: 'Lisa Anderson',
    category: 'Dental',
    treatment: 'Tooth Extraction',
    preferredDate: '2025-01-28',
    phone: '+91 98765 43215',
  },
  {
    id: 2,
    patientName: 'Robert Taylor',
    category: 'Retina',
    treatment: 'Retinal Scan',
    preferredDate: '2025-01-29',
    phone: '+91 98765 43216',
  },
];

const revenueBreakdown = [
  { category: 'Dental', amount: 8500, count: 5 },
  { category: 'Dermatology', amount: 4250, count: 3 },
  { category: 'Retina', amount: 3000, count: 2 },
];

const Dashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'success' : 'warning';
  };

  const getStatusIcon = (status: string) => {
    return status === 'completed' ? <CheckCircle /> : <Schedule />;
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening at AMSC today.
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 3
      }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Event color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                {todayStats.totalAppointments}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Total Appointments Today
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircle color="success" sx={{ mr: 1 }} />
              <Typography variant="h6" color="success.main">
                {todayStats.completed}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Schedule color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6" color="warning.main">
                {todayStats.remaining}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Remaining
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp color="success" sx={{ mr: 1 }} />
              <Typography variant="h6" color="success.main">
                ₹{todayStats.revenue.toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Revenue Today
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: 3
      }}>
        {/* Today's Appointments */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Today's Appointments
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Category → Treatment</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                            <Person />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {appointment.patientName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {appointment.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {appointment.time}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {appointment.category} → {appointment.treatment}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(appointment.status)}
                          label={appointment.status === 'completed' ? 'Completed' : 'Upcoming'}
                          color={getStatusColor(appointment.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {appointment.status === 'upcoming' ? (
                          <Button size="small" variant="contained" color="success">
                            Mark Complete
                          </Button>
                        ) : (
                          <IconButton size="small">
                            <MoreVert />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <Stack spacing={3}>
          {/* Revenue Breakdown */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Revenue by Category
              </Typography>
              {revenueBreakdown.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.category}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ₹{item.amount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.count} appointments
                  </Typography>
                  {index < revenueBreakdown.length - 1 && <Box sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }} />}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* New Appointment Requests */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                New Requests ({newRequests.length})
              </Typography>
              {newRequests.map((request, index) => (
                <Box key={request.id} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {request.patientName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {request.category} → {request.treatment}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    Preferred: {request.preferredDate}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="contained" color="success">
                      Approve
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Reject
                    </Button>
                  </Box>
                  {index < newRequests.length - 1 && <Box sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;