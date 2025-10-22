# Tiro Web SDK Integration Examples

This repository demonstrates different ways to integrate the **Tiro Web SDK** into your application, depending on your build tools and UI framework preferences.

## Overview

The Tiro Web SDK enables you to embed intelligent form filling and clinical narrative generation capabilities into your web applications. This tutorial repository contains four different integration approaches, each suited to different development environments and preferences.

## Integration Approaches

### 1. HTML + JavaScript (No Build Tools)
**Directory:** [`html+js/`](./html+js/)

The simplest integration approach using CDN-hosted IIFE bundles. Perfect for:
- Quick prototypes and demos
- Static websites without build processes
- Projects where you want minimal setup

**Key features:**
- No npm or build tools required
- Loads React and SDK from CDN
- Single HTML file setup
- Immediate browser execution

### 2. NPM + React
**Directory:** [`npm+react/`](./npm+react/)

Modern React application with Vite bundler. Ideal for:
- React-based applications
- Projects using modern JavaScript tooling
- TypeScript development

**Key features:**
- Full TypeScript support
- Hot module replacement (HMR)
- Optimized production builds
- ESLint configuration

### 3. NPM + Angular
**Directory:** [`npm+angular/`](./npm+angular/)

Angular application with SDK integration. Perfect for:
- Angular-based applications
- Enterprise applications using Angular
- Teams familiar with Angular ecosystem

**Key features:**
- Angular standalone components
- Full TypeScript support
- React compatibility layer for SDK
- Proper lifecycle management

### 4. NPM + Vanilla JavaScript
**Directory:** [`npm+vanillajs/`](./npm+vanillajs/)

Vanilla JavaScript with Vite bundler. Best for:
- Framework-agnostic applications
- Lightweight implementations
- Projects wanting to avoid framework overhead

**Key features:**
- No UI framework required (but React still needed for SDK internals)
- Modern build tooling with Vite
- Minimal dependencies
- Clean vanilla JS patterns

## Repository Structure

```
web-sdk-tutorial/
├── html+js/              # CDN-based integration (no build tools)
│   └── index.html        # Single-file example
│
├── npm+react/            # React + Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── npm+angular/          # Angular + Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── npm+vanillajs/        # Vanilla JS + Vite
    ├── src/
    ├── package.json
    └── vite.config.ts
```

## Getting Started

Each directory contains a complete, runnable example. Choose the approach that best fits your project:

**Quick Links:**
- [HTML + JavaScript](./html+js/) (CDN-based, no build tools)
- [NPM + React](./npm+react/) - [detailed README](./npm+react/README.md)
- [NPM + Angular](./npm+angular/) - [detailed README](./npm+angular/README.md)
- [NPM + Vanilla JavaScript](./npm+vanillajs/)

### For html+js (No Build Tools)
```bash
cd html+js
# Open index.html directly in your browser
open index.html
```

### For NPM-based Examples (React, Angular, Vanilla JS)
```bash
cd npm+{react|angular|vanillajs}

# Install dependencies
npm ci

# Start development server
npm run dev
# or
npm run start

# Build for production
npm run build
```

## Prerequisites

- Node.js 18+ (for npm-based examples)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (for authentication)
- Modern web browser

### Installing Google Cloud CLI

If you don't have the Google Cloud CLI installed, follow the installation instructions for your operating system:

- **Installation Guide**: https://cloud.google.com/sdk/docs/install
- **Quick Install Options**:
  - macOS: `brew install google-cloud-sdk`
  - Windows: Download installer from the link above
  - Linux: Follow the instructions in the installation guide

After installation, verify it's working:
```bash
gcloud --version
```

## Authentication

Most npm-based examples require authentication with Google Cloud to access the Tiro Web SDK from the Google Artifact Registry.

### Setup Steps

1. **Authenticate with Google Cloud** (if not already authenticated):
   ```bash
   gcloud auth login
   ```
   This will open a browser window for you to sign in with your Google account.

2. **Configure Application Default Credentials** (recommended):
   ```bash
   gcloud auth application-default login
   ```
   This ensures that the authentication works properly with npm tooling.

3. **Navigate to your chosen example directory**:
   ```bash
   cd npm+angular  # or npm+react, npm+vanillajs
   ```

4. **Run the setup script** (sets project and generates .npmrc):
   ```bash
   npm run setup-gcloud
   ```
   This automatically sets the Google Cloud project to `tiroapp-4cb17` and creates a `.npmrc` file with the correct registry settings.

5. **Authenticate with Google Artifact Registry**:
   ```bash
   npm run artifactregistry-login
   ```
   This configures npm to authenticate with Google Artifact Registry.

6. **Install dependencies**:
   ```bash
   npm ci
   ```

> **Note**: The html+js example doesn't require authentication as it uses CDN-hosted bundles.

## Understanding SDK vs Application Code

All tutorial examples include **visual indicators** to help you distinguish between:

### SDK Components (Green Badges)
Components provided by the `@tiro-health/web-sdk` package that render complete UI functionality:
- **FormFiller**: Interactive form for data collection based on FHIR questionnaires
- **Narrative**: Clinical narrative generation from form data

### Application Code (Blue Badges)
Elements you need to implement in your application:
- Page structure and layout
- Mount point `<div>` elements where SDK components render
- SDK initialization and lifecycle management
- Custom styling and branding

### Interactive Visualization

Each example includes a **"Toggle SDK Visualization"** button (purple, bottom-right) that enables an enhanced visualization mode:
- **Green borders**: SDK-rendered components
- **Blue dashed borders**: Your application code

This feature helps you understand:
- What the SDK provides out-of-the-box
- What you need to implement yourself
- How to integrate the SDK into your own application

The visual indicators are educational tools included in these tutorials - they are not part of the SDK itself and can be removed or customized for production use.

## Live Demos

Live versions of these tutorials are deployed via GitHub Pages. Check the repository's GitHub Pages site for interactive demos.

## Documentation

For detailed SDK documentation, visit [Tiro Health Documentation](https://docs.tiro.health).

## License

[Your License Here]
