import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-slab font-medium text-primary-600">
          ASO Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          App Store Optimization with AppTweak
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ASO Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
