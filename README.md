# ASO Dashboard with AppTweak

A comprehensive App Store Optimization dashboard that integrates with AppTweak and other data sources to provide actionable insights for mobile app growth.

## Demo

A live demo of the project is available at [https://aso-dashboard-apptweak.vercel.app/](https://aso-dashboard-apptweak.vercel.app/)

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
- **Deployment**: Vercel (frontend), Serverless Functions (API)

## Deployment Options

### Option 1: Vercel (Recommended for Quick Setup)

This repository is configured for deployment on Vercel:

1. Fork or clone this repository
2. Connect your Vercel account to your GitHub repository
3. Deploy to Vercel

The `vercel.json` configuration handles both the React frontend and serverless API routes.

### Option 2: Docker (Full Stack Deployment)

For a complete deployment with database:

1. Clone the repository
2. Configure environment variables in `.env` file based on `.env.example`
3. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (if using the full backend)

### Setting Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/robertredbox/aso-dashboard-apptweak.git
   cd aso-dashboard-apptweak
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Create a `.env` file based on `.env.example`

5. Run the development server:
   ```bash
   npm run dev
   ```

This will start both the frontend and backend in development mode. The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Project Structure

```
aso-dashboard-apptweak/
├── api/                 # Vercel serverless functions
├── client/              # React frontend
│   ├── public/          # Static files
│   └── src/             # React source code
│       ├── components/  # React components
│       ├── contexts/    # React contexts
│       ├── layouts/     # Page layouts
│       ├── pages/       # Page components
│       └── services/    # API service integrations
├── nginx/               # Nginx configuration (for Docker deployment)
├── server/              # Express backend (for Docker/self-hosted deployment)
└── vercel.json          # Vercel deployment configuration
```

## Roadmap

- [x] Repository setup
- [x] Initial project scaffolding
- [x] API integrations with AppTweak
- [x] Database schema design
- [x] Backend API development
- [x] Frontend dashboard components
- [ ] Full backend implementation
- [ ] Analytics engine
- [ ] Insights and recommendations
- [ ] Multi-app comparison
- [ ] Customizable dashboard layout
- [ ] Advanced reporting and export options

## License

MIT

## Acknowledgments

- AppTweak for providing the ASO data API
- Inspiration from existing ASO tools like Metrikal
