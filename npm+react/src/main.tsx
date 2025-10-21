import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Make React and ReactDOM available globally for Tiro Web SDK
window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
