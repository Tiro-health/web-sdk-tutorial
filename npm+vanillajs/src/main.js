// Import React and ReactDOM to make them available globally for Tiro Web SDK
import React from "react";
import ReactDOM from "react-dom/client";
import { FormFiller, Narrative } from "@tiro-health/web-sdk";

// Make React available globally since Tiro Web SDK expects it
window.React = React;
window.ReactDOM = ReactDOM;

// Initialize the application
async function initializeApp() {
  try {
    // Create the form filler instance
    const filler = new FormFiller({
      questionnaire:
        "http://templates.tiro.health/templates/2630b8675c214707b1f86d1fbd4deb87",
      sdcEndpoint: {
        address:
          "https://sdc-service-staging-35032072625.europe-west1.run.app/fhir/r5",
      },
    });

    // Create the narrative instance
    const narrative = new Narrative({ filler });

    // Mount the components to their respective DOM elements
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

// Toggle visualization button handler
function setupToggleButton() {
  const toggleBtn = document.getElementById("toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("show-sdk-boundaries");
    });
  }
}

// Wait for DOM to be ready and initialize the application
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
    setupToggleButton();
  });
} else {
  initializeApp();
  setupToggleButton();
}
