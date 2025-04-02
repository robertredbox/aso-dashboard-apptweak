import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// App related API calls
const appAPI = {
  // Get all apps for the authenticated user
  getAllApps: () => api.get('/apps'),
  
  // Get app by ID
  getAppById: (id) => api.get(`/apps/${id}`),
  
  // Create a new app
  createApp: (appData) => api.post('/apps', appData),
  
  // Update app
  updateApp: (id, appData) => api.put(`/apps/${id}`, appData),
  
  // Delete app
  deleteApp: (id) => api.delete(`/apps/${id}`),
  
  // Get app metadata from store
  getAppMetadata: (id) => api.get(`/apps/${id}/metadata`),
  
  // Refresh app metadata from store
  refreshAppMetadata: (id) => api.post(`/apps/${id}/refresh-metadata`),
  
  // Search for apps in the stores
  searchApps: (query, platform, country = 'US') => 
    api.get(`/apps/search?query=${query}&platform=${platform}&country=${country}`),
  
  // Get competitors for an app
  getCompetitors: (id) => api.get(`/apps/${id}/competitors`),
  
  // Get ASO report for an app
  getAsoReport: (id) => api.get(`/apps/${id}/aso-report`)
};

// Keyword related API calls
const keywordAPI = {
  // Get all keywords for an app
  getKeywords: (appId) => api.get(`/keywords?appId=${appId}`),
  
  // Get keyword by ID
  getKeywordById: (id) => api.get(`/keywords/${id}`),
  
  // Track new keywords for an app
  trackKeywords: (appId, keywords) => api.post('/keywords/track', { appId, keywords }),
  
  // Get keyword stats
  getKeywordStats: (keywords, platform, country = 'US', device = 'iphone') => 
    api.post('/keywords/stats', { keywords, platform, country, device }),
  
  // Get keyword rankings history
  getKeywordRankingsHistory: (appId, keyword, startDate, endDate) => 
    api.get(`/keywords/history?appId=${appId}&keyword=${keyword}&startDate=${startDate}&endDate=${endDate}`),
  
  // Discover new keywords based on seed
  discoverKeywords: (query, platform, country = 'US', limit = 20) => 
    api.get(`/keywords/discover?query=${query}&platform=${platform}&country=${country}&limit=${limit}`),
};

// Review related API calls
const reviewAPI = {
  // Get reviews for an app
  getReviews: (appId, page = 1, limit = 20) => 
    api.get(`/reviews?appId=${appId}&page=${page}&limit=${limit}`),
  
  // Get review stats for an app
  getReviewStats: (appId) => api.get(`/reviews/stats?appId=${appId}`),
  
  // Search reviews
  searchReviews: (appId, query, minRating, maxRating) => 
    api.get(`/reviews/search?appId=${appId}&query=${query}${minRating ? `&minRating=${minRating}` : ''}${maxRating ? `&maxRating=${maxRating}` : ''}`)
};

// Category related API calls
const categoryAPI = {
  // Get category rankings for an app
  getCategoryRankings: (appId, categoryId, startDate, endDate) => 
    api.get(`/categories/rankings?appId=${appId}&categoryId=${categoryId}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`),
  
  // Get top category apps
  getTopCategoryApps: (categoryId, platform, country = 'US', limit = 20) => 
    api.get(`/categories/top-apps?categoryId=${categoryId}&platform=${platform}&country=${country}&limit=${limit}`)
};

// Analytics related API calls
const analyticsAPI = {
  // Get dashboard data
  getDashboardData: (timeframe = '3m') => api.get(`/analytics/dashboard?timeframe=${timeframe}`),
  
  // Get app performance metrics
  getAppPerformance: (appId, startDate, endDate) => 
    api.get(`/analytics/performance?appId=${appId}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`),
  
  // Get keyword performance metrics
  getKeywordPerformance: (appId, keywords, startDate, endDate) => 
    api.post(`/analytics/keyword-performance`, { appId, keywords, startDate, endDate }),
  
  // Get organic vs paid correlation
  getOrganicPaidCorrelation: (appId, timeframe = '3m') => 
    api.get(`/analytics/organic-paid-correlation?appId=${appId}&timeframe=${timeframe}`),
  
  // Get ASO insights
  getInsights: (appId) => api.get(`/analytics/insights?appId=${appId}`)
};

export {
  api,
  appAPI,
  keywordAPI,
  reviewAPI,
  categoryAPI,
  analyticsAPI
};
