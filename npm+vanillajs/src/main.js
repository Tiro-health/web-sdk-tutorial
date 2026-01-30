// ============================================================
// CORE FUNCTIONALITY - This is what you need in your app
// ============================================================

// Import registers the Web Components (<tiro-form-filler>, <tiro-narrative>, etc.)
import "@tiro-health/web-sdk";

// Configuration values - In your app, you can pass these values however you want
// (e.g., from environment variables, config files, hardcoded values, API calls, etc.)
// They just need to be set as attributes on the custom elements
const QUESTIONNAIRE_URI = import.meta.env.VITE_QUESTIONNAIRE_URI;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DATA_SERVER_URL = import.meta.env.VITE_DATA_SERVER_URL;

function initializeTiroSDK() {
  const formFiller = document.getElementById("form-filler");
  formFiller.setAttribute("questionnaire", QUESTIONNAIRE_URI);
  formFiller.setAttribute("sdc-endpoint-address", BACKEND_URL);
  formFiller.setAttribute("data-endpoint-address", DATA_SERVER_URL);
}

initializeTiroSDK();
