import React from 'react';
import { Link } from 'react-router-dom';

const Apps = () => {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-slab font-medium text-gray-800">Your Apps</h1>
        <button className="btn-primary">Add New App</button>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-slab font-medium text-gray-800">Manage Your Apps</h2>
        </div>
        <div className="card-body">
          <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-blue-700">
              This is a demo page. App management functionality will be available in the full version.
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-gray-800 mb-4">Demo Apps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Demo App Card 1 */}
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Demo App 1</h4>
                    <p className="text-sm text-gray-500">com.example.demoapp</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Platform</p>
                      <p className="font-medium">iOS</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <p className="font-medium">4.7 ★</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white border-t text-right">
                  <Link to="/apps/demo1" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Demo App Card 2 */}
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">B</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Demo App 2</h4>
                    <p className="text-sm text-gray-500">com.example.demoapp2</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Platform</p>
                      <p className="font-medium">Android</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <p className="font-medium">4.3 ★</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white border-t text-right">
                  <Link to="/apps/demo2" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
