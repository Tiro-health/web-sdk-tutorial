// ============================================================
// CORE FUNCTIONALITY - This is what you need in your app
// ============================================================

import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";

// Configuration values - In your app, you can pass these values however you want
// (e.g., from environment variables, config files, hardcoded values, API calls, etc.)
// They just need to be set before initializing the SDK components
const QUESTIONNAIRE_URI = import.meta.env.VITE_QUESTIONNAIRE_URI;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DATA_SERVER_URL = import.meta.env.VITE_DATA_SERVER_URL;

function initializeTiroSDK() {
  const filler = new FormFiller({
    questionnaire: QUESTIONNAIRE_URI,
    sdcEndpoint: {
      address: BACKEND_URL,
    },
  });

  const launchContextProvider = new LaunchContextProvider({
    dataEndpoint: {
      resourceType: "Endpoint",
      address: DATA_SERVER_URL,
    },
    filler,
  });

  const narrative = new Narrative({ filler });

  launchContextProvider.mount(document.getElementById("launch-context"));
  filler.mount(document.getElementById("form-filler"));
  narrative.mount(document.getElementById("narrative"));
}

initializeTiroSDK();