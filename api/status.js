/**
 * API Status endpoint
 * 
 * This serverless function handles the /api/status route,
 * providing basic status information about the API.
 */

module.exports = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
};
