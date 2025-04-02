const { validationResult } = require('express-validator');
const { App } = require('../models');
const appTweakService = require('../services/apptweak');
const logger = require('../utils/logger');

// Helper function to handle errors
const handleError = (res, error) => {
  logger.error(`App controller error: ${error.message}`);
  return res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message || 'Server Error'
  });
};

// Get all apps for the authenticated user
exports.getAllApps = async (req, res) => {
  try {
    const apps = await App.findAll({
      where: { userId: req.user.id },
      order: [['updatedAt', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      count: apps.length,
      data: apps
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Get app by ID
exports.getAppById = async (req, res) => {
  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: app
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Create a new app
exports.createApp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    // Check if app already exists for this user
    const existingApp = await App.findOne({
      where: {
        userId: req.user.id,
        platform: req.body.platform,
        appId: req.body.appId
      }
    });

    if (existingApp) {
      return res.status(400).json({
        status: 'error',
        message: 'App already exists for this user'
      });
    }

    // Create the app
    const newApp = await App.create({
      ...req.body,
      userId: req.user.id
    });

    // Fetch additional metadata from AppTweak
    try {
      const appDetails = await appTweakService.getAppDetails(
        req.body.storeId,
        req.body.platform,
        req.body.primaryCountry || 'US'
      );

      // Update app with fetched metadata
      await newApp.update({
        iconUrl: appDetails.icon,
        currentVersion: appDetails.version,
        description: appDetails.description,
        price: appDetails.price,
        currency: appDetails.currency,
        rating: appDetails.rating,
        ratingCount: appDetails.rating_count,
        primaryCategory: appDetails.primary_category,
        secondaryCategory: appDetails.secondary_category,
        developer: appDetails.developer,
        developerUrl: appDetails.developer_url,
        lastMetadataRefresh: new Date()
      });
    } catch (metadataError) {
      logger.warn(`Could not fetch app metadata: ${metadataError.message}`);
      // Continue without metadata - we'll fetch it later
    }

    return res.status(201).json({
      status: 'success',
      data: newApp
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Update app
exports.updateApp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    // Update the app
    await app.update(req.body);

    return res.status(200).json({
      status: 'success',
      data: app
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Delete app
exports.deleteApp = async (req, res) => {
  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    // Delete the app (soft delete due to paranoid: true)
    await app.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'App deleted successfully'
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Get app metadata from store
exports.getAppMetadata = async (req, res) => {
  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    // Fetch metadata from AppTweak
    const appDetails = await appTweakService.getAppDetails(
      app.storeId,
      app.platform,
      app.primaryCountry || 'US'
    );

    return res.status(200).json({
      status: 'success',
      data: appDetails
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Refresh app metadata from store
exports.refreshAppMetadata = async (req, res) => {
  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    // Fetch metadata from AppTweak
    const appDetails = await appTweakService.getAppDetails(
      app.storeId,
      app.platform,
      app.primaryCountry || 'US'
    );

    // Update app with fetched metadata
    await app.update({
      iconUrl: appDetails.icon,
      currentVersion: appDetails.version,
      description: appDetails.description,
      price: appDetails.price,
      currency: appDetails.currency,
      rating: appDetails.rating,
      ratingCount: appDetails.rating_count,
      primaryCategory: appDetails.primary_category,
      secondaryCategory: appDetails.secondary_category,
      developer: appDetails.developer,
      developerUrl: appDetails.developer_url,
      lastMetadataRefresh: new Date()
    });

    return res.status(200).json({
      status: 'success',
      message: 'App metadata refreshed successfully',
      data: app
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Search for apps in the stores
exports.searchApps = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  try {
    const { query, platform, country = 'US', language = 'en' } = req.query;

    // Search for apps using AppTweak
    const searchResults = await appTweakService.searchApps(
      query,
      platform,
      country,
      language
    );

    return res.status(200).json({
      status: 'success',
      count: searchResults.length,
      data: searchResults
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Get competitors for an app
exports.getCompetitors = async (req, res) => {
  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    // Fetch competitors from AppTweak
    const competitors = await appTweakService.getCompetitors(
      app.storeId,
      app.platform,
      app.primaryCountry || 'US',
      app.primaryLanguage || 'en'
    );

    return res.status(200).json({
      status: 'success',
      count: competitors.length,
      data: competitors
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Get ASO report for an app
exports.getAsoReport = async (req, res) => {
  try {
    const app = await App.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!app) {
      return res.status(404).json({
        status: 'error',
        message: 'App not found'
      });
    }

    // Fetch ASO report from AppTweak
    const asoReport = await appTweakService.getAsoReport(
      app.storeId,
      app.platform,
      app.primaryCountry || 'US',
      app.primaryLanguage || 'en'
    );

    return res.status(200).json({
      status: 'success',
      data: asoReport
    });
  } catch (error) {
    return handleError(res, error);
  }
};
