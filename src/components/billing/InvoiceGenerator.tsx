import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { generateInvoiceRequest, clearCurrentInvoice } from '../../store/slices/billingSlice';
import { fetchAppointmentRequest } from '../../store/slices/appointmentsSlice';

const InvoiceGenerator: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const componentRef = useRef<HTMLDivElement>(null);
  
  const { currentInvoice, isLoading, error } = useAppSelector(state => state.billing);
  const { selectedAppointment } = useAppSelector(state => state.appointments);

  useEffect(() => {
    if (appointmentId) {
      dispatch(fetchAppointmentRequest(parseInt(appointmentId, 10)));
    }
    
    return () => {
      dispatch(clearCurrentInvoice());
    };
  }, [appointmentId, dispatch]);

  useEffect(() => {
    if (selectedAppointment && !currentInvoice) {
      dispatch(generateInvoiceRequest(selectedAppointment));
    }
  }, [selectedAppointment, currentInvoice, dispatch]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice-${currentInvoice?.id}`,
  });

  const handleDownloadPDF = async () => {
    if (!componentRef.current || !currentInvoice) return;

    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Invoice-${currentInvoice.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleBack = () => {
    navigate(`/appointments/${appointmentId}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Generating invoice...</Typography>
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
          Back to Appointment
        </Button>
      </Box>
    );
  }

  if (!currentInvoice) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Invoice not found
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Appointment
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
            Invoice Generator
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            color="primary"
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<PdfIcon />}
            onClick={handleDownloadPDF}
            color="primary"
          >
            Download PDF
          </Button>
        </Stack>
      </Box>

      {/* Invoice Content */}
      <Card>
        <CardContent>
          <Box ref={componentRef} sx={{ p: 4, backgroundColor: 'white', color: 'black' }}>
            {/* Invoice Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {currentInvoice.clinicInfo.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  {currentInvoice.clinicInfo.address}
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Phone: {currentInvoice.clinicInfo.phone}
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Email: {currentInvoice.clinicInfo.email}
                </Typography>
                <Typography variant="body1">
                  Tax ID: {currentInvoice.clinicInfo.taxId}
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1, textAlign: { xs: 'left', md: 'right' } }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  INVOICE
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Invoice #: {currentInvoice.id}
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Date: {new Date(currentInvoice.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Status: <strong>{currentInvoice.status.toUpperCase()}</strong>
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Patient & Appointment Information */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Bill To:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {currentInvoice.appointmentData.patientName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Email: {currentInvoice.appointmentData.patientEmail}
                </Typography>
                <Typography variant="body2">
                  Phone: {currentInvoice.appointmentData.patientPhone}
                </Typography>
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Appointment Details:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Date:</strong> {new Date(currentInvoice.appointmentData.appointmentDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Time:</strong> {currentInvoice.appointmentData.appointmentTime}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Doctor:</strong> {currentInvoice.appointmentData.doctor}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {currentInvoice.appointmentData.duration} minutes
                </Typography>
              </Box>
            </Box>

            {/* Services Table */}
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Service</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Description</TableCell>
                    <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentInvoice.servicesCosts.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {service.serviceName}
                      </TableCell>
                      <TableCell>
                        {service.description}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>
                        ${service.cost.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Totals */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
              <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                <Box sx={{ border: 1, borderColor: 'divider', p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Subtotal:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      ${currentInvoice.totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Tax (8%):</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      ${currentInvoice.taxAmount.toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Total:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      ${currentInvoice.grandTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Thank you for choosing {currentInvoice.clinicInfo.name}. 
                For any questions regarding this invoice, please contact us at {currentInvoice.clinicInfo.phone}.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InvoiceGenerator;