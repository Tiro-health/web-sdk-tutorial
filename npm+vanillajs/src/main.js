// ============================================================
// CORE FUNCTIONALITY - This is what you need in your app
// ============================================================

import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";
import { loadConfig } from "./settings.js";

function initializeTiroSDK(config) {
  const filler = new FormFiller({
    questionnaire: config.questionnaire,
    sdcEndpoint: config.sdcEndpoint,
  });

  const launchContextProvider = new LaunchContextProvider({
    dataEndpoint: config.dataEndpoint,
    filler,
  });

  const narrative = new Narrative({ filler });

  launchContextProvider.mount(document.getElementById("launch-context"));
  filler.mount(document.getElementById("form-filler"));
  narrative.mount(document.getElementById("narrative"));
}

const config = loadConfig();
initializeTiroSDK(config);