import { useState, useEffect } from "react";
import "./SettingsPopover.css";

export interface Settings {
  backendUrl: string;
  apiKey?: string;
}

interface SettingsPopoverProps {
  onApply: (settings: Settings) => void;
}

const DEFAULT_BACKEND_URL = "https://templates.tiro.health/";

export function getDefaultSettings(): Settings {
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

export function SettingsPopover({ onApply }: SettingsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [backendUrl, setBackendUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const settings = getDefaultSettings();
    setBackendUrl(settings.backendUrl);
    setApiKey(settings.apiKey || "");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings: Settings = {
      backendUrl,
      apiKey: apiKey || undefined,
    };
    localStorage.setItem("tiro-settings", JSON.stringify(settings));
    onApply(settings);
    setIsOpen(false);
  };

  const handleReset = () => {
    setBackendUrl(DEFAULT_BACKEND_URL);
    setApiKey("");
  };

  return (
    <>
      <button
        className="settings-button"
        onClick={() => setIsOpen(true)}
        title="Settings"
      >
        ⚙️ Settings
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Settings</h2>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="backendUrl">Backend URL:</label>
                <input
                  type="url"
                  id="backendUrl"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  required
                  placeholder="https://templates.tiro.health/"
                />
              </div>
              <div className="form-group">
                <label htmlFor="apiKey">API Key (optional):</label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API key"
                />
              </div>
              <div className="button-group">
                <button type="button" className="reset-button" onClick={handleReset}>
                  Reset
                </button>
                <button type="submit" className="apply-button">
                  Apply & Restart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
