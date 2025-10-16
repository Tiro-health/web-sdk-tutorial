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

## Authentication

Most examples require authentication with Google Cloud to access the Tiro Web SDK from the npm registry:

```bash
# Generate NPM registry configuration
npm run generate-npmrc

# Authenticate with Google Artifact Registry
npm run artifactregistry-login
```

## Key SDK Components

All examples demonstrate the core SDK components:

- **FormFiller**: Interactive form for data collection based on FHIR questionnaires
- **Narrative**: AI-powered clinical narrative generation from form data

## Live Demos

Live versions of these tutorials are deployed via GitHub Pages. Check the repository's GitHub Pages site for interactive demos.

## Documentation

For detailed SDK documentation, visit [Tiro Health Documentation](https://docs.tiro.health).

## Prerequisites

- Node.js 18+ (for npm-based examples)
- Google Cloud CLI (for authentication)
- Modern web browser

## License

[Your License Here]
