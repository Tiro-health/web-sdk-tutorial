const DEFAULT_BACKEND_URL = "https://templates.tiro.health/";

export function getDefaultSettings() {
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
    apiKey: "",
  };
}

export class SettingsManager {
  constructor(onSettingsChange) {
    this.onSettingsChange = onSettingsChange;
    this.settings = getDefaultSettings();
    this.isOpen = false;
    this.createUI();
    this.attachEventListeners();
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
            <label for="apiKey">API Key (optional):</label>
            <input
              type="password"
              id="apiKey"
              value="${this.settings.apiKey || ""}"
              placeholder="Enter API key"
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
    const apiKey = document.getElementById("apiKey").value;

    this.settings = {
      backendUrl,
      apiKey: apiKey || undefined,
    };

    localStorage.setItem("tiro-settings", JSON.stringify(this.settings));
    this.close();

    if (this.onSettingsChange) {
      this.onSettingsChange(this.settings);
    }
  }

  handleReset() {
    document.getElementById("backendUrl").value = DEFAULT_BACKEND_URL;
    document.getElementById("apiKey").value = "";
  }
}
