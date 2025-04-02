import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo purposes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login user - Simplified for demo
  const login = async (credentials) => {
    setError(null);
    try {
      setIsLoading(true);
      
      // In a real implementation, this would call an API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Set demo user
      setCurrentUser({
        id: 'demo-user-id',
        name: 'Demo User',
        email: credentials.email || 'demo@example.com',
        role: 'user'
      });
      
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError('Invalid credentials');
      return false;
    } finally {
      setIsLoading(false);
    }
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
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
