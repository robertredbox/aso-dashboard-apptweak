import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { keywordAPI } from '../../services/api';

const KeywordRankingChart = ({ appId, keyword, startDate, endDate, competitors = [] }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await keywordAPI.getKeywordRankingsHistory(appId, keyword, startDate, endDate);
      
      if (response.data.status === 'success') {
        // Format data for the chart
        const formattedData = response.data.data.map(item => ({
          date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          appRanking: item.ranking,
          ...item.competitorData // This would include competitor rankings
        }));
        
        setData(formattedData);
      } else {
        setError('Failed to fetch ranking data');
      }
    } catch (err) {
      console.error('Error fetching keyword ranking history:', err);
      setError(err.response?.data?.message || 'An error occurred while fetching ranking data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [appId, keyword, startDate, endDate]);

  // Define line colors for the chart
  const appLineColor = '#0066ff';
  const competitorColors = ['#82ca9d', '#8884d8', '#ffc658', '#ff7300'];

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
          <p className="text-gray-500">No ranking data available for this keyword.</p>
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

  // Custom tooltip for better display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }} className="flex items-center">
              <span className="w-3 h-3 inline-block mr-1" style={{ backgroundColor: entry.color }}></span>
              <span>{entry.name}: </span>
              <span className="ml-1 font-semibold">#{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-slab font-medium text-gray-800">
          "{keyword}" Ranking History
        </h3>
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
          <YAxis reversed domain={[1, dataMax => Math.max(100, dataMax * 1.1)]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* App's ranking line */}
          <Line 
            type="monotone" 
            dataKey="appRanking" 
            stroke={appLineColor} 
            name="Your App" 
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
          
          {/* Competitor ranking lines */}
          {competitors.map((competitor, index) => (
            <Line
              key={competitor.id}
              type="monotone"
              dataKey={`comp_${competitor.id}`}
              stroke={competitorColors[index % competitorColors.length]}
              name={competitor.name}
              strokeDasharray="5 5"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4">
        <p className="text-xs text-gray-500">
          * Lower values indicate better rankings (1 is the top position)
        </p>
      </div>
    </div>
  );
};

export default KeywordRankingChart;
