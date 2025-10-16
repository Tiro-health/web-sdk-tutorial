# Vite Migration Guide

This Angular application has been migrated from Angular CLI to Vite for faster development and build times.

## Changes Made

### 1. Configuration Files
- **Added**: `vite.config.ts` - Main Vite configuration
- **Removed**: `angular.json` - Angular CLI configuration (no longer needed)
- **Updated**: `tsconfig.json` - Updated for Vite compatibility

### 2. Package.json Updates
- **Scripts**: Replaced Angular CLI commands with Vite equivalents
  - `start`: Now uses `vite --host 0.0.0.0 --port 3000`
  - `build`: Now uses `vite build`
  - `dev`: Added for development server
  - `preview`: Added for production preview
- **Dependencies**: 
  - **Removed**: Angular CLI build tools (`@angular-devkit/build-angular`, `@angular/cli`)
  - **Added**: Vite and Angular plugin (`vite`, `@analogjs/vite-plugin-angular`)

### 3. HTML Updates
- **Updated**: `src/index.html` - Added module script tag for main.ts entry point

### 4. TypeScript Configuration
- **Updated**: `tsconfig.json` with Vite-compatible settings:
  - `moduleResolution`: Changed to "bundler"
  - `module`: Changed to "ESNext"
  - Added `isolatedModules` and `verbatimModuleSyntax`
  - Added path mapping for `@/*` aliases

## Installation

To install the required dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
# or
npm run dev
```

The application will be available at `http://localhost:3000`

## Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Key Benefits of Vite

1. **Faster Development**: Hot Module Replacement (HMR) with instant updates
2. **Faster Builds**: Uses esbuild for faster bundling
3. **Better Tree Shaking**: More efficient dead code elimination
4. **Modern Defaults**: ES modules, modern JavaScript features
5. **Smaller Bundle Size**: More efficient bundling strategies

## Compatibility

- Maintains full Angular functionality
- Compatible with Tiro Web SDK
- Supports React components within Angular (as required by Tiro SDK)
- Preserves all existing component logic and styling