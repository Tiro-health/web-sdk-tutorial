// Import React and ReactDOM to make them available globally for Tiro Web SDK
import React from "react";
import ReactDOM from "react-dom/client";
import { FormFiller, Narrative } from "@tiro-health/web-sdk";

// Make React available globally since Tiro Web SDK expects it
window.React = React;
window.ReactDOM = ReactDOM;

let questionnaires = [];
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

// Fetch questionnaires from API
async function fetchQuestionnaires() {
  const selectElement = document.getElementById("questionnaire-select");
  
  try {
    const response = await fetch('https://reports.tiro.health/fhir/r5/Questionnaire/', {
      headers: {
        'Accept': 'application/fhir+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.resourceType === 'Bundle' && Array.isArray(data.entry)) {
      questionnaires = data.entry.map(entry => ({
        name: entry.resource.name || entry.resource.id,
        url: entry.resource.url
      }));
      
      // Populate the dropdown
      selectElement.innerHTML = questionnaires.map((q, index) => 
        `<option value="${index}">${q.name}</option>`
      ).join('');
      
      // Initialize with first questionnaire
      if (questionnaires.length > 0) {
        selectElement.value = '0';
        initializeSDK(questionnaires[0].url);
      }
    }
  } catch (error) {
    console.error('Failed to fetch questionnaires:', error);
    selectElement.innerHTML = '<option value="">Error loading questionnaires</option>';
  }
}

// Initialize the application
function initializeApp() {
  // Get the dropdown element
  const selectElement = document.getElementById("questionnaire-select");
  if (!selectElement) {
    console.error("Questionnaire select element not found");
    return;
  }

  // Handle questionnaire selection change
  selectElement.addEventListener('change', function(event) {
    const selectedIndex = event.target.value;
    if (selectedIndex !== '' && questionnaires[selectedIndex]) {
      initializeSDK(questionnaires[selectedIndex].url);
    }
  });

  // Fetch questionnaires
  fetchQuestionnaires();
}

// Wait for DOM to be ready and initialize the application
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
  });
} else {
  initializeApp();
}
