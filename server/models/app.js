const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const App = sequelize.define('App', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  platform: {
    type: DataTypes.ENUM('ios', 'android'),
    allowNull: false
  },
  appId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Store-specific app ID (Bundle ID for iOS, Package Name for Android)'
  },
  storeId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'ID used in app stores (iTunes ID for iOS, Google Play ID for Android)'
  },
  iconUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currentVersion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ratingCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  primaryCategory: {
    type: DataTypes.STRING,
    allowNull: true
  },
  secondaryCategory: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primaryLanguage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primaryCountry: {
    type: DataTypes.STRING,
    allowNull: true
  },
  developer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  developerUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trackingSettings: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Settings for tracking this app (refresh rates, notifications, etc.)'
  },
  appStoreConnectId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'ID for App Store Connect integration'
  },
  googlePlayDeveloperId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'ID for Google Play Developer integration'
  },
  appleSearchAdsId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'ID for Apple Search Ads integration'
  },
  lastMetadataRefresh: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastRankingsRefresh: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastReviewsRefresh: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'apps',
  timestamps: true,
  paranoid: true, // Soft deletes
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['platform', 'appId'],
      unique: true
    }
  ]
});

module.exports = App;
