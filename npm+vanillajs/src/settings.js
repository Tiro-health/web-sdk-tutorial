// ============================================================
// CORE FUNCTIONALITY - This is what you need in your app
// ============================================================

export function loadConfig() {
  const questionnaireUri = import.meta.env.VITE_QUESTIONNAIRE_URI;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dataServerUrl = import.meta.env.VITE_DATA_SERVER_URL;

  if (!questionnaireUri || !backendUrl || !dataServerUrl) {
    throw new Error(
      "Missing required environment variables. Please ensure VITE_QUESTIONNAIRE_URI, VITE_BACKEND_URL, and VITE_DATA_SERVER_URL are set in your .env file."
    );
  }

  return {
    questionnaire: questionnaireUri,
    sdcEndpoint: {
      address: backendUrl,
    },
    dataEndpoint: {
      resourceType: "Endpoint",
      address: dataServerUrl,
    },
  };
}
