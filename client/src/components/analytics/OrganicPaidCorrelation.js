import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { FiAlertCircle, FiRefreshCw, FiInfo } from 'react-icons/fi';
import { analyticsAPI } from '../../services/api';

const OrganicPaidCorrelation = ({ appId, timeframe = '3m' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correlationScore, setCorrelationScore] = useState(null);
  const [insights, setInsights] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await analyticsAPI.getOrganicPaidCorrelation(appId, timeframe);
      
      if (response.data.status === 'success') {
        // Format the data for the chart
        const formattedData = response.data.data.dailyData.map(item => ({
          date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          paidSpend: item.paidSpend,
          organicInstalls: item.organicInstalls,
          paidInstalls: item.paidInstalls,
          organicImpressions: item.organicImpressions,
          organicRanking: item.organicRanking
        }));
        
        setData(formattedData);
        setCorrelationScore(response.data.data.correlationScore);
        setInsights(response.data.data.insights || []);
      } else {
        setError('Failed to fetch correlation data');
      }
    } catch (err) {
      console.error('Error fetching organic-paid correlation:', err);
      setError(err.response?.data?.message || 'An error occurred while fetching correlation data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [appId, timeframe]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiRefreshCw className="animate-spin h-8 w-8 text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <div>
          <FiAlertCircle className="h-10 w-10 text-error-500 mx-auto mb-2" />
          <p className="text-error-700">{error}</p>
          <button 
            onClick={fetchData} 
            className="mt-4 btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <div>
          <p className="text-gray-500">No correlation data available for this app.</p>
          <button 
            onClick={fetchData} 
            className="mt-4 btn-primary"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Get correlation interpretation
  const getCorrelationInterpretation = (score) => {
    if (score >= 0.7) return { text: 'Strong Positive', color: 'text-success-600' };
    if (score >= 0.5) return { text: 'Moderate Positive', color: 'text-success-500' };
    if (score >= 0.3) return { text: 'Weak Positive', color: 'text-success-400' };
    if (score >= -0.3) return { text: 'Negligible', color: 'text-gray-500' };
    if (score >= -0.5) return { text: 'Weak Negative', color: 'text-error-400' };
    if (score >= -0.7) return { text: 'Moderate Negative', color: 'text-error-500' };
    return { text: 'Strong Negative', color: 'text-error-600' };
  };

  const correlationInfo = getCorrelationInterpretation(correlationScore);

  // Custom tooltip for better display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => {
            let displayValue = entry.value;
            // Format based on the data type
            if (entry.dataKey === 'paidSpend') {
              displayValue = `$${entry.value.toLocaleString()}`;
            } else if (entry.dataKey === 'organicRanking') {
              displayValue = `#${entry.value}`;
            } else {
              displayValue = entry.value.toLocaleString();
            }
            
            return (
              <p key={`tooltip-${index}`} style={{ color: entry.color }} className="flex items-center">
                <span className="w-3 h-3 inline-block mr-1" style={{ backgroundColor: entry.color }}></span>
                <span>{entry.name}: </span>
                <span className="ml-1 font-semibold">{displayValue}</span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-slab font-medium text-gray-800">
            Organic & Paid Correlation
          </h3>
          
          <div className="mt-1 flex items-center">
            <span className="mr-2 text-gray-600 text-sm">Correlation Score:</span>
            <span className={`font-medium ${correlationInfo.color}`}>
              {correlationScore !== null ? correlationScore.toFixed(2) : 'N/A'} 
              <span className="ml-1">({correlationInfo.text})</span>
            </span>
          </div>
        </div>
        
        <button 
          onClick={fetchData} 
          className="text-primary-600 hover:text-primary-800 flex items-center text-sm"
          disabled={loading}
        >
          <FiRefreshCw className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#0066ff" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="paidSpend" 
            stroke="#0066ff" 
            name="Paid Spend ($)" 
            dot={false}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="organicImpressions" 
            stroke="#82ca9d" 
            name="Organic Impressions" 
            dot={false}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="organicInstalls" 
            stroke="#8884d8" 
            name="Organic Installs" 
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Insights section */}
      {insights.length > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-700 flex items-center mb-2">
            <FiInfo className="mr-1" /> 
            Correlation Insights
          </h4>
          <ul className="text-sm text-blue-800 space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4">
        <p className="text-xs text-gray-500">
          * Correlation Score ranges from -1 to 1. Positive values indicate that paid campaigns may be helping organic growth.
        </p>
      </div>
    </div>
  );
};

export default OrganicPaidCorrelation;
