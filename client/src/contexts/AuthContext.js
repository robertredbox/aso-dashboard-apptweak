import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  // For demo purposes, we'll skip actual authentication and assume the user is logged in
  const [currentUser, setCurrentUser] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'user'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create the value object for the context
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
