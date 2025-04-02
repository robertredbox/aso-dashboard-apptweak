import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  // For this demo, we're hardcoding authentication
  // In a real app, this would check JWT tokens and connect to the backend
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create the value object for the context
  const value = {
    isAuthenticated,
    isLoading,
    error,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
