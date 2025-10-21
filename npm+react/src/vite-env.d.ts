/// <reference types="vite/client" />

import type React from "react";
import type ReactDOM from "react-dom/client";

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }
}
