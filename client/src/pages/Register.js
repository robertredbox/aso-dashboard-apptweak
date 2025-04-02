import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
      <h2 className="font-medium text-blue-700 mb-2">Demo Mode</h2>
      <p className="text-blue-600 mb-4">
        Registration is not available in the demo version. Please use the demo login instead.
      </p>
      <Link 
        to="/login" 
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default Register;
