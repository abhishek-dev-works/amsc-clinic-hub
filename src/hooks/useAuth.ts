import { useState, useEffect } from 'react';

interface AuthUser {
  email: string;
  name: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const DEMO_CREDENTIALS = {
  email: 'admin@amsc.com',
  password: 'admin123',
};

const DEMO_USER: AuthUser = {
  email: 'admin@amsc.com',
  name: 'Admin User',
  role: 'admin',
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('amsc_auth_token');
    const userData = localStorage.getItem('amsc_user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error('Invalid user data in localStorage');
        localStorage.removeItem('amsc_auth_token');
        localStorage.removeItem('amsc_user_data');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setError(null);
    
    try {
      // Demo authentication logic
      if (
        credentials.email === DEMO_CREDENTIALS.email && 
        credentials.password === DEMO_CREDENTIALS.password
      ) {
        // Generate a mock token
        const token = `amsc_token_${Date.now()}`;
        
        // Store token and user data
        localStorage.setItem('amsc_auth_token', token);
        localStorage.setItem('amsc_user_data', JSON.stringify(DEMO_USER));
        
        setUser(DEMO_USER);
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('amsc_auth_token');
    localStorage.removeItem('amsc_user_data');
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
  };
};