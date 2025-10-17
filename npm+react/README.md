# Tiro Web SDK Tutorial - React + TypeScript + Vite

This is the React + TypeScript version of the Tiro Web SDK tutorial, demonstrating how to integrate the Tiro Web SDK into a modern React application using Vite.

## What this tutorial shows

- How to integrate the Tiro Web SDK into a React application
- Full TypeScript support for type-safe development
- Hot module replacement (HMR) with Vite
- ESLint configuration for code quality

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
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Building

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Vite Plugins

This template uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) which uses [Babel](https://babeljs.io/) for Fast Refresh.

Alternative: [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
