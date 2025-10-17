# Tiro Web SDK Tutorial - Angular

This is the Angular version of the Tiro Web SDK tutorial, demonstrating how to integrate the Tiro Web SDK into an Angular application.

## What this tutorial shows

- How to integrate the Tiro Web SDK into an Angular application
- Setting up React globals for SDK compatibility
- Mounting form filler and narrative components
- Basic Angular component lifecycle management

## Project Structure

```
npm+angular/
├── src/
│   ├── app/
│   │   └── app.component.ts           # Main component with SDK integration
│   ├── index.html                     # Main HTML file
│   ├── main.ts                        # Application bootstrap with React globals
│   └── styles.css                     # Global styles
├── angular.json                       # Angular CLI configuration
├── package.json                       # Dependencies and scripts
└── tsconfig.json                      # TypeScript configuration
```

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (for authentication)

If you don't have Google Cloud CLI installed, see the [installation guide](https://cloud.google.com/sdk/docs/install).

## Installation

### 1. Authenticate with Google Cloud

First, ensure you're authenticated with Google Cloud:

```bash
# Authenticate with Google Cloud (if not already authenticated)
gcloud auth login

# Configure Application Default Credentials
gcloud auth application-default login
```

### 2. Configure NPM Authentication

```bash
# Set project and generate NPM registry configuration
npm run setup-gcloud

# Authenticate with Google Artifact Registry
npm run artifactregistry-login
```

The `setup-gcloud` script automatically sets the Google Cloud project to `tiroapp-4cb17` and generates the `.npmrc` file.

### 3. Install Dependencies

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

### Key Implementation Details

1. **React Compatibility**: The Tiro Web SDK requires React, which is made available globally in `main.ts`
2. **Component Integration**: The SDK components are mounted directly in the main AppComponent
3. **Lifecycle Management**: Proper cleanup of SDK components when the Angular component is destroyed
4. **TypeScript Integration**: Full TypeScript support for better development experience

## Notes

- The Tiro Web SDK requires authentication through Google Cloud
- React and ReactDOM are included as dependencies for SDK compatibility
- The project uses Angular's standalone components for simplicity
- This is a minimal tutorial implementation - for production use, consider proper error handling and more robust architecture