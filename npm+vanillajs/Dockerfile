# Base stage with dependencies
FROM node:18-alpine as base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Development stage
FROM base as development

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

# Build stage
FROM base as build

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine as production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]