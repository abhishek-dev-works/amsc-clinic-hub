import { createTheme } from '@mui/material/styles';

// AMSC Clinic MUI Theme - Professional Medical Design
export const amscTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(210, 100%, 50%)', // Medical Blue
      dark: 'hsl(210, 100%, 45%)',
      light: 'hsl(210, 100%, 60%)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'hsl(210, 15%, 95%)', // Clean Medical Gray
      dark: 'hsl(210, 15%, 85%)',
      light: 'hsl(210, 15%, 98%)',
      contrastText: 'hsl(210, 15%, 30%)',
    },
    success: {
      main: 'hsl(140, 50%, 45%)', // Medical Green
      contrastText: '#ffffff',
    },
    warning: {
      main: 'hsl(35, 90%, 55%)', // Medical Orange
      contrastText: '#ffffff',
    },
    error: {
      main: 'hsl(0, 70%, 50%)', // Medical Red
      contrastText: '#ffffff',
    },
    info: {
      main: 'hsl(180, 50%, 40%)', // Medical Teal
      contrastText: '#ffffff',
    },
    background: {
      default: 'hsl(210, 20%, 98%)',
      paper: '#ffffff',
    },
    text: {
      primary: 'hsl(210, 15%, 20%)',
      secondary: 'hsl(210, 10%, 45%)',
    },
    divider: 'hsl(210, 20%, 88%)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: 'hsl(210, 15%, 20%)',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: 'hsl(210, 15%, 20%)',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: 'hsl(210, 15%, 20%)',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: 'hsl(210, 15%, 20%)',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: 'hsl(210, 15%, 20%)',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: 'hsl(210, 15%, 20%)',
    },
    body1: {
      fontSize: '1rem',
      color: 'hsl(210, 15%, 25%)',
    },
    body2: {
      fontSize: '0.875rem',
      color: 'hsl(210, 10%, 45%)',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
  ] as const,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: 'hsl(210, 15%, 20%)',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'hsl(210, 20%, 98%)',
          borderRight: '1px solid hsl(210, 20%, 88%)',
        },
      },
    },
  },
});