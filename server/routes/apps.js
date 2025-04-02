const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const appController = require('../controllers/app.controller');

/**
 * @route   GET /api/apps
 * @desc    Get all apps for authenticated user
 * @access  Private
 */
router.get('/', auth, appController.getAllApps);

/**
 * @route   GET /api/apps/:id
 * @desc    Get app by ID
 * @access  Private
 */
router.get('/:id', auth, appController.getAppById);

/**
 * @route   POST /api/apps
 * @desc    Create a new app
 * @access  Private
 */
router.post('/', [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('platform', 'Platform must be ios or android').isIn(['ios', 'android']),
  check('appId', 'App ID is required').not().isEmpty(),
  check('storeId', 'Store ID is required').not().isEmpty()
], appController.createApp);

/**
 * @route   PUT /api/apps/:id
 * @desc    Update app
 * @access  Private
 */
router.put('/:id', [
  auth,
  check('name', 'Name is required').optional().not().isEmpty(),
  check('platform', 'Platform must be ios or android').optional().isIn(['ios', 'android'])
], appController.updateApp);

/**
 * @route   DELETE /api/apps/:id
 * @desc    Delete app
 * @access  Private
 */
router.delete('/:id', auth, appController.deleteApp);

/**
 * @route   GET /api/apps/:id/metadata
 * @desc    Get app metadata from store
 * @access  Private
 */
router.get('/:id/metadata', auth, appController.getAppMetadata);

/**
 * @route   POST /api/apps/:id/refresh-metadata
 * @desc    Refresh app metadata from store
 * @access  Private
 */
router.post('/:id/refresh-metadata', auth, appController.refreshAppMetadata);

/**
 * @route   GET /api/apps/search
 * @desc    Search for apps in the stores
 * @access  Private
 */
router.get('/search', [
  auth,
  check('query', 'Search query is required').not().isEmpty(),
  check('platform', 'Platform must be ios or android').isIn(['ios', 'android']),
  check('country', 'Country code is required').isLength({ min: 2, max: 2 })
], appController.searchApps);

/**
 * @route   GET /api/apps/:id/competitors
 * @desc    Get competitors for an app
 * @access  Private
 */
router.get('/:id/competitors', auth, appController.getCompetitors);

/**
 * @route   GET /api/apps/:id/aso-report
 * @desc    Get ASO report for an app
 * @access  Private
 */
router.get('/:id/aso-report', auth, appController.getAsoReport);

module.exports = router;
