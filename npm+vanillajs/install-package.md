# Run these commands:

`npm run generate-npmrc`

`npm run artifactregistry-login`

`npm install @tiro-health/web-sdk@latests`

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
