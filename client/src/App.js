import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Apps from './pages/Apps';
import AppDetail from './pages/AppDetail';
import Keywords from './pages/Keywords';
import KeywordDetail from './pages/KeywordDetail';
import Reviews from './pages/Reviews';
import Categories from './pages/Categories';
import Competitors from './pages/Competitors';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><Navigate to="/login" /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><AuthLayout><Login /></AuthLayout></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><AuthLayout><Register /></AuthLayout></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><AuthLayout><ForgotPassword /></AuthLayout></PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/apps" element={<ProtectedRoute><DashboardLayout><Apps /></DashboardLayout></ProtectedRoute>} />
      <Route path="/apps/:id" element={<ProtectedRoute><DashboardLayout><AppDetail /></DashboardLayout></ProtectedRoute>} />
      <Route path="/keywords" element={<ProtectedRoute><DashboardLayout><Keywords /></DashboardLayout></ProtectedRoute>} />
      <Route path="/keywords/:id" element={<ProtectedRoute><DashboardLayout><KeywordDetail /></DashboardLayout></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><DashboardLayout><Reviews /></DashboardLayout></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><DashboardLayout><Categories /></DashboardLayout></ProtectedRoute>} />
      <Route path="/competitors" element={<ProtectedRoute><DashboardLayout><Competitors /></DashboardLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
