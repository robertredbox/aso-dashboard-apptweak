import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  // Note: This is a simplified version for demo purposes only
  // In a real app, you would actually check JWT tokens and make API calls
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-logged in for demo
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create the value object for the context
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    // These functions are stubs for the demo version
    register: async () => true,
    login: async () => true,
    logout: () => {},
    updateProfile: async () => true,
    changePassword: async () => true,
    forgotPassword: async () => true,
    resetPassword: async () => true,
    storeApiKeys: async () => true,
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
