import React from "react";
import ReactDOM from "react-dom/client";
import { FormFiller, Narrative, LaunchContextProvider } from "@tiro-health/web-sdk";
import { SettingsManager, getDefaultSettings } from "./settings.js";
import "./settings.css";

window.React = React;
window.ReactDOM = ReactDOM;

let filler = null;
let narrative = null;
let selectedPatientInfo = "";

function updatePatientInfo() {
  const patientInfoDiv = document.getElementById("patient-info");
  if (patientInfoDiv) {
    if (selectedPatientInfo) {
      patientInfoDiv.style.display = "block";
      patientInfoDiv.innerHTML = `<strong>Selected Patient:</strong> ${selectedPatientInfo}`;
    } else {
      patientInfoDiv.style.display = "none";
    }
  }
}

function handlePatientChange(patientId, patient) {
  console.log("Patient changed:", patientId, patient);
  if (patient) {
    const name = patient.name?.[0]?.text || "Unknown";
    const birthDate = patient.birthDate || "Unknown";
    selectedPatientInfo = `${name} (DOB: ${birthDate})`;
  } else {
    selectedPatientInfo = "";
  }
  updatePatientInfo();
}

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

    const launchContextContainer = document.getElementById("launch-context-container");

    if (launchContextContainer) {
      // Clear the container
      launchContextContainer.innerHTML = "";

      // Create a React root and render LaunchContextProvider
      const root = ReactDOM.createRoot(launchContextContainer);
      
      root.render(
        React.createElement(LaunchContextProvider, {
          patients: [
            {
              id: "patient-1",
              name: "John Doe",
              birthDate: "1980-05-15",
              gender: "male",
            },
            {
              id: "patient-2",
              name: "Jane Smith",
              birthDate: "1975-03-22",
              gender: "female",
            },
            {
              id: "patient-3",
              name: "Bob Johnson",
              birthDate: "1990-11-08",
              gender: "male",
            },
          ],
          onPatientChange: handlePatientChange,
          children: ({ launchContext }) => {
            console.log("Launch context:", launchContext);

            // Create the main content structure
            const mainContent = React.createElement("main", { className: "main-content" },
              React.createElement("div", { className: "sdk-component-wrapper" },
                React.createElement("span", { className: "sdk-component-badge" }, "SDK: LaunchContextProvider"),
                React.createElement("div", { 
                  id: "form-filler",
                  ref: (element) => {
                    if (element && filler) {
                      filler.mount(element);
                      console.log("Form filler mounted successfully");
                    }
                  }
                },
                  React.createElement("span", { className: "sdk-component-badge" }, "SDK: FormFiller")
                )
              ),
              React.createElement("div", { 
                className: "sdk-component-wrapper",
                id: "narrative",
                ref: (element) => {
                  if (element && narrative) {
                    narrative.mount(element);
                    console.log("Narrative mounted successfully");
                  }
                }
              },
                React.createElement("span", { className: "sdk-component-badge" }, "SDK: Narrative")
              )
            );

            return mainContent;
          }
        })
      );

      console.log("LaunchContextProvider initialized successfully");
    } else {
      console.error("LaunchContextProvider container element not found");
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
