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
├── index.html                      # Root Vite entry (required so / serves content)
├── src/
│   ├── app/
│   │   └── app.component.ts        # Main component with SDK integration
│   ├── index.html                  # (Legacy) original HTML kept for reference
│   ├── main.ts                     # Application bootstrap with React globals
│   └── styles.css                  # Global styles
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite + Angular plugin config
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

The application will be available at `http://localhost:3400`.

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

## Troubleshooting

### 404 on `http://localhost:3400/`
If you saw a 404 earlier, it was because Vite serves the root `index.html` from the project root, not from `src/`. Adding a root-level `index.html` resolved this. The previous `src/index.html` is kept only as a reference and can be removed later.

### Port Differences
`npm run start` explicitly sets the port to 3400 in `vite.config.ts`. Use that URL instead of 3000.

## Notes

- The Tiro Web SDK requires authentication through Google Cloud
- React and ReactDOM are included as dependencies for SDK compatibility
- Standalone Angular setup via Vite + `@analogjs/vite-plugin-angular`
- This is a minimal tutorial implementation - for production use, consider proper error handling and more robust architecture