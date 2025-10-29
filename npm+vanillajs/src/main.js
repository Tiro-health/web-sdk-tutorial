// ============================================================
// CORE FUNCTIONALITY - This is what you need in your app
// ============================================================

import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";

export function initializeTiroSDK(config) {
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

// ============================================================
// DEMO FUNCTIONALITY - This is just for this demo
// ============================================================

import { SettingsManager } from "./settings.js";

new SettingsManager();
