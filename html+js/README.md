# Tiro Web SDK Tutorial - HTML + JavaScript (CDN)

This is the HTML + JavaScript version of the Tiro Web SDK tutorial, demonstrating how to integrate the Tiro Web SDK using CDN-hosted IIFE bundles without any build tools.

## What this tutorial shows

- How to integrate the Tiro Web SDK using CDN links
- No npm or build tools required
- Loading React and SDK from CDN
- Single HTML file setup

## Examples

This tutorial includes two examples:

1. **index.html** - Basic integration with FormFiller and Narrative components
2. **launch-context-example.html** - Advanced integration showing how to use the LaunchContextProvider component for patient selection and FHIR-compliant launch context

### LaunchContextProvider Example

The `LaunchContextProvider` component enables:
- Patient selection from a predefined list
- Building FHIR-compliant launch context
- Passing patient context to SDK components
- Handling patient change events

To try the LaunchContextProvider example, simply open `launch-context-example.html` in your browser.

## Usage

### Running Locally

Simply open either HTML file in a modern web browser:

```bash
# For the basic example
open index.html

# For the LaunchContextProvider example
open launch-context-example.html
```

Or use a simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000/index.html` or `http://localhost:8000/launch-context-example.html`

## Architecture

### CDN Links

This example loads all dependencies from CDN:

- **React**: `https://unpkg.com/react@18/umd/react.production.min.js`
- **ReactDOM**: `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`
- **Tiro Web SDK**: `https://atticus-assets.tiro.health/sdk/latest/tiro-web-sdk.iife.js`
- **Tiro Web SDK Styles**: `https://atticus-assets.tiro.health/sdk/latest/style.css`

### Key Implementation Details

1. **No Build Required**: Everything loads directly in the browser
2. **IIFE Bundle**: The SDK is provided as an Immediately Invoked Function Expression (IIFE) that works in browsers
3. **Global Variables**: React, ReactDOM, and TiroWebSDK are available as global variables
4. **Simple Integration**: Perfect for prototypes, demos, and simple integrations

## Notes

- This approach is best for quick prototypes and demos
- For production applications, consider using the NPM-based examples for better optimization and tree-shaking
- No authentication is required for CDN-based SDK access
- The SDK requires React to be loaded before it can function