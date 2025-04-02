import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  // For the demo, we'll automatically authenticate the user
  // In a real app, we would actually check the JWT and validate with the backend
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate loading user data
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCurrentUser({
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'user'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1000);
    };
    
    loadUser();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setError(null);
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({
          id: '1',
          name: userData.name,
          email: userData.email,
          role: 'user'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  // Login user
  const login = async (credentials) => {
    setError(null);
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({
          id: '1',
          name: 'Demo User',
          email: credentials.email,
          role: 'user'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
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
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
