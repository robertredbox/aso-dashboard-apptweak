const axios = require('axios');
const logger = require('../utils/logger');

class AppTweakService {
  constructor(apiKey) {
    this.apiKey = apiKey || process.env.APPTWEAK_API_KEY;
    this.baseUrl = process.env.APPTWEAK_API_URL || 'https://api.apptweak.com/';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'X-Apptweak-Key': this.apiKey,
        'Accept': 'application/json'
      }
    });

    // Add response interceptor for data validation
    this.client.interceptors.response.use(
      response => {
        // Validate the response data
        this.validateResponse(response.data);
        return response;
      },
      error => {
        // Log the error and return a standardized error object
        logger.error(`AppTweak API Error: ${error.message}`);
        
        if (error.response) {
          logger.error(`Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
        }
        
        return Promise.reject({
          isError: true,
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data.message || error.message : error.message,
          source: 'AppTweak API'
        });
      }
    );
  }

  // Data validation method
  validateResponse(data) {
    if (!data) {
      throw new Error('Empty response from AppTweak API');
    }

    if (data.error) {
      throw new Error(`AppTweak API Error: ${data.error}`);
    }

    return true;
  }

  // Get app details by ID
  async getAppDetails(appId, platform, country = 'US', language = 'en') {
    try {
      logger.info(`Fetching app details for ${platform} app ${appId}`);
      
      const response = await this.client.get(`/apps/${platform}/${appId}`, {
        params: { country, language }
      });

      // Additional data validation specific to app details
      if (!response.data.app || !response.data.app.id) {
        throw new Error('Invalid app data structure received from AppTweak');
      }

      // Verify the returned app ID matches the requested app ID
      if (response.data.app.id.toString() !== appId.toString()) {
        throw new Error(`App ID mismatch: requested ${appId} but received ${response.data.app.id}`);
      }

      return response.data.app;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Search for apps
  async searchApps(query, platform, country = 'US', language = 'en') {
    try {
      logger.info(`Searching for ${platform} apps matching "${query}"`);
      
      const response = await this.client.get(`/apps/search/${platform}`, {
        params: { 
          q: query, 
          country, 
          language 
        }
      });

      // Validate search results
      if (!response.data.apps || !Array.isArray(response.data.apps)) {
        throw new Error('Invalid search results structure received from AppTweak');
      }

      // Verify each app in the results has the essential fields
      response.data.apps.forEach(app => {
        if (!app.id || !app.name || !app.platform) {
          throw new Error(`Missing required fields for app: ${JSON.stringify(app)}`);
        }
        
        // Validate platform matches request
        if (app.platform.toLowerCase() !== platform.toLowerCase()) {
          throw new Error(`Platform mismatch: expected ${platform}, got ${app.platform}`);
        }
      });

      return response.data.apps;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Get keyword rankings for an app
  async getKeywordRankings(appId, platform, keywords, country = 'US', device = 'iphone', language = 'en') {
    try {
      logger.info(`Fetching keyword rankings for ${platform} app ${appId}`);
      
      if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error('Keywords must be a non-empty array');
      }

      const response = await this.client.get(`/apps/${platform}/${appId}/keywords/rankings`, {
        params: { 
          keywords: keywords.join(','), 
          country, 
          device,
          language
        }
      });

      // Validate keyword rankings response
      if (!response.data.rankings || !Array.isArray(response.data.rankings)) {
        throw new Error('Invalid keyword rankings structure received from AppTweak');
      }

      // Additional validation for each keyword ranking
      response.data.rankings.forEach(ranking => {
        if (!ranking.keyword || ranking.rank === undefined) {
          throw new Error(`Missing required fields for keyword ranking: ${JSON.stringify(ranking)}`);
        }
      });

      return response.data.rankings;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Get keyword stats (volume, difficulty)
  async getKeywordStats(keywords, platform, country = 'US', device = 'iphone', language = 'en') {
    try {
      logger.info(`Fetching keyword stats for ${platform} keywords: ${keywords.join(', ')}`);
      
      if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error('Keywords must be a non-empty array');
      }

      const response = await this.client.get(`/keywords/${platform}/stats`, {
        params: { 
          keywords: keywords.join(','), 
          country, 
          device,
          language
        }
      });

      // Validate keyword stats response
      if (!response.data.keywords || !Array.isArray(response.data.keywords)) {
        throw new Error('Invalid keyword stats structure received from AppTweak');
      }

      // Additional validation for each keyword stat
      response.data.keywords.forEach(keyword => {
        if (!keyword.word || keyword.volume === undefined) {
          throw new Error(`Missing required fields for keyword stats: ${JSON.stringify(keyword)}`);
        }
      });

      return response.data.keywords;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Discover keywords based on a seed keyword or app
  async discoverKeywords(query, platform, country = 'US', language = 'en', limit = 20) {
    try {
      logger.info(`Discovering keywords for ${platform} based on "${query}"`);
      
      const response = await this.client.get(`/keywords/${platform}/suggestions`, {
        params: { 
          query, 
          country, 
          language,
          limit: Math.min(limit, 50) // API max is 50
        }
      });

      // Validate keyword suggestions response
      if (!response.data.keywords || !Array.isArray(response.data.keywords)) {
        throw new Error('Invalid keyword suggestions structure received from AppTweak');
      }

      return response.data.keywords;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Get app reviews
  async getReviews(appId, platform, country = 'US', limit = 50) {
    try {
      logger.info(`Fetching reviews for ${platform} app ${appId}`);
      
      const response = await this.client.get(`/apps/${platform}/${appId}/reviews`, {
        params: { 
          country, 
          size: Math.min(limit, 100) // API max is 100
        }
      });

      // Validate reviews response
      if (!response.data.reviews || !Array.isArray(response.data.reviews)) {
        throw new Error('Invalid reviews structure received from AppTweak');
      }

      return response.data.reviews;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Track category rankings for an app
  async getCategoryRankings(appId, platform, category, country = 'US', startDate, endDate) {
    try {
      logger.info(`Fetching category rankings for ${platform} app ${appId} in category ${category}`);
      
      const params = { 
        country
      };

      if (startDate) {
        params.start_date = startDate;
      }

      if (endDate) {
        params.end_date = endDate;
      }

      const response = await this.client.get(`/apps/${platform}/${appId}/categories/${category}/rankings`, {
        params
      });

      // Validate category rankings response
      if (!response.data.rankings || !Array.isArray(response.data.rankings)) {
        throw new Error('Invalid category rankings structure received from AppTweak');
      }

      return response.data.rankings;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Get competitors for an app
  async getCompetitors(appId, platform, country = 'US', language = 'en') {
    try {
      logger.info(`Fetching competitors for ${platform} app ${appId}`);
      
      const response = await this.client.get(`/apps/${platform}/${appId}/competitors`, {
        params: { 
          country, 
          language 
        }
      });

      // Validate competitors response
      if (!response.data.competitors || !Array.isArray(response.data.competitors)) {
        throw new Error('Invalid competitors structure received from AppTweak');
      }

      return response.data.competitors;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }

  // Get ASO report for an app
  async getAsoReport(appId, platform, country = 'US', language = 'en') {
    try {
      logger.info(`Fetching ASO report for ${platform} app ${appId}`);
      
      const response = await this.client.get(`/apps/${platform}/${appId}/aso-report`, {
        params: { 
          country, 
          language 
        }
      });

      // Validate ASO report response
      if (!response.data.report) {
        throw new Error('Invalid ASO report structure received from AppTweak');
      }

      return response.data.report;
    } catch (error) {
      if (error.isError) {
        throw error;
      }
      throw {
        isError: true,
        message: error.message,
        source: 'AppTweak API'
      };
    }
  }
}

module.exports = new AppTweakService();
