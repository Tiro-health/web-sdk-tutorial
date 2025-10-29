// ============================================================
// DEMO FUNCTIONALITY - This is just for this demo
// ============================================================

import "./settings.css";

const DEFAULT_BACKEND_URL = "https://templates.tiro.health/";
const TEMPLATE_ID = "2630b8675c214707b1f86d1fbd4deb87";

function getDefaultSettings() {
  const saved = localStorage.getItem("tiro-settings");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved settings:", e);
    }
  }
  return {
    backendUrl: DEFAULT_BACKEND_URL,
    email: "",
    username: "",
    password: "",
  };
}

export class SettingsManager {
  constructor() {
    this.settings = getDefaultSettings();
    this.isOpen = false;
    this.listeners = {};
    this.createUI();
    this.attachEventListeners();
    
    // Trigger initial setup after listeners are attached (setTimeout ensures listener is registered)
    setTimeout(() => this.emitChange(), 0);
  }
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  emitChange() {
    const config = {
      questionnaire: this.settings.backendUrl + "templates/" + TEMPLATE_ID,
      sdcEndpoint: {
        address: "https://sdc-service-staging-wkrcomcqfq-ew.a.run.app/fhir/r5",
      },
      dataEndpoint: {
        resourceType: "Endpoint",
        address: "https://fhir-candle-35032072625.europe-west1.run.app/fhir/r4",
      },
    };
    
    if (this.listeners.change) {
      this.listeners.change.forEach(callback => callback(config));
    }
  }

  createUI() {
    const settingsButton = document.createElement("button");
    settingsButton.className = "settings-button";
    settingsButton.innerHTML = "⚙️ Settings";
    settingsButton.title = "Settings";
    settingsButton.id = "settings-button";

    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.id = "settings-modal";
    modalOverlay.style.display = "none";

    modalOverlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Settings</h2>
          <button class="close-button" id="close-settings">✕</button>
        </div>
        <form id="settings-form">
          <div class="form-group">
            <label for="backendUrl">Backend URL:</label>
            <input
              type="url"
              id="backendUrl"
              value="${this.settings.backendUrl}"
              required
              placeholder="https://templates.tiro.health/"
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              value="${this.settings.email || ""}"
              placeholder="user@domain.com"
            />
          </div>
          <div class="form-group">
            <label for="username">Username (Basic Auth):</label>
            <input
              type="text"
              id="username"
              value="${this.settings.username || ""}"
              placeholder="Enter basic auth username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password (Basic Auth):</label>
            <input
              type="password"
              id="password"
              value="${this.settings.password || ""}"
              placeholder="Enter basic auth password"
            />
          </div>
          <div class="button-group">
            <button type="button" class="reset-button" id="reset-settings">
              Reset
            </button>
            <button type="submit" class="apply-button">
              Apply & Restart
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(settingsButton);
    document.body.appendChild(modalOverlay);

    this.settingsButton = settingsButton;
    this.modalOverlay = modalOverlay;
  }

  attachEventListeners() {
    this.settingsButton.addEventListener("click", () => this.open());

    const closeButton = document.getElementById("close-settings");
    closeButton.addEventListener("click", () => this.close());

    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });

    const form = document.getElementById("settings-form");
    form.addEventListener("submit", (e) => this.handleSubmit(e));

    const resetButton = document.getElementById("reset-settings");
    resetButton.addEventListener("click", () => this.handleReset());
  }

  open() {
    this.modalOverlay.style.display = "flex";
    this.isOpen = true;
  }

  close() {
    this.modalOverlay.style.display = "none";
    this.isOpen = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const backendUrl = document.getElementById("backendUrl").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    this.settings = {
      backendUrl,
      email,
      username,
      password,
    };

    localStorage.setItem("tiro-settings", JSON.stringify(this.settings));
    this.close();

    // Emit change event to re-initialize SDK with new settings
    this.emitChange();
  }

  handleReset() {
    document.getElementById("backendUrl").value = DEFAULT_BACKEND_URL;
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}
