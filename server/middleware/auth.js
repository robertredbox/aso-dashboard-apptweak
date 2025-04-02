const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../utils/logger');

/**
 * Authentication middleware
 * Validates JWT token and sets req.user
 */
module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      status: 'error',
      message: 'No authentication token, authorization denied' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findByPk(decoded.id);
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Token is not valid' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ 
        status: 'error',
        message: 'User account is inactive' 
      });
    }

    // Add user to request
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    // Update last login time
    await user.update({ lastLogin: new Date() });
    
    next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    
    return res.status(401).json({ 
      status: 'error',
      message: 'Token is not valid' 
    });
  }
};
