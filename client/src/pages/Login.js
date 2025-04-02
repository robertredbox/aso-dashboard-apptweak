import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For demo purposes, just call the login function directly
      login();
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-center font-slab">Sign in to your account</h1>
      
      {error && (
        <div className="mb-4 flex items-center p-4 text-red-700 bg-red-100 rounded-md">
          <FiAlertCircle className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-6">
        <h2 className="font-medium text-blue-700 mb-2">Demo Mode</h2>
        <p className="text-blue-600 text-sm">
          This is a demo version of the ASO Dashboard. You can click the Sign in button without entering credentials.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="input pl-10"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="input pl-10"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
