import React from "react";
import ReactDOM from "react-dom/client";
import { FormFiller, Narrative } from "@tiro-health/web-sdk";
import { SettingsManager, getDefaultSettings } from "./settings.js";
import "./settings.css";

window.React = React;
window.ReactDOM = ReactDOM;

let filler = null;
let narrative = null;

async function initializeApp(settings) {
  try {
    if (filler && typeof filler.unmount === "function") {
      filler.unmount();
    }
    if (narrative && typeof narrative.unmount === "function") {
      narrative.unmount();
    }

    filler = new FormFiller({
      questionnaire:
        settings.backendUrl + "templates/2630b8675c214707b1f86d1fbd4deb87",
    });

    narrative = new Narrative({ filler });

    const formFillerElement = document.getElementById("form-filler");
    const narrativeElement = document.getElementById("narrative");

    if (formFillerElement) {
      filler.mount(formFillerElement);
      console.log("Form filler mounted successfully");
    } else {
      console.error("Form filler element not found");
    }

    if (narrativeElement) {
      narrative.mount(narrativeElement);
      console.log("Narrative mounted successfully");
    } else {
      console.error("Narrative element not found");
    }

    console.log("Tiro Web SDK initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Tiro Web SDK:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    const settings = getDefaultSettings();
    new SettingsManager((newSettings) => {
      initializeApp(newSettings);
    });
    initializeApp(settings);
  });
} else {
  const settings = getDefaultSettings();
  new SettingsManager((newSettings) => {
    initializeApp(newSettings);
  });
  initializeApp(settings);
}
