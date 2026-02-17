# Build stage for React frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Final stage for Node.js backend
FROM node:20-alpine
WORKDIR /app

# Install production dependencies for backend
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY src/ ./src/

# Copy built frontend from build-frontend stage
COPY --from=build-frontend /app/client/build ./client/build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "src/server.js"]
