# Run these commands:

`npm run generate-npmrc`

`npm run artifactregistry-login`

`npm install @tiro-health/web-sdk@alpha`

## Docker Commands

### Production Build
```bash
# Build and run production container
docker-compose up --build

# Or build and run in detached mode
docker-compose up -d --build
```

### Development Mode
```bash
# Run development server with hot reload
docker-compose --profile dev up --build

# Or run in detached mode
docker-compose --profile dev up -d --build
```

### Individual Docker Commands
```bash
# Build production image
docker build --target production -t web-sdk-tutorial .

# Run production container
docker run -p 44780:80 -p 48417:80 web-sdk-tutorial

# Build development image
docker build --target development -t web-sdk-tutorial-dev .

# Run development container
docker run -p 44780:3000 -p 48417:3000 -v $(pwd):/app -v /app/node_modules web-sdk-tutorial-dev
```

## Local Development
```bash
# Install dependencies
npm ci

# Start development server
npm run start

# Build for production
npm run build

# Preview production build
npm run preview
```

## GitHub Pages Deployment
- Push to main/master or axelv/npm+vanillajs branch to trigger automatic deployment
- Site will be available at: https://tiro-health.github.io/web-sdk-tutorial/
- GitHub Actions workflow handles build and deployment automatically
- Current branch (axelv/npm+vanillajs) is enabled for testing deployment