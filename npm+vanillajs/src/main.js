import "@tiro-health/web-sdk";
import { SDCClient } from "@tiro-health/web-sdk";

const QUESTIONNAIRE_URI =
  "http://templates.tiro.health/templates/example|1.0.0";
const BACKEND_URL = "https://sdc-staging.tiro.health/fhir/r5";
const DATA_SERVER_URL =
  "https://fhir-candle-35032072625.europe-west1.run.app/fhir/r4";

/**
 * Replace this with your actual access token retrieval logic.
 * For example, fetch from your auth provider or session storage.
 */
function getAccessToken() {
  return "your-access-token";
}

const sdcClient = new SDCClient({
  baseUrl: BACKEND_URL,
  dataEndpoint: DATA_SERVER_URL,
  auth: () => getAccessToken(),
});

function initializeTiroSDK() {
  const formFiller = document.getElementById("form-filler");
  const clipboard = document.getElementById("magic-clipboard");

  formFiller.setAttribute("questionnaire", QUESTIONNAIRE_URI);
  formFiller.setAttribute("sdc-endpoint-address", BACKEND_URL);
  formFiller.setAttribute("data-endpoint-address", DATA_SERVER_URL);

  // Set SDCClient with auth on the form filler
  formFiller.sdcClient = sdcClient;

  // Form filler events
  formFiller.addEventListener("tiro-ready", (event) => {
    console.log(
      "tiro-ready: Questionnaire loaded",
      event.detail.questionnaire
    );
  });

  formFiller.addEventListener("tiro-submit", (event) => {
    console.log("tiro-submit: Form submitted", event.detail.response);
  });

  formFiller.addEventListener("tiro-update", (event) => {
    console.log("tiro-update: Form values changed", event.detail.response);
  });

  formFiller.addEventListener("tiro-error", (event) => {
    console.error("tiro-error:", event.detail.error);
  });

  formFiller.addEventListener("tiro-validate", (event) => {
    console.log(
      "tiro-validate:",
      event.detail.isValid,
      event.detail.operationOutcome
    );
  });

  // Magic clipboard events
  clipboard.addEventListener("tiro-populate-start", (event) => {
    console.log(
      "tiro-populate-start: Notes:",
      event.detail.notes?.length || 0,
      "chars, Files:",
      event.detail.files?.length || 0
    );
  });

  clipboard.addEventListener("tiro-populate-complete", (event) => {
    console.log("tiro-populate-complete:", event.detail.response);
  });

  clipboard.addEventListener("tiro-populate-error", (event) => {
    console.error("tiro-populate-error:", event.detail.error);
  });
}

initializeTiroSDK();
