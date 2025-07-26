import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import amscLogo from '@/assets/amsc-logo.png';

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  error?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      onLogin({ email, password });
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
          <CardContent>
            {/* Logo and Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img 
                src={amscLogo} 
                alt="AMSC Logo" 
                style={{ 
                  width: 80, 
                  height: 80, 
                  marginBottom: 16,
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                AMSC Admin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Advanced Multi Specialty Clinic
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Sign in to access the admin portal
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            {/* Demo Credentials */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: 'secondary.main', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                Email: admin@amsc.com<br />
                Password: admin123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;