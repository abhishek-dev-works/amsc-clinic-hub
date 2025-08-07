import axios from 'axios';

// Mock API base URL
const API_BASE_URL = 'https://api.amsc.mock';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Mock data - Comprehensive appointment data
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
    notes: 'Follow-up appointment for blood pressure monitoring. Patient reports feeling better since starting medication.',
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
    notes: 'Initial consultation for chest pain symptoms. Patient experiencing discomfort during physical activity.',
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
    notes: 'Annual skin cancer screening completed. No suspicious lesions found. Next screening recommended in 12 months.',
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
    notes: 'Knee pain evaluation - patient requested to reschedule due to work conflict. Will follow up next week.',
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
    notes: 'Post-surgery rehabilitation session for ACL repair. Patient showing good progress with mobility exercises.',
  },
  {
    id: 6,
    patientName: 'Jennifer Thompson',
    patientPhone: '+1 (555) 678-9012',
    patientEmail: 'jennifer.thompson@email.com',
    appointmentDate: '2024-01-17',
    appointmentTime: '11:00 AM',
    service: 'Gynecology Consultation',
    doctor: 'Dr. Patricia Williams',
    status: 'Confirmed' as const,
    duration: 30,
    notes: 'Annual wellness exam and Pap smear. Patient has no current concerns.',
  },
  {
    id: 7,
    patientName: 'Michael Anderson',
    patientPhone: '+1 (555) 789-0123',
    patientEmail: 'michael.anderson@email.com',
    appointmentDate: '2024-01-18',
    appointmentTime: '8:30 AM',
    service: 'Ophthalmology Exam',
    doctor: 'Dr. Richard Lee',
    status: 'Pending' as const,
    duration: 60,
    notes: 'Comprehensive eye exam for diabetes-related vision concerns. Patient reports blurry vision.',
  },
  {
    id: 8,
    patientName: 'Sarah Martinez',
    patientPhone: '+1 (555) 890-1234',
    patientEmail: 'sarah.martinez@email.com',
    appointmentDate: '2024-01-18',
    appointmentTime: '1:30 PM',
    service: 'Mental Health Counseling',
    doctor: 'Dr. Lisa Thompson',
    status: 'Confirmed' as const,
    duration: 50,
    notes: 'Weekly therapy session for anxiety management. Patient has been making steady progress.',
  },
  {
    id: 9,
    patientName: 'Christopher Davis',
    patientPhone: '+1 (555) 901-2345',
    patientEmail: 'christopher.davis@email.com',
    appointmentDate: '2024-01-19',
    appointmentTime: '10:15 AM',
    service: 'Endocrinology Consultation',
    doctor: 'Dr. Kevin Park',
    status: 'Completed' as const,
    duration: 45,
    notes: 'Diabetes management review. A1C levels improved since last visit. Continue current medication regimen.',
  },
  {
    id: 10,
    patientName: 'Amanda Wilson',
    patientPhone: '+1 (555) 012-3456',
    patientEmail: 'amanda.wilson@email.com',
    appointmentDate: '2024-01-19',
    appointmentTime: '2:45 PM',
    service: 'Pediatric Consultation',
    doctor: 'Dr. Michelle Garcia',
    status: 'Confirmed' as const,
    duration: 30,
    notes: 'Well-child visit for 6-year-old. Vaccines up to date, normal growth and development.',
  },
  {
    id: 11,
    patientName: 'Thomas Miller',
    patientPhone: '+1 (555) 123-4560',
    patientEmail: 'thomas.miller@email.com',
    appointmentDate: '2024-01-20',
    appointmentTime: '9:30 AM',
    service: 'Urology Consultation',
    doctor: 'Dr. Steven Brown',
    status: 'Pending' as const,
    duration: 35,
    notes: 'Follow-up for kidney stone treatment. Patient reports decreased pain since last procedure.',
  },
  {
    id: 12,
    patientName: 'Jessica Taylor',
    patientPhone: '+1 (555) 234-5671',
    patientEmail: 'jessica.taylor@email.com',
    appointmentDate: '2024-01-20',
    appointmentTime: '11:45 AM',
    service: 'Neurology Consultation',
    doctor: 'Dr. Mark Johnson',
    status: 'Confirmed' as const,
    duration: 55,
    notes: 'Migraine management consultation. Discussing new preventive medication options.',
  },
  {
    id: 13,
    patientName: 'Daniel Rodriguez',
    patientPhone: '+1 (555) 345-6782',
    patientEmail: 'daniel.rodriguez@email.com',
    appointmentDate: '2024-01-22',
    appointmentTime: '8:00 AM',
    service: 'Sports Medicine',
    doctor: 'Dr. Jennifer White',
    status: 'Confirmed' as const,
    duration: 40,
    notes: 'Athletic injury assessment for shoulder strain. Patient is a competitive swimmer.',
  },
  {
    id: 14,
    patientName: 'Nicole Clark',
    patientPhone: '+1 (555) 456-7893',
    patientEmail: 'nicole.clark@email.com',
    appointmentDate: '2024-01-22',
    appointmentTime: '1:00 PM',
    service: 'Rheumatology Consultation',
    doctor: 'Dr. Robert Kim',
    status: 'Pending' as const,
    duration: 50,
    notes: 'Rheumatoid arthritis management. Joint pain has been increasing over the past month.',
  },
  {
    id: 15,
    patientName: 'Kevin Lee',
    patientPhone: '+1 (555) 567-8904',
    patientEmail: 'kevin.lee@email.com',
    appointmentDate: '2024-01-22',
    appointmentTime: '3:15 PM',
    service: 'Gastroenterology',
    doctor: 'Dr. Maria Gonzalez',
    status: 'Completed' as const,
    duration: 45,
    notes: 'Colonoscopy follow-up. Polyps removed successfully, no signs of malignancy. Next screening in 5 years.',
  },
  {
    id: 16,
    patientName: 'Michelle Young',
    patientPhone: '+1 (555) 678-9015',
    patientEmail: 'michelle.young@email.com',
    appointmentDate: '2024-01-23',
    appointmentTime: '10:30 AM',
    service: 'Pulmonology Consultation',
    doctor: 'Dr. David Martinez',
    status: 'Confirmed' as const,
    duration: 40,
    notes: 'Asthma management review. Patient experiencing more frequent episodes during exercise.',
  },
  {
    id: 17,
    patientName: 'Brian Jackson',
    patientPhone: '+1 (555) 789-0126',
    patientEmail: 'brian.jackson@email.com',
    appointmentDate: '2024-01-23',
    appointmentTime: '2:00 PM',
    service: 'Oncology Consultation',
    doctor: 'Dr. Susan Davis',
    status: 'Confirmed' as const,
    duration: 60,
    notes: 'Cancer treatment follow-up. Recent scans show positive response to chemotherapy regimen.',
  },
  {
    id: 18,
    patientName: 'Rachel Green',
    patientPhone: '+1 (555) 890-1237',
    patientEmail: 'rachel.green@email.com',
    appointmentDate: '2024-01-24',
    appointmentTime: '9:15 AM',
    service: 'Allergy Testing',
    doctor: 'Dr. Andrew Wilson',
    status: 'Pending' as const,
    duration: 90,
    notes: 'Comprehensive allergy panel testing for food and environmental allergens. Patient has severe reactions.',
  },
  {
    id: 19,
    patientName: 'Joshua Adams',
    patientPhone: '+1 (555) 901-2348',
    patientEmail: 'joshua.adams@email.com',
    appointmentDate: '2024-01-24',
    appointmentTime: '11:30 AM',
    service: 'Plastic Surgery Consultation',
    doctor: 'Dr. Catherine Moore',
    status: 'Cancelled' as const,
    duration: 45,
    notes: 'Consultation for reconstructive surgery postponed due to patient illness. Will reschedule.',
  },
  {
    id: 20,
    patientName: 'Samantha Hill',
    patientPhone: '+1 (555) 012-3459',
    patientEmail: 'samantha.hill@email.com',
    appointmentDate: '2024-01-24',
    appointmentTime: '3:45 PM',
    service: 'Nutrition Counseling',
    doctor: 'Dr. Laura Phillips',
    status: 'Confirmed' as const,
    duration: 30,
    notes: 'Weight management consultation. Patient has lost 15 pounds following dietary recommendations.',
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