import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiSearch, FiStar, FiTrendingUp } from 'react-icons/fi';

const AppDetail = () => {
  const { id } = useParams();
  
  // In a real app, we would fetch the app details based on the ID
  const appName = id === 'demo1' ? 'Demo App 1' : 'Demo App 2';
  const platform = id === 'demo1' ? 'iOS' : 'Android';
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/apps" className="flex items-center text-primary-600 mb-4">
          <FiArrowLeft className="mr-1" /> Back to Apps
        </Link>
        <h1 className="text-2xl font-slab font-medium text-gray-800">{appName}</h1>
        <p className="text-gray-600">
          Platform: {platform} | ID: {id === 'demo1' ? 'com.example.demoapp' : 'com.example.demoapp2'}
        </p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Downloads Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-blue-100 mr-4">
                <FiDownload className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Downloads (30d)</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {id === 'demo1' ? '12,450' : '8,320'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Keywords Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100 mr-4">
                <FiSearch className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tracked Keywords</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {id === 'demo1' ? '42' : '35'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conversion Rate Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100 mr-4">
                <FiTrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {id === 'demo1' ? '5.4%' : '4.8%'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ratings Card */}
        <div className="card">
          <div className="p-4">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-yellow-100 mr-4">
                <FiStar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {id === 'demo1' ? '4.7' : '4.3'}
                  </p>
                  <span className="ml-2">
                    <span className="text-gray-500 text-sm">
                      ({id === 'demo1' ? '3.2k' : '1.8k'} reviews)
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo Content */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-slab font-medium text-gray-800">App Details</h2>
        </div>
        <div className="card-body">
          <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-blue-700">
              This is a demo page. Full app details and analytics will be available in the complete version.
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-4">Available Metrics</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Keyword Rankings & Trends</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>App Store Optimization Score</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Review Analysis & Sentiment</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Competitor Tracking</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Organic vs Paid Correlation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;
