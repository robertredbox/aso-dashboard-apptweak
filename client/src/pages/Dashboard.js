import React, { useState, useEffect } from 'react';
import { FiArrowUp, FiDownload, FiSearch, FiStar } from 'react-icons/fi';

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState('Loading...');
  const [apiTimestamp, setApiTimestamp] = useState(null);

  useEffect(() => {
    // Check API status on component mount
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        if (data.status === 'success') {
          setApiStatus('Connected');
          setApiTimestamp(data.timestamp);
        } else {
          setApiStatus('Error');
        }
      } catch (error) {
        console.error('API check failed:', error);
        setApiStatus('Disconnected');
      }
    };
    
    checkApiStatus();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-slab font-medium text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your ASO Dashboard with AppTweak integration
        </p>
        <div className="mt-2 text-sm">
          <span className="mr-2">API Status:</span>
          <span className={`font-medium ${apiStatus === 'Connected' ? 'text-success-600' : 'text-error-600'}`}>
            {apiStatus}
          </span>
          {apiTimestamp && (
            <span className="ml-2 text-gray-500">
              Last updated: {new Date(apiTimestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* App Installs Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-blue-100 mr-4">
                <FiDownload className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">App Installs (30d)</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">8,942</p>
                  <span className="ml-2 inline-flex items-center text-success-600">
                    <FiArrowUp size={16} className="mr-1" />
                    12.5%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Keyword Rankings Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100 mr-4">
                <FiSearch className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Keyword Ranking</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">5.2</p>
                  <span className="ml-2 inline-flex items-center text-success-600">
                    <FiArrowUp size={16} className="mr-1" />
                    3.1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conversion Rate Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100 mr-4">
                <FiArrowUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">5.4%</p>
                  <span className="ml-2 inline-flex items-center text-success-600">
                    <FiArrowUp size={16} className="mr-1" />
                    0.8%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Rating Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-yellow-100 mr-4">
                <FiStar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">App Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">4.7</p>
                  <span className="ml-2">
                    <span className="text-gray-500 text-sm">(12.4k reviews)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content placeholder */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-slab font-medium text-gray-800">Deployment Status</h2>
        </div>
        <div className="card-body">
          <div className="p-4 bg-success-50 rounded-md border border-success-200">
            <h3 className="font-medium text-success-700 mb-2">Success!</h3>
            <p className="text-success-600">
              Your ASO Dashboard is now successfully deployed on Vercel. This is a simplified version
              of the dashboard for demonstration purposes.
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Next Steps:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Connect your AppTweak API key to start pulling real data</li>
              <li>Set up the database for storing historical data</li>
              <li>Implement the remaining UI components</li>
              <li>Develop the analytics engine for generating insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
