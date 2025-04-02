import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-center font-slab">Create an account</h1>
      
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-6">
        <p className="text-blue-700">
          This is a demo application. Registration is disabled in this preview version.
          Please use the login page to access the dashboard with any credentials.
        </p>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
