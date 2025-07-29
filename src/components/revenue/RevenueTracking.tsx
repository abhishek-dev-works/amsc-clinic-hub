/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

// Mock data for revenue tracking
const monthlyRevenueData = [
  { month: 'Jan', revenue: 45000, expenses: 25000, profit: 20000, patients: 120 },
  { month: 'Feb', revenue: 52000, expenses: 28000, profit: 24000, patients: 135 },
  { month: 'Mar', revenue: 48000, expenses: 26000, profit: 22000, patients: 128 },
  { month: 'Apr', revenue: 61000, expenses: 32000, profit: 29000, patients: 145 },
  { month: 'May', revenue: 55000, expenses: 30000, profit: 25000, patients: 140 },
  { month: 'Jun', revenue: 67000, expenses: 35000, profit: 32000, patients: 165 },
];

const serviceRevenueData = [
  { name: 'General Consultation', value: 120000, color: '#2E7EFF' },
  { name: 'Cardiology', value: 95000, color: '#FF6B35' },
  { name: 'Dermatology', value: 78000, color: '#4CAF50' },
  { name: 'Physical Therapy', value: 62000, color: '#FFC107' },
  { name: 'Laboratory', value: 45000, color: '#9C27B0' },
  { name: 'Imaging', value: 38000, color: '#FF5722' },
];

const dailyRevenueData = [
  { day: 'Mon', revenue: 8500, appointments: 28 },
  { day: 'Tue', revenue: 9200, appointments: 32 },
  { day: 'Wed', revenue: 7800, appointments: 26 },
  { day: 'Thu', revenue: 10200, appointments: 35 },
  { day: 'Fri', revenue: 11500, appointments: 38 },
  { day: 'Sat', revenue: 6800, appointments: 22 },
  { day: 'Sun', revenue: 4200, appointments: 14 },
];

const RevenueTracking: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Calculate key metrics
  const currentMonthRevenue = monthlyRevenueData[monthlyRevenueData.length - 1].revenue;
  const previousMonthRevenue = monthlyRevenueData[monthlyRevenueData.length - 2].revenue;
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1);

  const totalRevenue = monthlyRevenueData.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = monthlyRevenueData.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const avgPatientsPerMonth = monthlyRevenueData.reduce((sum, month) => sum + month.patients, 0) / monthlyRevenueData.length;

  const StatCard = ({ title, value, icon, trend, color }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: color }}>
              {value}
            </Typography>
            {trend && (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                <TrendingUpIcon fontSize="small" color="success" />
                <Typography variant="body2" color="success.main">
                  +{trend}% vs last month
                </Typography>
              </Stack>
            )}
          </Box>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            backgroundColor: `${color}.light`,
            color: `${color}.contrastText`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            select
            label="Time Range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="1month">Last Month</MenuItem>
            <MenuItem value="3months">Last 3 Months</MenuItem>
            <MenuItem value="6months">Last 6 Months</MenuItem>
            <MenuItem value="1year">Last Year</MenuItem>
          </TextField>
          <Button variant="outlined">Export Report</Button>
        </Stack>
      </Box>

      {/* Key Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<MoneyIcon />}
          trend={revenueGrowth}
          color="primary"
        />
        <StatCard
          title="Net Profit"
          value={`$${totalProfit.toLocaleString()}`}
          icon={<TrendingUpIcon />}
          trend="8.2"
          color="success"
        />
        <StatCard
          title="Avg Patients/Month"
          value={Math.round(avgPatientsPerMonth)}
          icon={<PeopleIcon />}
          trend="12.5"
          color="info"
        />
        <StatCard
          title="Profit Margin"
          value={`${((totalProfit / totalRevenue) * 100).toFixed(1)}%`}
          icon={<AssessmentIcon />}
          trend="3.1"
          color="warning"
        />
      </Box>

      {/* Charts Row 1 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
        {/* Monthly Revenue Trend */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Monthly Revenue & Profit Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="#2E7EFF" 
                  fill="#2E7EFF" 
                  fillOpacity={0.6}
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stackId="2" 
                  stroke="#4CAF50" 
                  fill="#4CAF50" 
                  fillOpacity={0.6}
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Revenue Distribution */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Revenue by Service
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {serviceRevenueData.slice(0, 3).map((service, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: service.color 
                      }} 
                    />
                    <Typography variant="body2">{service.name}</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={500}>
                    ${service.value.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Row 2 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mb: 4 }}>
        {/* Daily Revenue */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Daily Revenue (This Week)
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="revenue" fill="#2E7EFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Volume */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Patient Volume Trend
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#FF6B35" 
                  strokeWidth={3}
                  dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Summary Cards */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Financial Summary
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">Total Revenue (6 months)</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                ${totalRevenue.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">Total Expenses (6 months)</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                ${totalExpenses.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">Net Profit (6 months)</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                ${totalProfit.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">Growth Rate</Typography>
              <Chip 
                label={`+${revenueGrowth}%`} 
                color="success" 
                size="medium"
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RevenueTracking;