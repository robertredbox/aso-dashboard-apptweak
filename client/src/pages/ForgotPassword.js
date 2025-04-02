import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-center font-slab">Reset your password</h1>
      
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-6">
        <p className="text-blue-700">
          This is a demo application. Password reset is disabled in this preview version.
          Please return to the login page to access the dashboard with any credentials.
        </p>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
