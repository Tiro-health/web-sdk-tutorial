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
        "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0",
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

// Wait for DOM to be ready and initialize the application
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
