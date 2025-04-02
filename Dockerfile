# Multi-stage build for ASO Dashboard

# Stage 1: Build the React frontend
FROM node:18-alpine as client-builder

WORKDIR /app/client

# Copy client package.json and package-lock.json
COPY client/package*.json ./

# Install client dependencies
RUN npm ci

# Copy client source code
COPY client/ .

# Build the client
RUN npm run build

# Stage 2: Build the Node.js backend
FROM node:18-alpine as server-builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install server dependencies
RUN npm ci

# Copy server source code
COPY server/ ./server/

# Stage 3: Final image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy server files
COPY --from=server-builder /app/server ./server/

# Copy the built client from the client-builder stage
COPY --from=client-builder /app/client/build ./client/build

# Copy other necessary files
COPY .env.example ./
COPY README.md ./

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["node", "server/index.js"]
