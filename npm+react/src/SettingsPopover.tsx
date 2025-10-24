import { useState, useEffect } from "react";
import "./SettingsPopover.css";

export interface Settings {
  backendUrl: string;
  email: string;
  username: string;
  password: string;
}

interface SettingsPopoverProps {
  onApply: (settings: Settings) => void;
}

const DEFAULT_BACKEND_URL = "https://templates.tiro.health/";

export function transformEmailToUserId(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  return `${parts[1]}|${parts[0]}`;
}

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
    email: "",
    username: "",
    password: "",
  };
}

export function SettingsPopover({ onApply }: SettingsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [backendUrl, setBackendUrl] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const settings = getDefaultSettings();
    setBackendUrl(settings.backendUrl);
    setEmail(settings.email);
    setUsername(settings.username);
    setPassword(settings.password);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings: Settings = {
      backendUrl,
      email,
      username,
      password,
    };
    localStorage.setItem("tiro-settings", JSON.stringify(settings));
    onApply(settings);
    setIsOpen(false);
  };

  const handleReset = () => {
    setBackendUrl(DEFAULT_BACKEND_URL);
    setEmail("");
    setUsername("");
    setPassword("");
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
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username (Basic Auth):</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter basic auth username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password (Basic Auth):</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter basic auth password"
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
