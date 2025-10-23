// Import React and ReactDOM to make them available globally for Tiro Web SDK
import React from "react";
import ReactDOM from "react-dom/client";
import { FormFiller, Narrative } from "@tiro-health/web-sdk";

// Make React available globally since Tiro Web SDK expects it
window.React = React;
window.ReactDOM = ReactDOM;

// Questionnaire list - can be fetched from API in the future
const questionnaires = [
  { 
    name: "Patient Intake Form", 
    url: "http://templates.tiro.health/templates/2630b8675c214707b1f86d1fbd4deb87" 
  },
  { 
    name: "General Medical History", 
    url: "http://templates.tiro.health/templates/9fad72eee83e46179f8ff096dbd875d0" 
  }
];

let currentFiller = null;
let currentNarrative = null;

// Function to initialize SDK components
function initializeSDK(questionnaireUrl) {
  try {
    // Cleanup existing instances
    if (currentFiller && typeof currentFiller.unmount === 'function') {
      currentFiller.unmount();
    }
    if (currentNarrative && typeof currentNarrative.unmount === 'function') {
      currentNarrative.unmount();
    }

    // Create the form filler instance
    currentFiller = new FormFiller({
      questionnaire: questionnaireUrl,
    });

    // Create the narrative instance
    currentNarrative = new Narrative({ filler: currentFiller });

    // Mount the components to their respective DOM elements
    const formFillerElement = document.getElementById("form-filler");
    const narrativeElement = document.getElementById("narrative");

    if (formFillerElement) {
      currentFiller.mount(formFillerElement);
      console.log("Form filler mounted successfully");
    } else {
      console.error("Form filler element not found");
    }

    if (narrativeElement) {
      currentNarrative.mount(narrativeElement);
      console.log("Narrative mounted successfully");
    } else {
      console.error("Narrative element not found");
    }

    console.log("Tiro Web SDK initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Tiro Web SDK:", error);
  }
}

// Initialize the application
function initializeApp() {
  // Populate the dropdown
  const selectElement = document.getElementById("questionnaire-select");
  if (!selectElement) {
    console.error("Questionnaire select element not found");
    return;
  }

  selectElement.innerHTML = questionnaires.map((q, index) => 
    `<option value="${index}">${q.name}</option>`
  ).join('');

  // Handle questionnaire selection change
  selectElement.addEventListener('change', function(event) {
    const selectedIndex = event.target.value;
    if (selectedIndex !== '' && questionnaires[selectedIndex]) {
      initializeSDK(questionnaires[selectedIndex].url);
    }
  });

  // Initialize with first questionnaire
  if (questionnaires.length > 0) {
    selectElement.value = '0';
    initializeSDK(questionnaires[0].url);
  }
}

// Wait for DOM to be ready and initialize the application
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
  });
} else {
  initializeApp();
}
