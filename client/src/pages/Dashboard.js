import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowUp, 
  FiArrowDown, 
  FiDownload, 
  FiSearch, 
  FiStar, 
  FiTrendingUp, 
  FiAlertCircle,
  FiRefreshCw 
} from 'react-icons/fi';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from 'axios';

// Sample data (would come from API)
const sampleData = {
  keywordRankings: [
    { date: 'Jan 1', ranking: 45 },
    { date: 'Jan 8', ranking: 42 },
    { date: 'Jan 15', ranking: 38 },
    { date: 'Jan 22', ranking: 31 },
    { date: 'Jan 29', ranking: 28 },
    { date: 'Feb 5', ranking: 25 },
    { date: 'Feb 12', ranking: 18 },
    { date: 'Feb 19', ranking: 15 },
    { date: 'Feb 26', ranking: 12 },
    { date: 'Mar 5', ranking: 10 },
    { date: 'Mar 12', ranking: 8 },
    { date: 'Mar 19', ranking: 7 },
    { date: 'Mar 26', ranking: 5 },
  ],
  installs: [
    { date: 'Jan', organic: 1200, paid: 800 },
    { date: 'Feb', organic: 1800, paid: 1200 },
    { date: 'Mar', organic: 2400, paid: 1000 },
    { date: 'Apr', organic: 3000, paid: 1500 },
  ],
  conversionRate: [
    { date: 'Week 1', rate: 3.2 },
    { date: 'Week 2', rate: 3.5 },
    { date: 'Week 3', rate: 4.1 },
    { date: 'Week 4', rate: 3.8 },
    { date: 'Week 5', rate: 4.3 },
    { date: 'Week 6', rate: 4.2 },
    { date: 'Week 7', rate: 4.5 },
    { date: 'Week 8', rate: 4.8 },
    { date: 'Week 9', rate: 5.1 },
    { date: 'Week 10', rate: 5.3 },
    { date: 'Week 11', rate: 5.2 },
    { date: 'Week 12', rate: 5.4 },
  ],
  keywordDistribution: [
    { name: 'Top 3', value: 12 },
    { name: 'Top 10', value: 20 },
    { name: 'Top 50', value: 35 },
    { name: '50+', value: 33 },
  ],
  ratings: {
    average: 4.7,
    count: 12483,
    distribution: [
      { rating: '5', count: 8965 },
      { rating: '4', count: 2342 },
      { rating: '3', count: 768 },
      { rating: '2', count: 245 },
      { rating: '1', count: 163 },
    ]
  },
  recentReviews: [
    { id: 1, rating: 5, title: 'Amazing app!', content: 'This app has completely transformed my workflow...', date: '2 days ago', user: 'John D.' },
    { id: 2, rating: 4, title: 'Very useful', content: 'I love using this app but would like to see more features...', date: '3 days ago', user: 'Sarah M.' },
    { id: 3, rating: 5, title: 'Highly recommend', content: 'Best app in its category, hands down...', date: '5 days ago', user: 'Mike T.' },
  ],
  insights: [
    { id: 1, type: 'positive', title: 'Keyword "photo editor" improved by 15 positions', description: 'Now ranking #5, up from #20 last week.' },
    { id: 2, type: 'negative', title: 'Conversion rate dropped for iPad users', description: 'iPad conversion rate is 2.3%, down from 3.5% last month.' },
    { id: 3, type: 'neutral', title: 'New competitor detected', description: 'App "PhotoPro" is now competing for 7 of your top keywords.' },
  ]
};

// Colors for charts
const COLORS = ['#0066ff', '#82ca9d', '#8884d8', '#ffc658', '#ff7300'];
const PIE_COLORS = ['#0066ff', '#00aaff', '#66ccff', '#cceeff'];

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('3m'); // 1w, 1m, 3m, 6m, 1y

  // In a real app, we would fetch data from API based on timeframe
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would call our API
        // const response = await axios.get(`/api/dashboard?timeframe=${timeframe}`);
        // setData(response.data);
        
        // Simulate API call with timeout
        setTimeout(() => {
          setData(sampleData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeframe]);

  const getChangeIndicator = (value, isPositive = true) => {
    const Icon = isPositive ? FiArrowUp : FiArrowDown;
    const colorClass = isPositive ? 'text-success-600' : 'text-error-600';
    
    return (
      <span className={`inline-flex items-center ${colorClass}`}>
        <Icon size={16} className="mr-1" />
        {value}
      </span>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-slab font-medium text-gray-800">Dashboard</h1>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="mr-4">
            <select
              className="input py-1"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              disabled={isLoading}
            >
              <option value="1w">Last week</option>
              <option value="1m">Last month</option>
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          
          <button 
            className="btn-primary py-1 flex items-center"
            onClick={() => setTimeframe(timeframe)} // This would refetch data
            disabled={isLoading}
          >
            <FiRefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
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
                  <span className="ml-2">
                    {getChangeIndicator('+12.5%')}
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
                  <span className="ml-2">
                    {getChangeIndicator('+3.1', true)}
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
                <FiTrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">5.4%</p>
                  <span className="ml-2">
                    {getChangeIndicator('+0.8%', true)}
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
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Keyword Rankings Trend */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-slab font-medium text-gray-800">Keyword Rankings Trend</h2>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.keywordRankings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={[1, 50]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ranking" stroke="#0066ff" activeDot={{ r: 8 }} name="Avg. Ranking" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Installs: Organic vs Paid */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-slab font-medium text-gray-800">Installs: Organic vs Paid</h2>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.installs} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="organic" fill="#0066ff" name="Organic" />
                <Bar dataKey="paid" fill="#82ca9d" name="Paid" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Secondary Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Keyword Distribution */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-slab font-medium text-gray-800">Keyword Distribution</h2>
          </div>
          <div className="card-body flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.keywordDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.keywordDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversion Rate Trend */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-slab font-medium text-gray-800">Conversion Rate Trend</h2>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.conversionRate} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 6]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" name="Conversion Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* ASO Insights */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-slab font-medium text-gray-800">ASO Insights</h2>
          </div>
          <div className="card-body p-0">
            <ul className="divide-y divide-gray-200">
              {data.insights.map(insight => (
                <li key={insight.id} className="p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {insight.type === 'positive' && <FiArrowUp className="h-5 w-5 text-success-600" />}
                      {insight.type === 'negative' && <FiArrowDown className="h-5 w-5 text-error-600" />}
                      {insight.type === 'neutral' && <FiAlertCircle className="h-5 w-5 text-warning-600" />}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                      <p className="text-sm text-gray-500">{insight.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer">
            <Link to="/insights" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all insights →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Reviews */}
      <div className="card mb-6">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-slab font-medium text-gray-800">Recent Reviews</h2>
          <Link to="/reviews" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all →
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="divide-y divide-gray-200">
            {data.recentReviews.map(review => (
              <div key={review.id} className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600">
                      {review.user.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{review.title}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{review.content}</p>
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                      <span>{review.user}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
