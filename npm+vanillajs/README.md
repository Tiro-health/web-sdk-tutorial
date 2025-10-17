# Tiro Web SDK Tutorial - Vanilla JavaScript

This is the Vanilla JavaScript version of the Tiro Web SDK tutorial, demonstrating how to integrate the Tiro Web SDK into a framework-agnostic application using Vite.

## What this tutorial shows

- How to integrate the Tiro Web SDK without a UI framework
- Setting up React (required for SDK internals) in a vanilla JS environment
- Mounting form filler and narrative components
- Modern build tooling with Vite

## Project Structure

```
npm+vanillajs/
├── src/
│   └── main.js                # Main application entry point with SDK integration
├── index.html                 # Main HTML file
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configuration
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

The application will be available at `http://localhost:5173` (default Vite port).

## Building

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Architecture

### Key Implementation Details

1. **React Dependency**: Although this is a vanilla JS application, React is still required as a dependency because the Tiro Web SDK is built with React
2. **Component Integration**: The SDK components are mounted directly into DOM elements
3. **Modern Tooling**: Uses Vite for fast builds and hot module replacement
4. **Minimal Overhead**: No UI framework overhead while still leveraging modern JavaScript features

## Notes

- The Tiro Web SDK requires authentication through Google Cloud
- React and ReactDOM are included as dependencies for SDK compatibility
- This is a minimal tutorial implementation - for production use, consider proper error handling and more robust architecture
