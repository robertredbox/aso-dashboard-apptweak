const { sequelize } = require('../config/database');
const User = require('./user');
const App = require('./app');
const KeywordRanking = require('./keywordRanking');
const Review = require('./review');
const CategoryRanking = require('./categoryRanking');
const AppInstall = require('./appInstall');
const SearchAdsCampaign = require('./searchAdsCampaign');

// Define associations between models
User.hasMany(App, { foreignKey: 'userId', as: 'apps' });
App.belongsTo(User, { foreignKey: 'userId', as: 'user' });

App.hasMany(KeywordRanking, { foreignKey: 'appId', as: 'keywordRankings' });
KeywordRanking.belongsTo(App, { foreignKey: 'appId', as: 'app' });

App.hasMany(Review, { foreignKey: 'appId', as: 'reviews' });
Review.belongsTo(App, { foreignKey: 'appId', as: 'app' });

App.hasMany(CategoryRanking, { foreignKey: 'appId', as: 'categoryRankings' });
CategoryRanking.belongsTo(App, { foreignKey: 'appId', as: 'app' });

App.hasMany(AppInstall, { foreignKey: 'appId', as: 'installs' });
AppInstall.belongsTo(App, { foreignKey: 'appId', as: 'app' });

App.hasMany(SearchAdsCampaign, { foreignKey: 'appId', as: 'searchAdsCampaigns' });
SearchAdsCampaign.belongsTo(App, { foreignKey: 'appId', as: 'app' });

module.exports = {
  sequelize,
  User,
  App,
  KeywordRanking,
  Review,
  CategoryRanking,
  AppInstall,
  SearchAdsCampaign
};
