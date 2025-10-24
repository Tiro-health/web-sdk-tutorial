import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Settings {
  backendUrl: string;
  email: string;
  username: string;
  password: string;
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

@Component({
  selector: 'app-settings-popover',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button
      class="settings-button"
      (click)="isOpen = true"
      title="Settings"
    >
      ⚙️ Settings
    </button>

    <div *ngIf="isOpen" class="modal-overlay" (click)="isOpen = false">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Settings</h2>
          <button
            class="close-button"
            (click)="isOpen = false"
            type="button"
          >
            ✕
          </button>
        </div>
        <form (ngSubmit)="handleSubmit()">
          <div class="form-group">
            <label for="backendUrl">Backend URL:</label>
            <input
              type="url"
              id="backendUrl"
              [(ngModel)]="backendUrl"
              name="backendUrl"
              required
              placeholder="https://templates.tiro.health/"
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="email"
              name="email"
              placeholder="user@domain.com"
            />
          </div>
          <div class="form-group">
            <label for="username">Username (Basic Auth):</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              placeholder="Enter basic auth username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password (Basic Auth):</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Enter basic auth password"
            />
          </div>
          <div class="button-group">
            <button type="button" class="reset-button" (click)="handleReset()">
              Reset
            </button>
            <button type="submit" class="apply-button">
              Apply & Restart
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .settings-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1002;
      transition: all 0.2s ease;
    }

    .settings-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1003;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #111827;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6b7280;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background: #f3f4f6;
      color: #111827;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-group input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .button-group {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .reset-button,
    .apply-button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .reset-button {
      background: #f3f4f6;
      color: #374151;
    }

    .reset-button:hover {
      background: #e5e7eb;
    }

    .apply-button {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
    }

    .apply-button:hover {
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      transform: translateY(-1px);
    }
  `]
})
export class SettingsPopoverComponent implements OnInit {
  @Output() settingsApplied = new EventEmitter<Settings>();
  
  isOpen = false;
  backendUrl = "";
  email = "";
  username = "";
  password = "";

  ngOnInit(): void {
    const settings = getDefaultSettings();
    this.backendUrl = settings.backendUrl;
    this.email = settings.email;
    this.username = settings.username;
    this.password = settings.password;
  }

  handleSubmit(): void {
    const settings: Settings = {
      backendUrl: this.backendUrl,
      email: this.email,
      username: this.username,
      password: this.password,
    };
    localStorage.setItem("tiro-settings", JSON.stringify(settings));
    this.settingsApplied.emit(settings);
    this.isOpen = false;
  }

  handleReset(): void {
    this.backendUrl = DEFAULT_BACKEND_URL;
    this.email = "";
    this.username = "";
    this.password = "";
  }
}
