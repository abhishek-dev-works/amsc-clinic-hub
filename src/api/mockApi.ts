import axios from 'axios';

// Mock API base URL
const API_BASE_URL = 'https://api.amsc.mock';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: 'John Smith',
    patientPhone: '+1 (555) 123-4567',
    patientEmail: 'john.smith@email.com',
    appointmentDate: '2024-01-15',
    appointmentTime: '10:00 AM',
    service: 'General Consultation',
    doctor: 'Dr. Sarah Johnson',
    status: 'Confirmed' as const,
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
    status: 'Pending' as const,
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
    status: 'Completed' as const,
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
    status: 'Cancelled' as const,
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
    status: 'Confirmed' as const,
    duration: 60,
    notes: 'Post-surgery rehabilitation session',
  },
];

// Mock API interceptor to simulate network requests
api.interceptors.request.use((config) => {
  console.log(`Mock API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`Mock API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Mock API Error:', error);
    return Promise.reject(error);
  }
);

export interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  service: string;
  doctor: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  duration: number;
  notes: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials): Promise<{ data: { user: User; token: string } }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@amsc.com' && credentials.password === 'admin123') {
          resolve({
            data: {
              user: {
                id: 1,
                email: 'admin@amsc.com',
                name: 'Admin User',
                role: 'admin',
              },
              token: `amsc_token_${Date.now()}`,
            },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  logout: (): Promise<{ data: { message: string } }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Logged out successfully' } });
      }, 500);
    });
  },

  validateToken: (token: string): Promise<{ data: { user: User } }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token.startsWith('amsc_token_')) {
          resolve({
            data: {
              user: {
                id: 1,
                email: 'admin@amsc.com',
                name: 'Admin User',
                role: 'admin',
              },
            },
          });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
  },
};

// Appointments API
export const appointmentsAPI = {
  getAppointments: (): Promise<{ data: Appointment[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockAppointments });
      }, 1000);
    });
  },

  getAppointment: (id: number): Promise<{ data: Appointment }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const appointment = mockAppointments.find(apt => apt.id === id);
        if (appointment) {
          resolve({ data: appointment });
        } else {
          reject(new Error('Appointment not found'));
        }
      }, 800);
    });
  },

  createAppointment: (appointment: Omit<Appointment, 'id'>): Promise<{ data: Appointment }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAppointment = {
          ...appointment,
          id: Math.max(...mockAppointments.map(a => a.id)) + 1,
        };
        mockAppointments.push(newAppointment);
        resolve({ data: newAppointment });
      }, 1000);
    });
  },

  updateAppointment: (id: number, appointment: Partial<Appointment>): Promise<{ data: Appointment }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAppointments.findIndex(apt => apt.id === id);
        if (index !== -1) {
          mockAppointments[index] = { ...mockAppointments[index], ...appointment };
          resolve({ data: mockAppointments[index] });
        } else {
          reject(new Error('Appointment not found'));
        }
      }, 800);
    });
  },

  deleteAppointment: (id: number): Promise<{ data: { message: string } }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAppointments.findIndex(apt => apt.id === id);
        if (index !== -1) {
          mockAppointments.splice(index, 1);
          resolve({ data: { message: 'Appointment deleted successfully' } });
        } else {
          reject(new Error('Appointment not found'));
        }
      }, 800);
    });
  },
};

export default api;