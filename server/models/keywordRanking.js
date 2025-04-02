const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KeywordRanking = sequelize.define('KeywordRanking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  appId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Apps',
      key: 'id'
    }
  },
  keyword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ranking: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Position in search results (null if not ranked in top 200)'
  },
  rankingHistory: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Historical ranking data for comparison'
  },
  country: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: 'ISO 2-letter country code'
  },
  language: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: 'ISO 2-letter language code'
  },
  device: {
    type: DataTypes.ENUM('iphone', 'ipad', 'android'),
    allowNull: false
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Search volume for the keyword (if available)'
  },
  difficulty: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Difficulty score (0-100)'
  },
  chance: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Chance score (0-100)'
  },
  relevancy: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Relevancy score (0-100)'
  },
  competitorData: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Rankings of competitor apps for the same keyword'
  },
  isTargeted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'Whether this keyword is actively targeted (used for filtering)'
  },
  isBranded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Whether this is a branded keyword'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    comment: 'User-defined tags for grouping/filtering keywords'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'apptweak',
    comment: 'Data source (apptweak, manual, etc.)'
  },
  dataQuality: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    allowNull: true,
    comment: 'Indicator of data reliability'
  }
}, {
  tableName: 'keyword_rankings',
  timestamps: true,
  indexes: [
    {
      fields: ['appId']
    },
    {
      fields: ['appId', 'keyword', 'date', 'country', 'device'],
      unique: true
    },
    {
      fields: ['date']
    },
    {
      fields: ['keyword']
    }
  ]
});

module.exports = KeywordRanking;
