import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (via token in localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      // Set default auth header for all requests
      axios.defaults.headers.common['x-auth-token'] = token;
      
      try {
        const res = await axios.get('/api/auth/profile');
        
        if (res.data.status === 'success') {
          setCurrentUser(res.data.data);
          setIsAuthenticated(true);
        } else {
          // Handle invalid token
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
        }
      } catch (err) {
        console.error('Auth check error:', err);
        // Clear potentially invalid token
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setCurrentUser(res.data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      return false;
    }
  };

  // Login user
  const login = async (credentials) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', credentials);
      
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setCurrentUser(res.data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    setError(null);
    try {
      const res = await axios.put('/api/auth/profile', profileData);
      
      if (res.data.status === 'success') {
        setCurrentUser(res.data.data);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
      return false;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    setError(null);
    try {
      const res = await axios.put('/api/auth/change-password', passwordData);
      return res.data.status === 'success';
    } catch (err) {
      setError(err.response?.data?.message || 'Error changing password');
      return false;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      return res.data.status === 'success';
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing request');
      return false;
    }
  };

  // Reset password
  const resetPassword = async (resetData) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/reset-password', resetData);
      return res.data.status === 'success';
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
      return false;
    }
  };

  // Store API keys
  const storeApiKeys = async (apiKeys) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/api-keys', apiKeys);
      return res.data.status === 'success';
    } catch (err) {
      setError(err.response?.data?.message || 'Error storing API keys');
      return false;
    }
  };

  // Clear errors
  const clearError = () => {
    setError(null);
  };

  // Create the value object for the context
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    storeApiKeys,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
