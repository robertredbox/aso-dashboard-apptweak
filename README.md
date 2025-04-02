# ASO Dashboard with AppTweak

A comprehensive App Store Optimization dashboard that integrates with AppTweak and other data sources to provide actionable insights for mobile app growth.

## Features

- **Multi-Source Data Integration**: Collect and unify data from AppTweak, App Store Connect, Google Play Developer Console, and Apple Search Ads.
- **Keyword Performance Tracking**: Monitor keyword rankings and visibility over time.
- **Organic-Paid Correlation**: Quantify the relationship between paid UA and organic growth.
- **Competitive Intelligence**: Track competitor movements and identify opportunities.
- **Actionable Insights**: Receive AI-powered recommendations for ASO improvements.

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Visualization**: Recharts
- **Authentication**: JWT-based auth system
- **Deployment**: Docker containers on cloud infrastructure

## Detailed Features

### Data Collection
- **AppTweak API**: Keyword rankings, category rankings, ASO score, competitor analysis
- **App Store Connect API**: Downloads, page views, conversion rate, retention metrics
- **Google Play Console API**: Android-specific metrics, install sources, ANRs
- **Apple Search Ads API**: Impression share, taps, conversions, CPT, CPA 

### Dashboard Visualizations
- Keyword rankings trends over time
- Organic vs. paid installs
- Conversion rate analysis
- Keyword distribution by position
- Ratings and reviews analysis

### Correlation Analysis
- Match paid ad spikes with organic keyword improvements
- Calculate correlation between paid spend and organic metrics
- Identify keywords with high organic impact from paid campaigns

### Insight Generation
- Automated identification of ASO opportunities
- Actionable recommendations for metadata optimization
- Competitive gap analysis
- Review sentiment insights

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL
- AppTweak API key
- App Store Connect API key (optional for iOS apps)
- Google Play Developer API access (optional for Android apps)
- Apple Search Ads API access (optional for paid campaigns analysis)

### Setting Up the Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/robertredbox/aso-dashboard-apptweak.git
   cd aso-dashboard-apptweak
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_NAME=aso_dashboard
   DB_PORT=5432

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=1d

   # API Keys
   APPTWEAK_API_KEY=your_apptweak_api_key
   ASC_API_KEY=your_app_store_connect_api_key
   ASC_ISSUER_ID=your_app_store_connect_issuer_id
   ASC_KEY_ID=your_app_store_connect_key_id
   ASC_PRIVATE_KEY=your_app_store_connect_private_key_path
   GOOGLE_PLAY_API_KEY=your_google_play_api_key
   APPLE_SEARCH_ADS_API_KEY=your_apple_search_ads_api_key
   ```

4. Create the database:
   ```bash
   createdb aso_dashboard
   ```

5. Run database migrations (this step will be added later):
   ```bash
   npm run migrate
   ```

### Setting Up the Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the backend server from the root directory:
   ```bash
   npm run dev:server
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the dashboard.

## Development

### Project Structure

```
aso-dashboard-apptweak/
├── server/               # Backend server code
│   ├── config/           # Server configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # External API integrations
│   └── utils/            # Utility functions
├── client/               # React frontend
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # React components
│       ├── contexts/     # React contexts
│       ├── layouts/      # Page layouts
│       ├── pages/        # Page components
│       └── services/     # API service integrations
└── docs/                 # Documentation
```

### Backend API Structure

- `GET /api/status`: API status check
- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Login user
- `GET /api/apps`: Get user's apps
- `GET /api/apps/:id`: Get app details
- `GET /api/keywords`: Get app keywords
- `GET /api/keywords/history`: Get keyword ranking history
- `GET /api/analytics/dashboard`: Get dashboard metrics

## Roadmap

- [x] Repository setup
- [x] Initial project scaffolding
- [x] API integrations
- [x] Database schema design
- [x] Backend API development
- [x] Frontend dashboard components
- [ ] Analytics engine
- [ ] Insights and recommendations
- [ ] Deployment and CI/CD setup
- [ ] Unit and integration tests
- [ ] Multi-app comparison
- [ ] Customizable dashboard layout
- [ ] Advanced reporting and export options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- AppTweak for providing the ASO data API
- Inspiration from existing ASO tools like Metrikal
