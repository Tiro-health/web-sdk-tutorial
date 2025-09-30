# Tiro Web SDK Tutorial - Angular

This is the Angular version of the Tiro Web SDK tutorial, demonstrating how to integrate the Tiro Web SDK into an Angular application.

## Features

- **Form Filler Component**: Interactive form filling using Tiro's AI-powered form filler
- **Narrative Component**: AI-generated narrative based on form data
- **Angular Integration**: Proper Angular component architecture with services
- **TypeScript Support**: Full TypeScript support for better development experience

## Project Structure

```
npm+angular/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── tiro-sdk.service.ts    # Service for Tiro SDK initialization
│   │   ├── tiro-sdk/
│   │   │   └── tiro-sdk.component.ts  # Main component for SDK integration
│   │   └── app.component.ts           # Root component
│   ├── index.html                     # Main HTML file
│   ├── main.ts                        # Application bootstrap
│   └── styles.css                     # Global styles
├── angular.json                       # Angular CLI configuration
├── package.json                       # Dependencies and scripts
└── tsconfig.json                      # TypeScript configuration
```

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Google Cloud CLI (for authentication)

## Installation

1. **Generate NPM registry configuration:**
   ```bash
   npm run generate-npmrc
   ```

2. **Authenticate with Google Artifact Registry:**
   ```bash
   npm run artifactregistry-login
   ```

3. **Install dependencies:**
   ```bash
   npm ci
   ```

## Development

Start the development server:
```bash
npm run start
```

The application will be available at `http://localhost:3000`.

## Building

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run the unit tests:
```bash
npm run test
```

## Architecture

### Components

- **AppComponent**: The root component that provides the main layout
- **TiroSdkComponent**: Handles the mounting and lifecycle of Tiro SDK components

### Services

- **TiroSdkService**: Manages the initialization and cleanup of the Tiro Web SDK

### Key Features

1. **React Compatibility**: The Tiro Web SDK requires React, which is made available globally in `main.ts`
2. **Lifecycle Management**: Proper cleanup of SDK components when Angular components are destroyed
3. **Service Architecture**: Clean separation of concerns with Angular services
4. **TypeScript Integration**: Full TypeScript support for better development experience

## Configuration

The application is configured to work with:
- Tiro Web SDK questionnaire template
- Angular 17+ with standalone components
- TypeScript with strict mode
- Karma/Jasmine for testing

## Deployment

The project can be deployed using:
- GitHub Pages (configured in the repository)
- Docker (using the provided nginx.conf)
- Any static hosting service

## Notes

- The Tiro Web SDK requires authentication through Google Cloud
- React and ReactDOM are included as dependencies for SDK compatibility
- The project uses Angular's standalone components for a modern architecture